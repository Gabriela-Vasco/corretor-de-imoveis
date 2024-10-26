import { resolve } from "path";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
	srcDir: "src/",
	compatibilityDate: "2024-04-03",
	components: true,
	devtools: { enabled: true },

	alias: {
		"~": resolve(__dirname, "src"),
		"@": resolve(__dirname, "src"),
		"~~": resolve(__dirname, "."),
		"@@": resolve(__dirname, "."),
		assets: resolve(__dirname, "src/assets"),
		public: resolve(__dirname, "src/public"),
		css: resolve(__dirname, "src/assets/css"),
	},

	app: {
		baseURL: process.env.BASE_URL,
	},

	css: [
		"vuetify/lib/styles/main.sass",
		"@mdi/font/css/materialdesignicons.css",
		"@/assets/css/main.css", // Use '@' for path resolution
	],

	build: {
		transpile: ["vuetify"],
	},

	modules: ["@pinia/nuxt"],
});
