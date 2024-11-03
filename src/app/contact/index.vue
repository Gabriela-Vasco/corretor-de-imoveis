<template>
	<div
		class="d-flex justify-space-between w-100 my-16"
		:class="isMobile ? 'flex-column align-center' : 'align-start'"
	>
		<div class="d-flex flex-column align-center w-100">
			<h2 class="contactTitle">Envie uma mensagem</h2>
			<v-form ref="form" class="d-flex flex-column align-center w-100">
				<v-text-field
					v-model="name"
					label="Nome"
					variant="underlined"
					width="500px"
					max-width="80%"
					:rules="[() => !!name || 'Campo obrigatório']"
				></v-text-field>
				<v-text-field
					v-model="email"
					label="E-mail"
					variant="underlined"
					width="500px"
					max-width="80%"
					:rules="[() => !!name || 'Campo obrigatório']"
				></v-text-field>
				<v-text-field
					v-model="phone"
					label="Telefone"
					variant="underlined"
					width="500px"
					max-width="80%"
					:rules="[() => !!name || 'Campo obrigatório']"
				></v-text-field>
				<v-textarea
					v-model="message"
					label="Mensagem"
					variant="outlined"
					class="mt-5"
					width="500px"
					max-width="80%"
					:rules="[() => !!name || 'Campo obrigatório']"
				></v-textarea>
				<div
					class="d-flex flex-column align-start"
					style="width: 500px; max-width: 80%"
				>
					<small>
						<v-icon size="x-small">mdi-lock-outline</v-icon>
						Ao enviar você está aceitando a política de privacidade.
					</small>
					<br />
					<v-btn
						class="align-self-end"
						variant="flat"
						:size="isMobile ? 'small' : 'default'"
						color="secondary-darken-1"
						:class="isMobile ? 'mt-5' : 'mt-2'"
						@click="submitForm"
					>
						Enviar
					</v-btn>
				</div>
			</v-form>
		</div>
		<v-divider
			:vertical="!isMobile"
			:class="
				isMobile ? 'my-10 w-75 border-opacity-25' : ' w-100 border-opacity-50'
			"
			:thickness="2"
		/>
		<div class="d-flex flex-column align-center w-100">
			<h2 class="contactTitle">Informações de contato</h2>
			<div class="d-flex flex-column align-start mt-8 ga-4 contactContent">
				<p>Lelis Magno da Silva | CRECI 0000-X-SC</p>
				<p>
					<v-icon size="small">mdi-whatsapp</v-icon>
					(48) 99999-9999
				</p>
				<p>
					<v-icon size="small">mdi-email-outline</v-icon>
					lelismagno@imoveis.com
				</p>
				<p>
					<v-icon size="small">mdi-instagram</v-icon>
					lelismagnoimoveis
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useScreen } from "@/composables/useScreen";

const { isMobile } = useScreen();

const name = ref<string>("");
const email = ref<string>("");
const phone = ref<string>("");
const message = ref<string>("");
const form = ref<HTMLFormElement | null>(null);

function submitForm() {
	name.value = "";
	email.value = "";
	phone.value = "";
	message.value = "";

	form.value?.reset();
}
</script>

<style scoped lang="scss">
@media (max-width: 956px) {
	.contactTitle {
		font-size: 1.4rem;
	}
}
@media (max-width: 480px) {
	.contactTitle {
		font-size: 1.3rem;
	}

	.contactContent {
		font-size: 0.9rem;
	}
}
</style>
