<template>
	<v-sheet
		color="secondary-darken-1"
		:height="isMobile ? '220px' : '320px'"
		width="100%"
		class="d-flex flex-column align-center justify-center"
	>
		<div
			class="d-flex align-center justify-center cta"
			:class="isMobile ? 'flex-column ga-5 px-2' : 'mb-14 ga-10'"
		>
			<h2 class="text-black cta-title">
				Gostaria de conhecer o imóvel dos seus sonhos?
			</h2>
			<v-btn
				rounded="xs"
				variant="elevated"
				:size="isMobile ? 'large' : 'x-large'"
				class="bg-secondary font-weight-bold"
				to="contact"
			>
				Entre em contato
			</v-btn>
		</div>
		<v-divider
			v-if="!isMobile"
			color="dark"
			class="border-opacity-25"
			:thickness="2"
			style="width: 1170px; max-width: 90vw"
		/>
	</v-sheet>
</template>

<script setup lang="ts">
import { useScreen } from "@/composables/useScreen";

const { isMobile } = useScreen();
</script>

<style lang="scss" scoped>
.cta {
	gap: 200px;
}

.cta-title {
	font-size: 32px;
	width: 557px;
	text-align: center;
}

@media (max-width: 1080px) {
	.cta {
		gap: 0;
	}
	.cta-title {
		font-size: 24px;
		width: 100%;
	}
}

@media (max-width: 768px) {
	.cta-title {
		font-size: 20px;
		padding: 0 15px;
	}
}
</style>
