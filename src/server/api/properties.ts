import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

interface PropertyRow {
	title: string;
	neighborhood: string;
	image_cover: string;
	code: string;
	price: string;
	bedrooms: string;
	bathrooms: string;
	garage: string;
	description: string;
	venda_ou_aluguel: string;
	total_area: string;
	private_area: string;
	suites: string;
	condominium_price: string;
	IPTU: string;
	infrastructure: string;
	images: string;
}

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

	await doc.loadInfo();

	const sheet = doc.sheetsByIndex[0];
	const rows = await sheet.getRows();

	const properties = rows.map((row) => ({
		title: row.get("title"),
		neighborhood: row.get("neighborhood"),
		image_cover: row.get("image_cover"),
		code: row.get("code"),
		price: row.get("price"),
		bedrooms: row.get("bedrooms"),
		bathrooms: row.get("bathrooms"),
		suites: row.get("suites"),
		garage: row.get("garage"),
		description: row.get("description"),
		venda_ou_aluguel: row.get("venda_ou_aluguel"),
		total_area: row.get("total_area"),
		private_area: row.get("private_area"),
		condominium_price: row.get("condominium_price"),
		IPTU: row.get("IPTU"),
		infrastructure: row.get("infrastructure"),
		images: row.get("images"),
	})) as PropertyRow[];

	return {
		properties,
	};
});
