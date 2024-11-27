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
			meta: [
				{
					name: "description",
					content:
						"Como corretor de imóveis, meu propósito é ajudar você a realizar o sonho do imóvel ideal, seja para compra, venda ou locação. Com ampla experiência no mercado imobiliário e uma abordagem totalmente personalizada, transformo sua jornada em uma experiência tranquila, segura e eficiente. Trabalho com transparência, dedicação e atenção aos detalhes para garantir que você encontre a solução perfeita para suas necessidades, seja um imóvel residencial, comercial ou para investimento. Confie em um especialista comprometido em oferecer atendimento de excelência e resultados que superam expectativas. Encontre o imóvel dos seus sonhos com quem entende do mercado!",
				},
				{
					name: "keywords",
					content:
						"imóveis, corretor, corretor de imóveis, aluguel, venda, compra, imóveis à venda, imóveis para alugar, imóveis comerciais, imóveis residenciais, imóveis para investimento",
				},
				{
					property: "og:title",
					content: "Lelis Magno Imóveis",
				},
				{
					property: "og:description",
					content:
						"Como corretor de imóveis, meu propósito é ajudar você a realizar o sonho do imóvel ideal, seja para compra, venda ou locação. Com ampla experiência no mercado imobiliário e uma abordagem totalmente personalizada, transformo sua jornada em uma experiência tranquila, segura e eficiente. Trabalho com transparência, dedicação e atenção aos detalhes para garantir que você encontre a solução perfeita para suas necessidades, seja um imóvel residencial, comercial ou para investimento. Confie em um especialista comprometido em oferecer atendimento de excelência e resultados que superam expectativas. Encontre o imóvel dos seus sonhos com quem entende do mercado!",
				},
				{
					property: "og:site_name",
					content: "Lelis Magno Imóveis",
				},
				{
					property: "og:type",
					content: "website",
				},
			],
		},
	},

	runtimeConfig: {
		public: {
			localhost: "http://localhost:3000",
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
			cmf_token: process.env.NUXT_CMF_TOKEN,
			emailjs_service: process.env.NUXT_EMAILJS_SERVICE,
			emailjs_template: process.env.NUXT_EMAILJS_TEMPLATE,
			emailjs_key: process.env.NUXT_EMAILJS_PUBLIC_KEY,
			google_drive_client_id: process.env.GOOGLE_DRIVE_CLIENT_ID,
			google_drive_client_secret: process.env.GOOGLE_DRIVE_CLIENT_SECRET,
			google_drive_redirect_uri: process.env.GOOGLE_DRIVE_REDIRECT_URI,
			google_drive_refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
		},
	},

	modules: [
		(_options, nuxt) => {
			nuxt.hooks.hook("vite:extendConfig", (config) => {
				if (config.plugins) {
					config.plugins.push(vuetify({ autoImport: true }));
				}
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
	nitro: {
		preset: "vercel",
	},

	compatibilityDate: "2024-04-03",
});
