import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { defineEventHandler } from "#imports";

interface PersonalInfoRow {
	phone_number: string;
	email: string;
	instagram: string;
	creci: string;
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

	const sheet = doc.sheetsByIndex[3];
	const rows = await sheet.getRows();

	const personal_info = rows.map((row) => ({
		phone_number: row.get("Celular"),
		email: row.get("Email"),
		instagram: row.get("Instagram"),
		creci: row.get("CRECI"),
	})) as PersonalInfoRow[];

	return {
		personal_info,
	};
});
