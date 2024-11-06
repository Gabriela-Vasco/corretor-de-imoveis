import L from "leaflet";
import { defineNuxtPlugin } from "#imports";
import "leaflet/dist/leaflet.css";

// Make Leaflet globally available
export default defineNuxtPlugin(() => {
	return {
		provide: {
			leaflet: L,
		},
	};
});
