<template>
	<v-dialog v-model="model" opacity="0.7" width="1000px" :fullscreen="isMobile">
		<div class="d-flex justify-center align-center border fill-height w-100">
			<v-btn
				v-if="isMobile"
				icon="mdi-close-thick"
				color="primary"
				variant="flat"
				class="mt-2 mr-2"
				size="small"
				style="position: absolute; top: 0; right: 0; z-index: 9999"
				@click="model = false"
			/>

			<div
				style="overflow: hidden; max-width: 100%; width: 900px"
				:style="isXMobile ? 'height: 100vh' : 'height: 700px;'"
				class="google"
			>
				<div
					id="google-maps-display"
					style="height: 100%; width: 100%; max-width: 100%"
				>
					<iframe
						style="height: 100%; width: 100%; border: 0"
						frameborder="0"
						:src="`https://www.google.com/maps/embed/v1/place?q=${addressFormatted}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`"
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
		</div>
	</v-dialog>
</template>

<script setup lang="ts">
import { useScreen } from "@/composables/useScreen";

defineProps({
	addressFormatted: { type: String, default: "" },
});

const { isXMobile, isMobile } = useScreen();

const model = defineModel<boolean>();
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
