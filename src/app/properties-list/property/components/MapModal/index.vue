<template>
	<v-dialog v-model="model" opacity="0.7" width="auto">
		<v-sheet class="pa-5" color="light">
			{{ map }}
		</v-sheet>
	</v-dialog>
</template>

<script setup lang="ts">
defineProps({
	map: { type: String, default: "" },
});

const model = defineModel<boolean>();
</script>

<style scoped></style>
