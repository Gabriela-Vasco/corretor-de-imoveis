import { createVuetify, type ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const myCustomTheme: ThemeDefinition = {
	colors: {
		background: "#FFFFFF",
		surface: "#FFFFFF",
		primary: "#253259",
		"primary-lighter": "#687186",
		secondary: "#F2C36B",
		"secondary-darken-1": "#D9984A",
		error: "#B00020",
		info: "#2196F3",
		success: "#4CAF50",
		warning: "#FB8C00",
		light: "#F2F2F2",
		dark: "#1E1E1E",
	},
};

export default defineNuxtPlugin((app) => {
	const vuetify = createVuetify({
		// ssr: true,
		components,
		directives,
		theme: {
			defaultTheme: "myCustomTheme",
			themes: {
				myCustomTheme,
			},
		},
		defaults: {
			VBtn: {
				style: `
					text-transform: none;
					letter-spacing: 0;
					line-height: 134.8%;
					font-weight: 600;
				`,
			},
		},
	});
	app.vueApp.use(vuetify);
});
