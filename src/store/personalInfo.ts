import { defineStore } from "pinia";

export const usePersonalInfoStore = defineStore("personalInfo", {
	state: () => ({
		personalInfoList: [],
	}),
	actions: {
		async loadData() {
			try {
				const response = await fetch("/api/personalInfo");
				if (!response.ok) {
					throw new Error("Failed to fetch personal info.");
				}
				const { personal_info } = await response.json();
				this.personalInfoList = personal_info;
				return personal_info;
			} catch (error) {
				console.error("Error loading data:", error);
			}
		},
	},
});
