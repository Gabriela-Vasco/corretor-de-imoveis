import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

interface PropertyRow {
	title: string;
	neighborhood: string;
	image: string;
	code: string;
	price: string;
	bedrooms: string;
	bathrooms: string;
	garage: string;
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
		image: row.get("image"),
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
	})) as PropertyRow[];

	return {
		properties,
	};
});
