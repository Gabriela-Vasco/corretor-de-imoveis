import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { defineEventHandler } from "#imports";

interface QuoteRow {
	message: string;
	author: string;
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

	const sheet = doc.sheetsByIndex[2];
	const rows = await sheet.getRows();

	const quotes = rows.map((row) => ({
		message: row.get("Mensagem"),
		author: row.get("Autor"),
	})) as QuoteRow[];

	return {
		quotes,
	};
});
