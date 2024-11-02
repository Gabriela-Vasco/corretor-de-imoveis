<template>
	<v-snackbar
		v-model="model"
		:color="color"
		:text="text"
		timeout="3000"
		min-height="80px"
		position="fixed"
		location="right"
		content-class="snackbar"
		class="snackbar"
		close-on-content-click
	/>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();

defineProps({
	color: { type: String, default: "success" },
	text: { type: String, default: "" },
});
</script>

<style scoped lang="scss"></style>
