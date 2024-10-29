<template>
	<v-app>
		<Header />
		<NuxtPage />
		<section class="mt-auto">
			<CTA />
			<Footer />
		</section>

		<ModalCookies v-model="dialog" />
	</v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ModalCookies from "@/components/ModalCookies/index.vue";

const dialog = ref(
	process.client ? !localStorage.getItem("cookiesAccepted") : false,
);
</script>

<style lang="scss" scoped></style>
