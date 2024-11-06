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
				:height="isXMobile ? '270' : isMobile ? '300' : '400'"
				:show-arrows="false"
				hide-delimiter-background
				color="dark"
				class="bg-light"
			>
				<v-carousel-item
					v-for="(quote, i) in quotesList"
					:key="i"
					class="mx-auto"
					:class="isMobile ? 'w-100  px-8' : 'w-66  px-5'"
				>
					<v-sheet color="light" height="100%">
						<div
							class="d-flex flex-column fill-height justify-center align-center"
							:class="isMobile ? 'mx-0' : 'mx-auto'"
						>
							<p class="mb-4 quoteText">
								{{ quote.message }}
							</p>
							<p class="mb-5">{{ quote.author }}</p>
						</div>
					</v-sheet>
				</v-carousel-item>
			</v-carousel>
		</div>
	</div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useQuotesStore } from "@/store/quotes";
import { useScreen } from "@/composables/useScreen";

const { isMobile, isXMobile } = useScreen();
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

<style lang="scss" scoped>
.quoteText {
	font-size: 20px;
	text-align: center;
}

@media (max-width: 956px) {
	.quoteText {
		font-size: 16px;
	}
}

@media (max-width: 480px) {
	.quoteText {
		font-size: 14px;
	}
}
</style>
