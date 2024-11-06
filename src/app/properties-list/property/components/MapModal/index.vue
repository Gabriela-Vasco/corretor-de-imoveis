<template>
	<v-dialog v-model="model" opacity="0.7" width="1000px" :fullscreen="isXMobile">
		<v-sheet
			class="pa-5"
			color="light"
			:height="isXMobile ? '100%' : ''"
			:class="isXMobile ? 'd-flex flex-column align-end' : ''"
		>
			<LMap
				v-if="coordinates"
				ref="map"
				:zoom="zoom"
				:center="[coordinates.lat, coordinates.lon]"
				style="height: 800px; width: 100%"
				use-global-leaflet
			>
				<LTileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
					layer-type="base"
					name="OpenStreetMap"
				/>

				<LMarker :lat-lng="[coordinates.lat, coordinates.lon]">
					<LPopup>{{ address }}</LPopup>
				</LMarker>
			</LMap>
			<p v-else>Loading map...</p>
		</v-sheet>
	</v-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import { useScreen } from "@/composables/useScreen";
import { getCoordinates } from "@/composables/useGeocode";

const { isXMobile } = useScreen();

const model = defineModel<boolean>();
const zoom = ref(6);
const map = ref(null);
const address = "123 Main St, Anytown, USA";
const coordinates = ref<{ lat: number; lon: number } | null>(null);

onMounted(async () => {
	const coords = await getCoordinates(address);
	console.log(coords);
	if (coords) {
		coordinates.value = coords;
	}
});
</script>

<style scoped></style>
