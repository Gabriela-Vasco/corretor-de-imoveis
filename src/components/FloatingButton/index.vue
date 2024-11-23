<template>
	<div class="border-primary btn mb-10" :class="isMobile ? 'mr-4' : 'mr-12'">
		<v-btn
			:icon="true"
			:size="isMobile ? '65' : '75'"
			color="green"
			target="_blank"
			:href="formattedWhatsAppLink"
		>
			<v-icon :size="isMobile ? 'large' : 'x-large'">mdi-whatsapp</v-icon>
		</v-btn>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useScreen } from "@/composables/useScreen";
import { usePersonalInfoStore } from "@/store/personalInfo";

const personalInfoStore = usePersonalInfoStore();

const whatsapp_phone_number = computed(
	() => personalInfoStore.personalInfoList?.[0]?.whatsapp_phone_number,
);

const whatsapp_text_message = computed(
	() => personalInfoStore.personalInfoList?.[0]?.whatsapp_text_message,
);

const formattedWhatsAppLink = computed(() => {
	const phone = whatsapp_phone_number.value;
	const message = whatsapp_text_message.value;
	return `https://wa.me/${phone}?text=${message}`;
});
const { isMobile } = useScreen();
</script>

<style scoped lang="scss">
.btn {
	position: fixed;
	bottom: 0;
	right: 0;
}
</style>
