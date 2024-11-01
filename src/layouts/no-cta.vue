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
	</v-app>
</template>

<script setup lang="ts">
import Snackbar from "@/components/Snackbar/index.vue";
import { useSnackbarStore } from "@/store/snackbar";

const snackbarStore = useSnackbarStore();
</script>
