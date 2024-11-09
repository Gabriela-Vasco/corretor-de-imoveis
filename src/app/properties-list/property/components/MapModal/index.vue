<template>
	<v-dialog v-model="model" opacity="0.7" width="1000px" :fullscreen="isXMobile">
		<div v-if="loading" class="d-flex align-center justify-center">
			<v-progress-circular indeterminate size="x-large" color="white" />
		</div>
		<div v-else>
			<v-sheet
				v-if="coordinates"
				class="pa-5"
				color="light"
				:height="isXMobile ? '100%' : ''"
				:class="isXMobile ? 'd-flex flex-column align-end' : ''"
			>
				<LMap
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
						<LPopup class="popup">{{ address }}</LPopup>
					</LMarker>
				</LMap>
			</v-sheet>
			<v-sheet v-else>
				<NoContent class="mx-auto" headline="Nenhum mapa encontrado" size="250" />
			</v-sheet>
		</div>
	</v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import { useScreen } from "@/composables/useScreen";
import { getCoordinates } from "@/composables/useGeocode";

const props = defineProps({
	address: { type: String, default: "" },
});

const { isXMobile } = useScreen();

const model = defineModel<boolean>();
const zoom = ref(20);
const map = ref(null);
const coordinates = ref<{ lat: number; lon: number } | null>(null);
const loading = ref(false);

watch(
	() => props.address,
	async (newVal) => {
		if (!newVal) {
			return;
		}
		loading.value = true;

		const addressFormatted = formatAddress(newVal);
		const coords = await getCoordinates(addressFormatted);
		if (coords) {
			coordinates.value = coords;
		}

		loading.value = false;
	},
);

function formatAddress(address: string) {
	return address.replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/g, "+");
}
</script>

<style scoped lang="scss">
.popup {
	font-weight: 700;
}
</style>
