import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbar", {
	state: () => ({
		showSnackbar: false,
		snackbarMessage: "",
		snackbarColor: "info",
	}),
	actions: {
		displaySnackbar(message: string, color = "info") {
			this.snackbarMessage = message;
			this.snackbarColor = color;
			this.showSnackbar = true;
		},
	},
});
