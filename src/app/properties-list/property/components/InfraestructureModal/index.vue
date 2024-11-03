<template>
	<ModalBase v-model="dialog" title="" width="fit-content">
		<div>
			<div class="fit-content mb-10" style="width: 500px; max-width: 90%">
				<h3
					class="montserrat-title font-weight-medium modalTitle"
					:class="isMobile ? '' : 'ml-10'"
				>
					Infraestrutura e outras características
				</h3>
				<v-divider color="grey" class="border-opacity-50" :thickness="1" />
			</div>
			<v-list lines="one" class="py-0 list w-100">
				<v-list-item
					v-for="(item, index) in infraestructureItems"
					:key="index"
					:density="isMobile ? 'compact' : 'default'"
					prepend-icon="mdi-circle-small"
					class="mr-auto"
				>
					<span class="listItem">{{ item }}</span>
				</v-list-item>
			</v-list>
		</div>
	</ModalBase>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ModalBase from "@/components/ModalBase/index.vue";
import { useScreen } from "@/composables/useScreen";

const { isMobile } = useScreen();

defineProps({
	infraestructureItems: { type: Array, default: () => [] },
});

const dialog = ref(false);
</script>

<style lang="scss" scoped>
.list {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.modalTitle {
	font-size: 1.4rem;
}

@media (max-width: 380px) {
	.modalTitle {
		font-size: 1.2rem;
	}
	.listItem {
		font-size: 0.9rem;
	}
}
</style>
