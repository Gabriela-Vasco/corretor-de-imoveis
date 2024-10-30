<template>
	<Home />
</template>

<script setup>
import Home from "@/app/home";
definePageMeta({
	layout: "default",
	middleware: "scroll",
});
</script>
