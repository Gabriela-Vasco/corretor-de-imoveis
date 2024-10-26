export const usePropertiesStore = defineStore("properties", {
	state: () => ({
		propertiesList: [],
	}),
	actions: {
		async fetch() {
			const infos = await $fetch("/api/properties");

			this.propertiesList = infos;
		},
	},
});
