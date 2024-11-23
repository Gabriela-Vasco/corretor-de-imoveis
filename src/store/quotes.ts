import { defineStore } from "pinia";
import { useAppStore } from "./app";

export const useQuotesStore = defineStore("quotes", {
	state: () => ({
		quotesList: [],
	}),
	actions: {
		async loadData() {
			try {
				useAppStore().showLoader();
				const response = await fetch("/api/quotes");
				if (!response.ok) {
					throw new Error("Failed to fetch quotes.");
				}
				const { quotes } = await response.json();
				this.quotesList = quotes;
				return quotes;
			} catch (error) {
				console.error("Error loading data:", error);
			} finally {
				useAppStore().hideLoader();
			}
		},
	},
});
