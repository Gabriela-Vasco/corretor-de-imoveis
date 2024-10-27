<template>
	<ModalBase v-model="dialog" title="" width="900px">
		<div>
			<div class="fit-content mb-10" style="width: 500px">
				<h3
					class="montserrat-title font-weight-medium ml-10"
					style="font-size: 22px"
				>
					Infraestrutura e outras características
				</h3>
				<v-divider color="grey" class="border-opacity-50" :thickness="1" />
			</div>
			<v-list lines="one" class="py-0 list w-100">
				<v-list-item
					v-for="(item, index) in infraestructureItems"
					:key="index"
					:title="item"
					prepend-icon="mdi-circle-small"
					class="mr-auto"
				></v-list-item>
			</v-list>
		</div>
	</ModalBase>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ModalBase from "@/components/ModalBase/index.vue";

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
</style>
