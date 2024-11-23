import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
	state: () => ({
		isLoading: false,
	}),
	actions: {
		showLoader() {
			this.isLoading = true;
		},
		hideLoader() {
			this.isLoading = false;
		},
	},
});
