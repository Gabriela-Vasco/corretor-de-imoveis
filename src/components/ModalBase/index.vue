<template>
	<div class="text-center pa-4">
		<v-dialog v-model="dialog" :width="width" persistent>
			<v-card class="pb-16">
				<v-card-actions class="pb-0">
					<v-btn
						color="secondary-darken-1"
						icon="mdi-close-thick"
						size="large"
						@click="closeDialog"
					>
					</v-btn>
				</v-card-actions>
				<v-card-title>{{ title }}</v-card-title>
				<v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>
				<v-card-text>
					<slot>{{ text }}</slot>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
	modelValue: Boolean,
	title: { type: String, default: "Título" },
	subtitle: { type: String, default: "" },
	text: { type: String, default: "" },
	width: { type: String, default: "500px" },
});

const emit = defineEmits(["update:modelValue"]);
const dialog = ref(props.modelValue);

watch(
	() => props.modelValue,
	(newVal) => {
		dialog.value = newVal;
	},
);

function closeDialog() {
	dialog.value = false;
	emit("update:modelValue", false);
}
</script>
