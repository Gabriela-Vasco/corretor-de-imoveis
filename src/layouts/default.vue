<template>
	<v-app>
		<Header />
		<NuxtPage />
		<section class="mt-auto">
			<CTA />
			<Footer />
			<FloatingButton />
		</section>

		<ModalCookies v-model="dialog" />
		<Snackbar
			v-model="snackbarStore.showSnackbar"
			:color="snackbarStore.snackbarColor"
			:text="snackbarStore.snackbarMessage"
		/>
	</v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ModalCookies from "@/components/ModalCookies/index.vue";
import Snackbar from "@/components/Snackbar/index.vue";
import FloatingButton from "@/components/FloatingButton/index.vue";
import { useSnackbarStore } from "@/store/snackbar";

const snackbarStore = useSnackbarStore();

const dialog = ref(
	process.client ? !localStorage.getItem("cookiesAccepted") : false,
);
</script>

<style lang="scss" scoped></style>
