import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { type Property } from "~/types/Property";
import { defineEventHandler } from "#imports";

export default defineEventHandler(async (event) => {
	const credentials = JSON.parse(process.env.GCP_CREDENTIALS);

	const serviceAccountAuth = new JWT({
		email: credentials.client_email,
		key: credentials.private_key,
		scopes: ["https://www.googleapis.com/auth/spreadsheets"],
	});

	const doc = new GoogleSpreadsheet(
		"1swyogtXPH075ea0ruNEzT23e5CYSNOoAcZz2ySLgavI",
		serviceAccountAuth,
	);

	function formatImageCover(image: string) {
		const fileId = image.split("=")[1];

		return fileId
			? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
			: "";
	}

	async function formatImages(images: string) {
		try {
			const arrayImages = images.split(",").map((item: string) => item.trim());
			const formattedImages = await Promise.all(
				arrayImages.map((image) => {
					const fileId = image.split("=")[1];

					return fileId
						? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
						: "";
				}),
			);

			return formattedImages;
		} catch (error) {
			console.error("Error formatting images", error);
			return [];
		}
	}

	function formatAddress(address: string) {
		return address.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]/g, "").replace(/\s+/g, "+");
	}

	await doc.loadInfo();
	const sheet = doc.sheetsByIndex[1];
	const rows = await sheet.getRows();

	const properties: Property[] = await Promise.all(
		rows.map(async (row) => ({
			code: row.get("Código"),
			title: row.get("Nome do imóvel"),
			description: row.get("Descrição do imóvel"),
			address: formatAddress(row.get("Endereço do imóvel")),
			featured: row.get("Imóvel em destaque?")?.toLowerCase() === "sim",
			neighborhood: row.get("Bairro"),
			price: row.get("Preço do imóvel"),
			condominium_price: row.get("Preço do condomínio"),
			IPTU: row.get("Preço do IPTU (Anual)"),
			bedrooms: parseInt(row.get("Número de quartos")) || 0,
			bathrooms: parseInt(row.get("Número de banheiros")) || 0,
			suites: parseInt(row.get("Número de suítes")) || 0,
			garage: parseInt(row.get("Número de vagas de garagem")) || 0,
			sale_or_rent: row.get("Tipo de negócio"),
			property_type: row.get("Tipo de propriedade"),
			total_area: row.get("Área total"),
			private_area: row.get("Área privativa"),
			infrastructure:
				row
					.get("Infraestrutura do imóvel")
					?.split(",")
					.map((item: string) => item.trim()) || [],
			image_cover: await formatImageCover(row.get("Imagem de capa")),
			images: await formatImages(row.get("Imagens do imóvel")),
			video: row.get("Vídeo"),
			maps: row.get("maps"),
			related_properties: row
				.get("Imóveis relacionados")
				.split(",")
				.map((item: string) => item.trim()),
		})),
	);
	return {
		properties,
	};
});
