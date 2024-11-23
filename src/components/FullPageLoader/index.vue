<template>
	<v-dialog
		v-model="model"
		fullscreen
		persistent
		class="d-flex align-center justify-center bg-light"
	>
		<v-progress-circular
			indeterminate
			color="primary"
			size="230"
			:width="5"
			class="my-auto mx-auto"
		/>
	</v-dialog>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();
</script>
