<template>
	<v-dialog v-model="model" opacity="0.7" width="auto">
		<v-btn
			v-if="isMobile"
			icon="mdi-close-thick"
			color="white"
			variant="flat"
			size="small"
			style="position: absolute; top: 0; right: 0; z-index: 9999"
			@click="model = false"
		/>
		<v-sheet style="overflow: hidden">
			<v-snackbar
				v-model="showLandscapeMessage"
				color="secondary"
				timeout="6000"
				position="fixed"
				location="right"
			>
				Para uma melhor experiência, assista o vídeo na horizontal.
			</v-snackbar>
			<video controls autoplay :width="isMobile || isTablet ? '100%' : '1200px'">
				<source :src="video" />
			</video>
		</v-sheet>
	</v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import video from "./ordenacao_e_filtros.webm";
import { useScreen } from "@/composables/useScreen";

const { isMobile, isTablet } = useScreen();
const model = defineModel<boolean>();
const showLandscapeMessage = ref(false);

onMounted(() => {
	if (isMobile || isTablet) {
		showLandscapeMessage.value = true;
	}
});
</script>

<style scoped></style>
