<template>
	<v-dialog v-model="model" opacity="0.7" width="1200px">
		<v-btn
			v-if="isMobile"
			icon="mdi-close-thick"
			color="primary"
			variant="flat"
			size="small"
			class="mt-3 mr-3"
			style="position: absolute; top: 0; right: 0; z-index: 9999"
			@click="model = false"
		/>
		<v-sheet height="auto" style="overflow-x: hidden">
			<div class="mb-5">
				<v-img
					:src="mainImage"
					cover
					:max-height="isXMobile ? '100%' : '600px'"
					min-height="auto"
				/>
			</div>
			<div
				v-if="visibleProperties.length"
				class="d-flex align-center justify-center w-100 py-5"
			>
				<v-btn
					icon
					flat
					:size="isXMobile ? '60px' : '90px'"
					variant="text"
					class="d-flex align-center justify-center btnLeft"
					:disabled="currentIndex === 0"
					@click="prevProperty"
				>
					<v-icon
						:size="isXMobile ? '90px' : '120px'"
						:color="currentIndex === 0 ? 'gray' : 'primary'"
					>
						mdi-menu-left
					</v-icon>
				</v-btn>

				<div
					class="d-flex justify-space-between align-center w-100 overflow-hidden"
				>
					<div
						ref="cardsContainer"
						class="w-100 d-flex justify-space-between"
						:class="isXMobile ? 'ga-2' : 'ga-8'"
					>
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
					:size="isXMobile ? '60px' : '90px'"
					variant="text"
					class="d-flex align-center justify-center btnRight"
					:disabled="currentIndex + visibleCount >= propertyImages.length"
					@click="nextProperty"
				>
					<v-icon
						:size="isXMobile ? '90px' : '120px'"
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
import { ref, nextTick, computed, watch } from "vue";
import { animate } from "motion";
import { useScreen } from "@/composables/useScreen";

const { isXMobile, isMobile, windowWidth } = useScreen();

const props = defineProps({
	propertyImages: { type: Array, default: () => [] },
	firstImage: { type: String, default: "" },
});

const model = defineModel<boolean>();
const currentIndex = ref(0);
const imagesContainer = ref<HTMLElement | null>(null);
const mainImage = ref();
const visibleCount = computed(() => {
	if (windowWidth.value <= 480) return 2;
	return 3;
});

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
		currentIndex.value + visibleCount.value,
	);
});

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
	if (currentIndex.value + visibleCount.value < props.propertyImages.length) {
		animateCards("right");

		currentIndex.value = Math.min(
			currentIndex.value + visibleCount.value,
			props.propertyImages.length - visibleCount.value,
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
