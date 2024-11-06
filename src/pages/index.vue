<template>
	<Home />
</template>

<script setup>
import { definePageMeta } from "#imports";
import Home from "@/app/home";
definePageMeta({
	layout: "default",
	middleware: "scroll",
});
</script>
