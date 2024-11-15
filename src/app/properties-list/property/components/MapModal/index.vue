<template>
	<v-dialog v-model="model" opacity="0.7" width="1000px" :fullscreen="isXMobile">
		<div>
			<v-btn
				v-if="isXMobile"
				icon="mdi-close-thick"
				color="primary"
				variant="flat"
				class="mt-2 mr-2"
				size="small"
				style="position: absolute; top: 0; right: 0; z-index: 9999"
				@click="model = false"
			/>

			<div
				style="overflow: hidden; max-width: 100%; width: 500px; height: 500px"
				class="google"
			>
				<div
					id="google-maps-display"
					style="height: 100%; width: 100%; max-width: 100%"
				>
					<iframe
						style="height: 100%; width: 100%; border: 0"
						frameborder="0"
						:src="`https://www.google.com/maps/embed/v1/place?q=${maps}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`"
					></iframe>
				</div>
				<a
					id="get-map-data"
					class="googlecoder"
					rel="nofollow"
					href="https://www.bootstrapskins.com/themes"
					>premium bootstrap themes</a
				>
			</div>
			<!-- <v-sheet
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
			</v-sheet> -->
		</div>
	</v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import { useScreen } from "@/composables/useScreen";

defineProps({
	address: { type: String, default: "" },
	coordinates: { type: Object, default: null },
	maps: { type: String, default: "" },
});

const { isXMobile } = useScreen();

const model = defineModel<boolean>();
const zoom = ref(20);
const map = ref(null);
</script>

<style scoped lang="scss">
.popup {
	font-weight: 700;
}

.google {
	max-width: 100%;
	max-height: 100%;
	background: none;
}
</style>
