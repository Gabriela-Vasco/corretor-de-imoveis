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
		"19G3UF0Bdv6ZxZ-R1xkUxIkJV4mFOX3pNriDxz5lO7TQ",
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
		garage: row.get("garage"),
	})) as PropertyRow[];

	return {
		properties,
	};
});
