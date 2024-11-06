import { defineNuxtConfig } from "nuxt/config";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
	devtools: { enabled: true },
	srcDir: "src/",
	ssr: false,

	imports: {
		autoImport: false,
	},

	build: {
		transpile: ["vuetify"],
	},

	css: [
		"vuetify/lib/styles/main.sass",
		"@mdi/font/css/materialdesignicons.css",
		"@/assets/css/main.css",
	],

	app: {
		baseURL: process.env.BASE_URL,
		head: {
			title: "Lelis Magno Imóveis",
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
		},
	},

	runtimeConfig: {
		public: {
			cmf_token: process.env.NUXT_CMF_TOKEN,
		},
	},

	modules: [
		(_options, nuxt) => {
			nuxt.hooks.hook("vite:extendConfig", (config) => {
				config.plugins.push(vuetify({ autoImport: true }));
			});
		},
		"@pinia/nuxt",
	],

	vite: {
		vue: {
			template: {
				transformAssetUrls,
			},
		},
	},

	compatibilityDate: "2024-04-03",
});
