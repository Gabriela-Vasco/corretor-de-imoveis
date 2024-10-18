<template>
	<div class="d-flex flex-column align-center py-16">
		<h3 class="featuredTitle mb-12">Imóveis em destaque</h3>
		<div
			v-if="visibleProperties.length"
			class="d-flex align-center justify-center py-2"
		>
			<v-btn
				icon
				variant="text"
				size="90px"
				class="d-flex align-center justify-center ml-2 pr-2"
				:disabled="currentIndex === 0"
				@click="prevProperty"
			>
				<v-icon size="120px" :color="currentIndex === 0 ? 'gray' : 'primary'">
					mdi-menu-left
				</v-icon>
			</v-btn>

			<div class="d-flex justify-center align-center w-100 overflow-hidden py-5">
				<div ref="cardsContainer" class="property-cards mx-8">
					<PropertyCard
						v-for="property in visibleProperties"
						:key="property.code"
						:featured-property="property"
						class="property-card"
					/>
				</div>
			</div>

			<v-btn
				icon
				variant="text"
				size="90px"
				class="d-flex align-center justify-center mr-2 pl-2"
				:disabled="currentIndex + visibleCount >= featuredProperties.length"
				@click="nextProperty"
			>
				<v-icon
					size="120px"
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
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { animate } from "motion";
import { featuredPropertiesMock } from "./featuredPropertiesMock";
import PropertyCard from "@/components/PropertyCard";
import { type FeaturedProperty } from "~/types/FeaturedProperty";

const featuredProperties = ref<FeaturedProperty[]>(featuredPropertiesMock);
const currentIndex = ref(0);
const visibleCount = 3;

const visibleProperties = computed(() => {
	return featuredProperties.value.slice(
		currentIndex.value,
		currentIndex.value + visibleCount,
	);
});

const cardsContainer = ref<HTMLElement | null>(null);

const prevProperty = () => {
	if (currentIndex.value > 0) {
		animateCards("left");

		currentIndex.value = Math.max(currentIndex.value - visibleCount, 0);

		nextTick(() => {
			animateCardsIn("left");
		});
	}
};

const nextProperty = () => {
	if (currentIndex.value + visibleCount < featuredProperties.value.length) {
		animateCards("right");

		currentIndex.value = Math.min(
			currentIndex.value + visibleCount,
			featuredProperties.value.length - visibleCount,
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
</script>

<style scoped lang="scss">
.featuredTitle {
	font-size: 32px;
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
</style>
