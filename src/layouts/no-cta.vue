<template>
	<v-app>
		<Header />
		<NuxtPage />
		<section class="mt-auto">
			<Footer />
		</section>
		<Snackbar
			v-model="snackbarStore.showSnackbar"
			:color="snackbarStore.snackbarColor"
			:text="snackbarStore.snackbarMessage"
		/>
		<FullPageLoader v-model="isLoading" />
	</v-app>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Snackbar from "@/components/Snackbar/index.vue";
import { useSnackbarStore } from "@/store/snackbar";
import { useAppStore } from "@/store/app";

const snackbarStore = useSnackbarStore();
const appStore = useAppStore();
const isLoading = computed(() => appStore.isLoading);
</script>
