export const usePropertiesStore = defineStore("properties", {
	state: () => ({
		propertiesList: [],
	}),
	actions: {
		async loadData() {
			try {
				const response = await fetch("/api/properties");
				if (!response.ok) {
					throw new Error("Failed to fetch properties.");
				}
				const { properties } = await response.json();
				this.propertiesList = properties;
			} catch (error) {
				console.error("Error loading data:", error);
			}
		},

		async getPropertyByCode(code) {
			if (!code) {
				throw new Error("Property code is required.");
			}
			if (!this.propertiesList.length) {
				await this.loadData();
			}
			return this.propertiesList.find((property) => property.code === code);
		},
	},
});
