<template>
	<v-dialog
		v-model="model"
		opacity="0.7"
		:width="isMobile || isTablet ? '100%' : '1200px'"
		:fullscreen="isMobile"
	>
		<v-btn
			v-if="isMobile"
			icon="mdi-close-thick"
			color="white"
			variant="flat"
			size="small"
			class="mt-2 mr-2"
			style="position: absolute; top: 0; right: 0; z-index: 9999"
			@click="model = false"
		/>
		<v-snackbar
			v-model="showLandscapeMessage"
			color="secondary"
			timeout="6000"
			position="fixed"
			location="right"
		>
			Para uma melhor experiência, assista o vídeo na horizontal.
		</v-snackbar>
		<iframe
			:src="`${video}?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;muted=1`"
			width="100%"
			height="600px"
			frameborder="0"
			allow="autoplay; fullscreen; picture-in-picture"
			title="ordenacao_e_filtros"
		></iframe>
	</v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useScreen } from "@/composables/useScreen";

const { isMobile, isTablet } = useScreen();
const model = defineModel<boolean>();
const showLandscapeMessage = ref(false);

defineProps({
	video: { type: String, required: true },
});

onMounted(() => {
	if (isMobile || isTablet) {
		showLandscapeMessage.value = true;
	}
});
</script>

<style scoped></style>
