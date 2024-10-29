<template>
	<v-dialog v-model="dialog" opacity="0.3" :fullscreen="isMobile">
		<div class="dialog">
			<v-card
				width="100%"
				:max-width="isMobile ? '98%' : '650px'"
				class="dialogCard d-flex flex-column"
			>
				<v-card-title>
					<h3>Política de Cookies</h3>
				</v-card-title>
				<v-card-text>
					<p class="text-justify">
						Utilizamos cookies para melhorar a sua experiência em nosso site. Ao
						continuar navegando, você concorda com a nossa
						<nuxt-link
							to="/politica-de-privacidade"
							class="text-primary font-weight-bold"
						>
							Política de Privacidade.
						</nuxt-link>
					</p>
				</v-card-text>
				<v-card-actions class="align-self-end">
					<v-btn color="primary" variant="flat" @click="acceptCookies">
						Entendi
					</v-btn>
				</v-card-actions>
			</v-card>
		</div>
	</v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useScreen } from "@/composables/useScreen";

const props = defineProps({
	modelValue: Boolean,
});

const { isMobile } = useScreen();

const emit = defineEmits(["update:modelValue"]);
const dialog = ref(props.modelValue);

watch(
	() => props.modelValue,
	(newVal) => {
		dialog.value = newVal;
	},
);

function acceptCookies() {
	if (process.client) {
		localStorage.setItem("cookiesAccepted", "true");
	}
	emit("update:modelValue", false);
}
</script>

<style scoped lang="scss">
.dialog {
	padding: 20px;
	height: 100vh;
	position: relative;
}

.dialogCard {
	border: 1px solid #253259;
	padding: 15px 20px;
	position: fixed;
	bottom: 5px;
	right: 5px;
}

@media (max-width: 768px) {
	.dialogCard {
		padding: 5px 10px;
		position: fixed;
		bottom: 5;
		right: 5;
	}
}
</style>
