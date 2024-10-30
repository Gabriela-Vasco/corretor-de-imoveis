<template>
	<div>
		<div
			v-if="visibleProperties.length"
			class="d-flex align-center justify-center w-100 py-2 mt-12 imageCarousel"
			style="height: 480px"
		>
			<v-btn
				icon
				flat
				size="90px"
				class="d-flex align-center justify-center btnLeft"
				:disabled="currentIndex === 0"
				@click="prevProperty"
			>
				<v-icon size="120px" :color="currentIndex === 0 ? 'gray' : 'primary'">
					mdi-menu-left
				</v-icon>
			</v-btn>

			<div class="d-flex justify-space-between align-center w-100 overflow-hidden">
				<div ref="cardsContainer" class="w-100 d-flex justify-space-between">
					<v-img
						v-for="(image, index) in visibleProperties"
						:key="index"
						:src="image"
						cover
						max-height="480px"
						min-height="480px"
					/>
				</div>
			</div>

			<v-btn
				icon
				flat
				size="90px"
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
		<div class="mainContent">
			<div class="border-md rounded-lg px-2 py-1 text-center" style="width: 120px">
				<span>Cód: {{ currentProperty?.code }}</span>
			</div>
			<div class="d-flex justify-space-between align-center my-3">
				<h2 class="montserrat-title font-weight-medium">
					{{ currentProperty?.title }}
				</h2>
				<v-btn
					:icon="true"
					size="70px"
					color="secondary-darken-1"
					variant="text"
					@click="propertiesStore.toggleFavorite(currentProperty?.code)"
				>
					<v-icon size="48px" color="secondary-darken-1">
						{{
							propertiesStore.favoritedProperties?.find(
								(fav) => fav.code === currentPropertyId,
							)
								? "mdi-heart"
								: "mdi-heart-outline"
						}}
					</v-icon>
				</v-btn>
			</div>
			<v-divider
				color="dark"
				class="border-opacity-75"
				style="width: 1000px"
				:thickness="1"
			/>
			<p class="w-75 text-justify my-8">
				{{ currentProperty?.description }}
			</p>

			<h3 class="montserrat-title font-weight-medium mb-2">
				{{ currentProperty?.neighborhood }} - Florianópolis/SC
			</h3>
			<h4 class="montserrat-title font-weight-medium mb-5">
				R$
				{{ formatCurrency(currentProperty?.price) }}
			</h4>
			<div class="d-flex ga-3">
				<v-chip class="montserrat-title font-weight-medium" color="primary">
					Imóvel {{ currentProperty?.property_type?.toLowerCase() }}
				</v-chip>

				<v-chip class="montserrat-title font-weight-medium" color="primary">
					{{
						currentProperty?.sale_or_rent === "Venda"
							? `Imóvel à ${currentProperty?.sale_or_rent?.toLowerCase()}`
							: `Imóvel para ${currentProperty?.sale_or_rent?.toLowerCase()}`
					}}
				</v-chip>
			</div>

			<div style="border: 1px solid black" class="fit-content my-16 px-10">
				<div class="px-16 py-12 infoList">
					<span><strong>Área total</strong> {{ currentProperty?.total_area }}</span>
					<span class="d-flex align-center ga-2">
						<v-icon>mdi-bed-double-outline</v-icon>
						{{ currentProperty?.bedrooms }} dormitórios</span
					>
					<span class="d-flex align-center ga-2">
						<v-icon>mdi-car</v-icon> {{ currentProperty?.garage }} vaga de
						garagem</span
					>
					<span
						><strong>Condomínio</strong> R$
						{{ formatCurrency(currentProperty?.condominium_price) }}</span
					>
					<span
						><strong>Área privativa</strong> {{ currentProperty?.private_area }}</span
					>
					<span class="d-flex align-center ga-2">
						<v-icon>mdi-toilet</v-icon>
						{{ currentProperty?.bathrooms }} banheiros</span
					>
					<span class="d-flex align-center ga-2">
						<v-icon>mdi-shower-head</v-icon>
						{{ currentProperty?.suites }} suítes</span
					>
					<span
						><strong>IPTU</strong> R$
						{{ formatCurrency(currentProperty?.IPTU) }}</span
					>
				</div>
			</div>

			<div class="mt-100 d-flex align-start justify-space-between ga-16">
				<div>
					<div class="fit-content">
						<h3
							class="montserrat-title font-weight-medium mr-5"
							style="font-size: 22px"
						>
							Infraestrutura e outras características
						</h3>
						<v-divider color="grey" class="border-opacity-50" :thickness="1" />
					</div>
					<v-list lines="one" class="list mt-6 py-0 fit-content">
						<v-list-item
							v-for="(item, index) in visibleInfraestructureItems"
							:key="index"
							:title="item"
							prepend-icon="mdi-circle-small"
							class="px-0"
						></v-list-item>
					</v-list>
					<v-btn variant="text" class="px-0 mt-4 ml-2" @click="openDialog = true">
						<span class="text-decoration-underline">
							Veja mais <v-icon class="mb-1">mdi-menu-right</v-icon></span
						>
					</v-btn>
				</div>
				<div class="fit-content mx-auto">
					<div class="fit-content">
						<h3
							class="montserrat-title font-weight-medium mr-5"
							style="font-size: 22px"
						>
							Detalhes
						</h3>
						<v-divider color="grey" class="border-opacity-50" :thickness="1" />
					</div>
					<div class="d-flex align-center justify-space-between my-8 ga-12">
						<div class="d-flex flex-column align-center">
							<v-btn color="primary" size="90px" icon="true" class="mb-3">
								<v-icon color="secondary-darken-1" size="35px">
									mdi-camera-outline
								</v-icon>
							</v-btn>
							<p>Fotos</p>
						</div>

						<div class="d-flex flex-column align-center">
							<v-btn color="primary" size="90px" icon="true" class="mb-3">
								<v-icon color="secondary-darken-1" size="35px">
									mdi-play-outline
								</v-icon>
							</v-btn>
							<p>Vídeo</p>
						</div>

						<div class="d-flex flex-column align-center">
							<v-btn color="primary" size="90px" icon="true" class="mb-3">
								<v-icon color="secondary-darken-1" size="35px">
									mdi-map-marker-outline
								</v-icon>
							</v-btn>
							<p>Mapa</p>
						</div>
					</div>
				</div>
			</div>

			<div
				v-if="relatedProperties.length"
				class="d-flex flex-column align-center mt-120"
			>
				<h2
					class="montserrat-title font-weight-medium mr-5"
					style="font-size: 24px"
				>
					Imóveis relacionados
				</h2>
				<v-divider
					color="grey"
					class="border-opacity-50 mb-8 mt-3"
					style="width: 540px"
					:thickness="1"
				/>
				<div class="d-flex -justify-space-between align-center ga-10">
					<PropertyCard
						v-for="property in relatedProperties"
						:key="property.code"
						:featured-property="property"
						class="property-card"
					/>
				</div>
			</div>
		</div>

		<InfraestructureModal
			v-if="visibleInfraestructureItems.length"
			v-model="openDialog"
			:infraestructure-items="infrastructureItems"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, watch } from "vue";
