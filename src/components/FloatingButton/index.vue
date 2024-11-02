<template>
	<div class="border-primary btn mb-16" :class="isMobile ? 'mr-4' : 'mr-12'">
		<v-fab
			class="mr-16"
			:icon="true"
			:size="isMobile ? '65' : '75'"
			color="green"
			href=""
		>
			<v-icon :size="isMobile ? 'large' : 'x-large'">mdi-whatsapp</v-icon>
		</v-fab>
	</div>
</template>

<script setup lang="ts">
import { useScreen } from "@/composables/useScreen";

const { isMobile } = useScreen();
</script>

<style scoped lang="scss">
.btn {
	position: fixed;
	bottom: 0;
	right: 0;
}
</style>
