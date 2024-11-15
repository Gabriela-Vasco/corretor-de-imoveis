<template>
	<div
		class="d-flex flex-column align-center"
		:class="isMobile ? 'py-8' : 'py-16'"
		style="max-width: 100vw"
	>
		<div v-if="loading" class="d-flex align-center justify-center ga-12 my-5">
			<v-skeleton-loader
				v-for="index in visibleCount"
				:key="index"
				class="mx-auto border"
				width="300"
				type="image, article"
			/>
		</div>
		<div v-else>
			<div v-if="visibleProperties.length">
				<h3 class="featuredTitle roboto-title text-center">Imóveis em destaque</h3>
				<div class="d-flex align-center justify-center py-2 mainConteiner">
					<v-btn
						v-if="featuredProperties.length > visibleCount"
						icon
						variant="text"
						:size="isMobile ? '30px' : '90px'"
						class="d-flex align-center justify-center pr-2"
						:class="isMobile ? 'ml-0' : 'ml-2'"
						:disabled="currentIndex === 0"
						@click="prevProperty"
					>
						<v-icon size="120px" :color="currentIndex === 0 ? 'gray' : 'primary'">
							mdi-menu-left
						</v-icon>
					</v-btn>

					<div
						class="d-flex justify-center align-center w-100 overflow-hidden ga-8 cardContainer"
						:class="isXMobile ? 'mx-2 pa-0' : isMobile ? 'mx-6 py-5' : 'mx-8 py-5'"
					>
						<div ref="cardsContainer" class="property-cards pa-0">
							<PropertyCard
								v-for="property in visibleProperties"
								:key="property?.code"
								:featured-property="property"
								class="property-card pa-0"
								@click="goToProperty(property.code)"
							/>
						</div>
					</div>

					<v-btn
						v-if="featuredProperties.length > visibleCount"
						icon
						variant="text"
						:size="isMobile ? '30px' : '90px'"
						class="d-flex align-center justify-center pl-2"
						:class="isMobile ? 'mr-' : 'mr-2'"
						:disabled="currentIndex + visibleCount >= featuredProperties.length"
						@click="nextProperty"
					>
						<v-icon
							:size="isMobile ? '120px' : '120px'"
							:color="
								currentIndex + visibleCount >= featuredProperties.length
									? 'gray'
									: 'primary'
							"
						>
							mdi-menu-right
						</v-icon>
					</v-btn>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from "vue";
import { animate } from "motion";
import { useRouter } from "vue-router";
import { usePropertiesStore } from "@/store/properties";
import PropertyCard from "@/components/PropertyCard";
import { type Property } from "~/types/Property";
import { useScreen } from "@/composables/useScreen";

const router = useRouter();
const { windowWidth, isMobile, isXMobile } = useScreen();
const propertiesStore = usePropertiesStore();
const currentIndex = ref(0);
const visibleCount = computed(() => {
	if (windowWidth.value <= 956) return 1;
	if (windowWidth.value <= 1280) return 2;
	if (windowWidth.value <= 1700) return 3;
	return 4;
});

const loading = ref(false);

onMounted(async () => {
	try {
		loading.value = true;
		await propertiesStore.loadData();
	} catch (e) {
		console.error(e);
	} finally {
		loading.value = false;
	}
});

const featuredProperties = computed<Property[]>(() =>
	propertiesStore.propertiesList.filter(
		(property: Property) => property.featured,
	),
);

const visibleProperties = computed(() => {
	return featuredProperties.value.slice(
		currentIndex.value,
		currentIndex.value + visibleCount.value,
	);
});

const cardsContainer = ref<HTMLElement | null>(null);

const prevProperty = () => {
	if (currentIndex.value > 0) {
		animateCards("left");

		currentIndex.value = Math.max(currentIndex.value - visibleCount.value, 0);

		nextTick(() => {
			animateCardsIn("left");
		});
	}
};

const nextProperty = () => {
	if (
		currentIndex.value + visibleCount.value <
		featuredProperties.value.length
	) {
		animateCards("right");

		currentIndex.value = Math.min(
			currentIndex.value + visibleCount.value,
			featuredProperties.value.length - visibleCount.value,
		);

		nextTick(() => {
			animateCardsIn("right");
		});
	}
};

const animateCards = (direction: string) => {
	const slideDistance = direction === "right" ? -100 : 100;
	if (cardsContainer.value) {
		const cardElements = Array.from(cardsContainer.value.children);

		return animate(
			cardElements,
			{
				transform: `translateX(${slideDistance}px)`,
				opacity: 0,
			},
			{
				duration: 0.5,
				easing: "ease-in-out",
			},
		);
	}
};

const animateCardsIn = (direction: string) => {
	const slideDistance = direction === "right" ? 100 : -100;
	if (cardsContainer.value) {
		const cardElements = Array.from(cardsContainer.value.children);

		animate(
			cardElements,
			{
				transform: [`translateX(${slideDistance}px)`, "translateX(0)"],
				opacity: [0, 1],
			},
			{
				duration: 0.5,
				easing: "ease-in-out",
			},
		);
	}
};

function goToProperty(code: string) {
	router.push("/properties-list/" + code);
}
</script>

<style scoped lang="scss">
.featuredTitle {
	font-size: 32px;
	margin-bottom: 48px;
}

.property-cards {
	display: flex;
	gap: 40px;
	transition:
		transform 0.5s ease-in-out,
		opacity 0.5s ease-in-out;
}

.property-card:hover {
	cursor: pointer;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

@media (max-width: 956px) {
	.featuredTitle {
		font-size: 28px;
		margin-bottom: 16px;
	}
}

@media (max-width: 480px) {
	.featuredTitle {
		font-size: 28px;
		margin-bottom: 0;
	}

	.mainConteiner {
		scale: 0.9;
	}

	.cardContainer {
		margin: 0;
	}
}

@media (max-width: 390px) {
	.featuredTitle {
		font-size: 26px;
		margin-bottom: 0;
	}

	.mainConteiner {
		scale: 0.8;
	}
}
</style>
