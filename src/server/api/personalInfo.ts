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

	function formatPhoneNumber(phone: string) {
		const digits = phone.replace(/\D/g, "");

		if (digits.length < 10 || digits.length > 13) {
			throw new Error("Número de telefone inválido.");
		}

		const withoutCountryCode = digits.startsWith("55") ? digits.slice(2) : digits;

		const ddd = withoutCountryCode.slice(0, 2);
		const number = withoutCountryCode.slice(2);

		if (number.length < 8 || number.length > 9) {
			throw new Error("Número de telefone inválido após o DDD.");
		}

		return `55${ddd}${number}`;
	}

	function formatTextMessage(message: string) {
		return encodeURIComponent(message);
	}

	const personal_info = rows.map((row) => ({
		phone_number: row.get("Celular"),
		email: row.get("Email"),
		instagram: row.get("Instagram"),
		creci: row.get("CRECI"),
		whatsapp_phone_number: formatPhoneNumber(row.get("Celular")),
		whatsapp_text_message: formatTextMessage(row.get("Mensagem WhatsApp")),
	})) as PersonalInfoRow[];

	return {
		personal_info,
	};
});
