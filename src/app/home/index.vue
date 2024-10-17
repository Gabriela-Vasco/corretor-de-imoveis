<template>
	<main>
		<Hero />
		<Featured />
		<About />
		<Social :quotes="quotes" />
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Hero from "@/app/home/components/hero";
import Featured from "@/app/home/components/featured";
import About from "@/app/home/components/about";
import Social from "@/app/home/components/social";

const quotes = ref([
	{
		message:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
		author: "Maria Lopez, VP of Design at Meshery",
	},
	{
		message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		author: "John Doe, CEO of Acme Corp.",
	},
	{
		message: "Aenean commodo ligula eget dolor. Aenean massa.",
		author: "Jane Smith, Marketing Director",
	},
]);
</script>

<style lang="scss" scoped></style>
