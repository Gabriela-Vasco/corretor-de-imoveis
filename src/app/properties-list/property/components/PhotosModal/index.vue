<template>
	<v-dialog v-model="model" opacity="0.7" width="1200px">
		<v-sheet height="auto" style="overflow-x: hidden">
			<div>
				<v-img :src="mainImage" cover max-height="600px" min-height="auto" />
			</div>
			<div
				v-if="visibleProperties.length"
				class="d-flex align-center justify-center w-100 imageCarousel py-5"
			>
				<v-btn
					icon
					flat
					size="90px"
					variant="text"
					class="d-flex align-center justify-center btnLeft"
					:disabled="currentIndex === 0"
					@click="prevProperty"
				>
					<v-icon size="120px" :color="currentIndex === 0 ? 'gray' : 'primary'">
						mdi-menu-left
					</v-icon>
				</v-btn>

				<div
					class="d-flex justify-space-between align-center w-100 overflow-hidden"
				>
					<div ref="cardsContainer" class="w-100 d-flex justify-space-between ga-8">
						<v-img
							v-for="(image, index) in visibleProperties"
							:key="index"
							:src="image"
							cover
							max-height="200px"
							min-height="200px"
							class="image-cover"
							:style="mainImage === image ? 'border: 5px solid #253259' : ''"
							@click="mainImage = image"
						/>
					</div>
				</div>

				<v-btn
					icon
					flat
					size="90px"
					variant="text"
					class="d-flex align-center justify-center btnRight"
					:disabled="currentIndex + visibleCount >= propertyImages.length"
					@click="nextProperty"
				>
					<v-icon
						size="120px"
						:color="
							currentIndex + visibleCount >= propertyImages.length ? 'gray' : 'primary'
						"
					>
						mdi-menu-right
					</v-icon>
				</v-btn>
			</div>
		</v-sheet>
	</v-dialog>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, watch, onUnmounted } from "vue";
import { animate } from "motion";

const props = defineProps({
	propertyImages: { type: Array, default: () => [] },
	firstImage: { type: String, default: "" },
});

const model = defineModel<boolean>();
const visibleCount = 3;
const currentIndex = ref(0);
const imagesContainer = ref<HTMLElement | null>(null);
const mainImage = ref();

watch(model, () => {
	mainImage.value = props.firstImage || props.propertyImages[0];
	if (!visibleProperties.value.includes(mainImage.value)) {
		const index = props.propertyImages.indexOf(mainImage.value);
		currentIndex.value = Math.max(index - 1, 0);

		nextTick(() => {
			animateCardsIn("right");
		});
	}
});

const visibleProperties = computed(() => {
	return props.propertyImages.slice(
		currentIndex.value,
		currentIndex.value + visibleCount,
	);
});

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
	if (currentIndex.value + visibleCount < props.propertyImages.length) {
		animateCards("right");

		currentIndex.value = Math.min(
			currentIndex.value + visibleCount,
			props.propertyImages.length - visibleCount,
		);

		nextTick(() => {
			animateCardsIn("right");
		});
	}
};

const animateCards = (direction: string) => {
	const slideDistance = direction === "right" ? -100 : 100;
	if (imagesContainer.value) {
		const cardElements = Array.from(imagesContainer.value.children);

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
	if (imagesContainer.value) {
		const cardElements = Array.from(imagesContainer.value.children);

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

<style lang="scss" scoped>
.image-cover {
	cursor: pointer;
}

.image-cover:hover {
	opacity: 0.8;
}
</style>
<!-- .imageCarousel {
	position: relative;
}
.btnLeft {
	position: absolute;
	left: 0;
	z-index: 999;
	top: 50%;
	transform: translateY(-50%);
}

.btnRight {
	position: absolute;
	right: 0;
	z-index: 999;
	top: 50%;
	transform: translateY(-50%);
} -->
