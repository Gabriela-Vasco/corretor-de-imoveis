<template>
	<div
		class="d-flex align-start justify-space-between w-100"
		style="margin: 150px 0"
	>
		<div class="d-flex flex-column align-center w-100">
			<h2>Envie uma mensagem</h2>
			<v-form ref="form" class="d-flex flex-column align-center">
				<v-text-field
					v-model="name"
					label="Nome"
					variant="underlined"
					style="width: 500px"
					:rules="[() => !!name || 'Campo obrigatório']"
				></v-text-field>
				<v-text-field
					v-model="email"
					label="E-mail"
					variant="underlined"
					style="width: 500px"
					:rules="[() => !!name || 'Campo obrigatório']"
				></v-text-field>
				<v-text-field
					v-model="phone"
					label="Telefone"
					variant="underlined"
					style="width: 500px"
					:rules="[() => !!name || 'Campo obrigatório']"
				></v-text-field>
				<v-textarea
					v-model="message"
					label="Mensagem"
					variant="outlined"
					class="mt-5"
					style="width: 500px"
					:rules="[() => !!name || 'Campo obrigatório']"
				></v-textarea>
				<small class="align-self-start">
					<v-icon size="x-small">mdi-lock-outline</v-icon>
					Ao enviar você está aceitando a política de privacidade.
				</small>
				<br />
				<v-btn
					class="align-self-end"
					variant="flat"
					color="secondary-darken-1"
					@click="submitForm"
				>
					Enviar
				</v-btn>
			</v-form>
		</div>
		<v-divider vertical class="border-opacity-50 w-100" :thickness="2" />
		<div class="d-flex flex-column align-center w-100">
			<h2>Informações de contato</h2>
			<div class="d-flex flex-column align-start mt-8 ga-4">
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

<style scoped></style>