import { useCookie } from "nuxt/app";
import { animate } from "motion";
import { useRoute } from "vue-router";
import { usePropertiesStore } from "../../../store/properties";
import InfraestructureModal from "./components/InfraestructureModal/index.vue";

const propertiesStore = usePropertiesStore();
const visibleCount = 3;
const currentPropertyId = ref<string | null>(null);
const currentProperty = ref();
const route = useRoute();

const visibleInfraestructureItems = ref([]);
const infrastructureItems = ref([]);
const propertyImages = ref([]);

const cardsContainer = ref<HTMLElement | null>(null);
const currentIndex = ref(0);
const openDialog = ref(false);

onMounted(async () => {
	currentPropertyId.value = route.params.propertyId as string;
	currentProperty.value = await propertiesStore.getPropertyByCode(
		currentPropertyId.value,
	);

	const { infrastructure, images } = currentProperty.value;

	if (infrastructure) {
		infrastructureItems.value = infrastructure;

		visibleInfraestructureItems.value = [...infrastructureItems.value].slice(
			0,
			6,
		);
	}

	if (images) {
		propertyImages.value = images.split(",");
	}
});

const favoriteProperties = useCookie("favoriteProperties", {
	default: () => [],
});
const isFavorited = ref(false);

watch(currentProperty, () => {
	isFavorited.value = favoriteProperties.value.some(
		(property) => property.code === currentProperty.value.code,
	);
});

const visibleProperties = computed(() => {
	return propertyImages.value.slice(
		currentIndex.value,
		currentIndex.value + visibleCount,
	);
});

const relatedProperties = computed(() => {
	if (currentProperty.value) {
		const { related_properties } = currentProperty.value;
		return propertiesStore.propertiesList.filter((property) => {
			return related_properties.includes(property.code);
		});
	}
	return [];
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
	if (currentIndex.value + visibleCount < propertyImages.value.length) {
		animateCards("right");

		currentIndex.value = Math.min(
			currentIndex.value + visibleCount,
			propertyImages.value.length - visibleCount,
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

function formatCurrency(price: string) {
	return Number(price).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}
</script>

<style scoped lang="scss">
.infoList {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 30px 80px;
}
.list {
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	grid-template-columns: repeat(3, 1fr);
	gap: 0 30px;
}

.mainContent {
	padding: 80px 70px 150px;
}

.imageCarousel {
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
}
</style>
