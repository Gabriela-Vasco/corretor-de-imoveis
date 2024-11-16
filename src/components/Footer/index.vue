<template>
	<v-footer
		color="primary"
		:style="
			isXMobile
				? 'max-height: 230px; min-height: 230px'
				: 'max-height: 290px; min-height: 290px'
		"
		class="d-flex flex-column justify-center footer"
	>
		<h3 class="text-white font-weight-bold roboto-title align-self-start">
			LELIS MAGNO IMÓVEIS
		</h3>
		<div class="d-flex align-start justify-space-between w-100 mt-4">
			<div class="d-flex flex-column ga-2">
				<p>© Copyright 2024 - Todos os direitos reservados</p>
				<p>CRECI {{ creci }}</p>
				<p>{{ phone_number }}</p>
				<p>{{ email }}</p>
				<p class="d-flex align-center ga-2">
					<v-icon size="16px">mdi-instagram</v-icon>
					{{ instagram }}
				</p>
			</div>

			<div
				class="d-flex align-center flex-wrap links"
				:class="isMobile ? 'flex-column ga-2' : 'ga-7'"
			>
				<nuxt-link class="font-weight-bold" to="/"> Home </nuxt-link>
				<span>&#x2022;</span>
				<nuxt-link class="font-weight-bold" to="/properties-list">
					Imóveis
				</nuxt-link>
				<span>&#x2022;</span>
				<nuxt-link class="font-weight-bold" to="/favorites"> Favoritos </nuxt-link>
				<span>&#x2022;</span>
				<nuxt-link class="font-weight-bold" to="/contact"> Contato </nuxt-link>
			</div>
		</div>
	</v-footer>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useScreen } from "@/composables/useScreen";
import { usePersonalInfoStore } from "@/store/personalInfo";

const { isMobile, isXMobile } = useScreen();
const personalInfoStore = usePersonalInfoStore();
const phone_number = ref();
const email = ref();
const instagram = ref();
const creci = ref();

const loading = ref(false);

onMounted(async () => {
	try {
		loading.value = true;
		await personalInfoStore.loadData();
		phone_number.value = personalInfoStore.personalInfoList[0].phone_number;
		email.value = personalInfoStore.personalInfoList[0].email;
		instagram.value = personalInfoStore.personalInfoList[0].instagram;
		creci.value = personalInfoStore.personalInfoList[0].creci;
	} catch (e) {
		console.error(e);
	} finally {
		loading.value = false;
	}
});
</script>

<style lang="scss" scoped>
.footer {
	padding: 0 120px;
}

@media (max-width: 1080px) {
	.footer {
		font-size: 12px;
		padding: 0 5rem;
	}
}

@media (max-width: 956px) {
	.footer {
		padding: 0 3rem;
	}

	.links {
		margin-left: 1rem;
		margin-top: -40px;
	}
}

@media (max-width: 480px) {
	.footer {
		padding: 0 2rem;
	}
}
</style>
