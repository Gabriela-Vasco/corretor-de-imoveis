<template>
	<v-app class="w-100 cover">
		<Header />
		<div
			class="d-flex align-center"
			:class="isMobile ? 'justify-center mt-16' : 'justify-start'"
		>
			<img v-if="!isMobile" :src="ErrorImage" alt="Erro 404" width="60%" />
			<div class="d-flex flex-column align-center justify-center errorText">
				<h1>Página não encontrada</h1>
				<h3 class="mb-5 font-weight-regular text-neutral text-center">
					A página que você está tentando acessar não existe.
				</h3>
				<v-btn
					color="primary"
					:size="isMobile ? 'default' : 'large'"
					@click="goHome"
				>
					Voltar para a página inicial
				</v-btn>
			</div>
		</div>
	</v-app>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useScreen } from "./composables/useScreen";
import ErrorImage from "@/assets/images/404.svg";
import Header from "@/components/Header/index.vue";

defineProps(["error"]);
const { isMobile } = useScreen();
const router = useRouter();

function goHome() {
	router.push("/");
}
</script>

<style scoped lang="scss">
.cover {
	background-image: url("./assets/images/cover.svg");
	background-size: cover;
	background-repeat: no-repeat;
}

@media (max-width: 1200px) {
	.errorText {
		margin-right: 50px;
	}
}

@media (max-width: 956px) {
	.cover {
		background-image: url("./assets/images/404.svg");
		background-position: center;
	}

	.errorText {
		margin-right: 0;
	}
}

@media (max-width: 480px) {
	.errorText {
		padding: 0 25px;
		h1 {
			font-size: 24px;
		}

		h3 {
			font-size: 16px;
		}
	}
}
</style>
