<template>
	<div class="bg-light pb-5">
		<v-carousel
			v-if="quotesList"
			v-model="activeQuote"
			height="400"
			:show-arrows="false"
			hide-delimiter-background
			color="dark"
			class="bg-light px-5 mb-5"
		>
			<v-carousel-item
				v-for="(quote, i) in quotesList"
				:key="i"
				class="w-66 mx-auto"
				style="border: 1px solid red"
			>
				<v-sheet color="light" height="100%">
					<div class="d-flex flex-column fill-height justify-center align-center">
						<p class="mb-4 text-center" style="font-size: 20px">
							{{ quote.message }}
						</p>
						<p>{{ quote.author }}</p>
					</div>
				</v-sheet>
			</v-carousel-item>
		</v-carousel>
	</div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useQuotesStore } from "@/store/quotes";

const quotesStore = useQuotesStore();

onMounted(async () => {
	await quotesStore.loadData();
});

const quotesList = computed(() => quotesStore.quotesList);
const activeQuote = ref(0);
</script>

<style lang="scss" scoped></style>
