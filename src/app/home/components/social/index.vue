<template>
	<div class="bg-light pb-5">
		<div v-if="loading">
			<v-skeleton-loader
				class="mx-auto py-10"
				height="300"
				color="light"
				width="60%"
				type="list-item-two-line"
			/>
		</div>
		<div v-else>
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
				>
					<v-sheet color="light" height="100%">
						<div
							class="d-flex flex-column fill-height justify-center align-center mx-auto"
						>
							<p class="mb-4 text-center" style="font-size: 20px">
								{{ quote.message }}
							</p>
							<p>{{ quote.author }}</p>
						</div>
					</v-sheet>
				</v-carousel-item>
			</v-carousel>
		</div>
	</div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useQuotesStore } from "@/store/quotes";

const quotesStore = useQuotesStore();
const loading = ref(false);

onMounted(async () => {
	try {
		loading.value = true;
		await quotesStore.loadData();
	} catch (e) {
		console.error(e);
	} finally {
		loading.value = false;
	}
});

const quotesList = computed(() => quotesStore.quotesList);
const activeQuote = ref(0);
</script>
