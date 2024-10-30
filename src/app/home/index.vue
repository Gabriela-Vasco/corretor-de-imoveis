<template>
	<main>
		<Hero />
		<Featured />
		<About />
		<Social />
	</main>
</template>

<script setup lang="ts">
import Hero from "@/app/home/components/hero";
import Featured from "@/app/home/components/featured";
import About from "@/app/home/components/about";
import Social from "@/app/home/components/social";
</script>
