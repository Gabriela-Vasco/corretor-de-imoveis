<template>
	<div
		class="d-flex justify-space-between w-100 my-16"
		:class="isMobile ? 'flex-column align-center' : 'align-start'"
	>
		<div class="d-flex flex-column align-center w-100">
			<h2 class="contactTitle">Envie uma mensagem</h2>
			<v-form
				ref="form"
				v-model="valid"
				class="d-flex flex-column align-center w-100"
			>
				<v-text-field
					v-model="name"
					label="Nome *"
					variant="underlined"
					width="500px"
					max-width="80%"
					:rules="[rules.required]"
				></v-text-field>
				<v-text-field
					v-model="email"
					label="E-mail *"
					variant="underlined"
					width="500px"
					max-width="80%"
					:rules="[rules.required, rules.email]"
				></v-text-field>
				<v-text-field
					v-model="phone"
					label="Telefone *"
					variant="underlined"
					width="500px"
					max-width="80%"
					hint="Digite apenas valores numéricos"
					:rules="[rules.required, rules.phone]"
					@input="formatPhone"
				></v-text-field>
				<v-textarea
					v-model="message"
					label="Mensagem (opcional)"
					variant="outlined"
					class="mt-5"
					width="500px"
					max-width="80%"
					:rules="[rules.maxLength(250)]"
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
						:loading="loading"
						:disabled="!valid"
						:size="isMobile ? 'small' : 'default'"
						:class="isMobile ? 'mt-5' : 'mt-2'"
						class="align-self-end"
						variant="flat"
						color="secondary-darken-1"
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
import { send } from "@emailjs/browser";
import { useRuntimeConfig } from "nuxt/app";
import { useScreen } from "@/composables/useScreen";
import { useRules } from "@/composables/useRules";

const { isMobile } = useScreen();
const rules = useRules();

const name = ref<string>("");
const email = ref<string>("");
const phone = ref<string>("");
const message = ref<string>("");
const form = ref<HTMLFormElement | null>(null);
const config = useRuntimeConfig();
const loading = ref<boolean>(false);
const valid = ref<boolean>(false);

async function submitForm() {
	try {
		loading.value = true;
		await sendEmail(name.value, email.value, phone.value, message.value);

		form.value?.reset();
		form.value?.resetValidation();
	} catch (error) {
		console.log(error);
	} finally {
		loading.value = false;
	}
}

async function sendEmail(
	name: string,
	email: string,
	phone: string,
	message: string,
) {
	try {
		const service = config.public.emailjs_service as string;
		const template = config.public.emailjs_template as string;
		const key = config.public.emailjs_key;

		if (service && template && key) {
			const messageData =
				"Nome: " +
					name +
					"\n" +
					"Email: " +
					email +
					"\n" +
					"Telefone: " +
					phone +
					"\n" +
					"Mensagem: " +
					message || "Sem mensagem";

			await send(service, template, { message: messageData }, key);
		}
	} catch (error) {
		console.log(error);
	}
}

const formatPhone = () => {
	let digits = phone.value.replace(/\D/g, "");

	if (digits.length > 11) digits = digits.slice(0, 11);

	if (digits.length <= 10) {
		phone.value = digits.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
	} else {
		phone.value = digits.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
	}
};
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
