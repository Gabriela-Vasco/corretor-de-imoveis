<template>
	<v-dialog v-model="model" opacity="0.7" width="auto">
		<v-sheet style="overflow: hidden">
			<video controls autoplay width="1200px">
				<source :src="video" />
			</video>
		</v-sheet>
	</v-dialog>
</template>

<script setup lang="ts">
import video from "./ordenacao_e_filtros.webm";
const model = defineModel<boolean>();
</script>

<style scoped></style>
