<template>
	<v-dialog v-model="model" opacity="0.7" width="auto" :fullscreen="isXMobile">
		<v-sheet
			class="pa-5"
			color="light"
			:height="isXMobile ? '100%' : ''"
			:class="isXMobile ? 'd-flex flex-column align-end' : ''"
		>
			<!-- {{ map }} -->
			<v-btn
				v-if="isMobile"
				icon="mdi-close-thick"
				color="primary"
				variant="flat"
				size="small"
				class="mt-3 mr-3"
				style="position: absolute; top: 0; right: 0; z-index: 9999"
				@click="model = false"
			></v-btn>
			<!-- <iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.1976739503357!2d-43.1793933238271!3d-22.90607867925541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f5fd24e0bdd%3A0x99447fc2607f1de1!2sFaculdade%20Infnet%20-%20Faculdade%20de%20Engenharia%20de%20Software%2C%20Engenharia%20da%20Computa%C3%A7%C3%A3o%2C%20Engenharia%20de%20Dados%20e%20IA%20%7C%20MBA%20e%20P%C3%B3s%20em%20TI!5e0!3m2!1spt-BR!2sbr!4v1730763749839!5m2!1spt-BR!2sbr"
				width="800"
				:height="isXMobile ? '100%' : '600'"
				style="border: 0; max-width: 100%"
				allowfullscreen="true"
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe> -->
			<iframe
				:src="map"
				width="800"
				:height="isXMobile ? '100%' : '600'"
				style="border: 0; max-width: 100%"
				allowfullscreen="true"
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</v-sheet>
	</v-dialog>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useScreen } from "@/composables/useScreen";

const { isXMobile, isMobile } = useScreen();
const props = defineProps({
	map: { type: String, default: "" },
});

onMounted(() => {
	console.log(props.map);
});

const model = defineModel<boolean>();
</script>

<style scoped></style>
