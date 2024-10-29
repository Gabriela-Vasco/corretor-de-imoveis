<template>
	<v-empty-state :image="NoFoundImage" :size="size">
		<h1 class="font-weight-light">{{ headline }}</h1>
		<h3 class="font-weight-medium mt-5 text-center">{{ text }}</h3>
	</v-empty-state>
</template>

<script setup lang="ts">
import NoFoundImage from "@/assets/images/svg/no-found.svg";

defineProps({
	headline: {
		type: String,
		default: "",
	},
	text: {
		type: String,
		default: "",
	},
	size: {
		type: String,
		default: "350",
	},
});
</script>

<style scoped></style>
