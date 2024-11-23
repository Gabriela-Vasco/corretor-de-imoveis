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
		<FullPageLoader v-model="isLoading" />
	</v-app>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import ModalCookies from "@/components/ModalCookies/index.vue";
import Snackbar from "@/components/Snackbar/index.vue";
import FloatingButton from "@/components/FloatingButton/index.vue";
import FullPageLoader from "@/components/FullPageLoader/index.vue";
import { useSnackbarStore } from "@/store/snackbar";
import { useAppStore } from "@/store/app";

const snackbarStore = useSnackbarStore();

const dialog = ref(
	process.client ? !localStorage.getItem("cookiesAccepted") : false,
);

const appStore = useAppStore();
const isLoading = computed(() => appStore.isLoading);
</script>
