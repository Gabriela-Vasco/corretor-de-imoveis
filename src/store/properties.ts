import { useCookie } from "nuxt/app";
import { ref } from "vue";
import { useSnackbarStore } from "./snackbar";

export const usePropertiesStore = defineStore("properties", {
	state: () => ({
		propertiesList: [],
		favoritedProperties: useCookie("favoriteProperties", {
			default: () => [],
		}).value,
		showLimitSnackbar: ref(false),
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

		async toggleFavorite(code) {
			const snackbarStore = useSnackbarStore();
			const property = await this.getPropertyByCode(code);
			if (!property) {
				throw new Error("Property not found.");
			}

			const favoritePropertiesCookie = useCookie("favoriteProperties");
			const index = this.favoritedProperties.findIndex(
				(favProperty) => favProperty.code === code,
			);

			if (index === -1) {
				if (this.favoritedProperties.length >= 3) {
					snackbarStore.displaySnackbar(
						"Você só pode favoritar até 3 propriedades.",
						"red",
					);
					return;
				}
				this.favoritedProperties.push(property);
				snackbarStore.displaySnackbar(
					"Propriedade adicionada aos favoritos.",
					"green",
				);
			} else {
				this.favoritedProperties.splice(index, 1);
			}

			favoritePropertiesCookie.value = this.favoritedProperties;
		},
		getFavoriteProperties() {
			return this.favoritedProperties;
		},
	},
});
