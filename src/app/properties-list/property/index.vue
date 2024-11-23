<template>
	<div>
		<Head>
			<Title>{{ currentProperty?.title }}</Title>
			<Meta name="description" :content="currentProperty?.description" />
			<Meta property="og:title" :content="currentProperty?.title" />
			<Meta property="og:description" :content="currentProperty?.description" />
			<Meta property="og:image" :content="firstImage" />
			<Meta property="og:url" :content="fullUrl" />
		</Head>
		<div
			v-if="visibleProperties.length"
			class="d-flex align-center justify-center w-100 py-2 imageCarousel"
			style="height: 480px"
		>
			<v-btn
				icon
				flat
				:size="isMobile ? '70px' : '90px'"
				:variant="isMobile ? 'flat' : 'tonal'"
				color="rgba(255, 255, 255, 0.5)"
				class="d-flex align-center justify-center btnLeft"
				:class="isMobile ? 'ml-2' : ''"
				:disabled="currentIndex === 0"
				@click="prevProperty"
			>
				<v-icon
					:size="isMobile ? '90px' : '120px'"
					:color="currentIndex === 0 ? 'gray' : 'primary'"
				>
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
						style="cursor: pointer"
						@click="handleOpenPhotoDialog(image)"
					/>
				</div>
			</div>

			<v-btn
				icon
				flat
				:size="isMobile ? '70px' : '90px'"
				:variant="isMobile ? 'flat' : 'tonal'"
				class="d-flex align-center justify-center btnRight"
				:class="isMobile ? 'mr-2' : ''"
				color="rgba(255, 255, 255, 0.5)"
				:disabled="currentIndex + visibleCount >= propertyImages.length"
				@click="nextProperty"
			>
				<v-icon
					:size="isMobile ? '90px' : '120px'"
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
				<h2 class="roboto-title font-weight-medium">
					{{ currentProperty?.title }}
				</h2>
				<v-btn
					:icon="true"
					:size="isMobile ? 'default' : '70px'"
					variant="text"
					@click="propertiesStore.toggleFavorite(currentProperty?.code)"
				>
					<v-icon :size="isMobile ? '35px' : '48px'" color="secondary-darken-1">
						{{
							favoritedProperties?.find((fav) => fav.code === currentPropertyId)
								? "mdi-heart"
								: "mdi-heart-outline"
						}}
					</v-icon>
				</v-btn>
			</div>
			<v-divider
				color="dark"
				class="border-opacity-75"
				:style="isMobile ? 'width: 100%' : 'width: 1000px'"
				:thickness="1"
			/>
			<p class="text-justify my-8" :class="isMobile ? 'w-100' : 'w-75'">
				{{ currentProperty?.description }}
			</p>

			<h3 class="roboto-title font-weight-medium mb-2">
				{{ currentProperty?.neighborhood }} - Florianópolis/SC
			</h3>
			<h4 class="roboto-title font-weight-medium mb-5">
				R$
				{{ formatCurrency(currentProperty?.price) }}
			</h4>
			<div class="d-flex ga-3">
				<v-chip class="roboto-title font-weight-medium" color="primary">
					Imóvel {{ currentProperty?.property_type?.toLowerCase() }}
				</v-chip>

				<v-chip class="roboto-title font-weight-medium" color="primary">
					{{
						currentProperty?.sale_or_rent === "Venda"
							? `Imóvel à ${currentProperty?.sale_or_rent?.toLowerCase()}`
							: `Imóvel para ${currentProperty?.sale_or_rent?.toLowerCase()}`
					}}
				</v-chip>
			</div>

			<div
				style="border: 1px solid black"
				class="d-flex justify-center align-center"
				:class="
					isMobile
						? 'd-flex flex-column align-center mt-16'
						: 'px-0 fit-content mt-16'
				"
			>
				<div class="infoList w-100" :class="isMobile ? 'py-6' : 'px-16 py-12 '">
					<span class="text-no-wrap" :style="isMobile ? 'grid-area: total_area' : ''"
						><strong>Área total</strong>
						{{ formatFootage(currentProperty?.total_area) }}</span
					>
					<span
						class="d-flex align-center ga-2 text-no-wrap"
						:style="isMobile ? 'grid-area: bedrooms' : ''"
					>
						<v-icon>mdi-bed-double-outline</v-icon>
						{{ currentProperty?.bedrooms }} dormitórios</span
					>
					<span
						class="d-flex align-center ga-2 text-no-wrap"
						:style="isMobile ? 'grid-area: garages' : ''"
					>
						<v-icon>mdi-car</v-icon> {{ currentProperty?.garage }}
						{{ currentProperty?.garage === 1 ? "vaga" : "vagas" }} de garagem</span
					>
					<span
						class="text-no-wrap"
						:style="isMobile ? 'grid-area: condominium' : ''"
						><strong>Condomínio</strong> R$
						{{ formatCurrency(currentProperty?.condominium_price) }}</span
					>
					<span
						class="text-no-wrap"
						:style="isMobile ? 'grid-area: living_area' : ''"
						><strong>Área privativa</strong>
						{{ formatFootage(currentProperty?.private_area) }}</span
					>
					<span
						class="d-flex align-center ga-2 text-no-wrap"
						:style="isMobile ? 'grid-area: bathrooms' : ''"
					>
						<v-icon>mdi-toilet</v-icon>
						{{ currentProperty?.bathrooms }} banheiros</span
					>
					<span
						class="d-flex align-center ga-2 text-no-wrap"
						:style="isMobile ? 'grid-area: suites' : ''"
					>
						<v-icon>mdi-shower-head</v-icon>
						{{ currentProperty?.suites }} suítes</span
					>
					<span class="text-no-wrap" :style="isMobile ? 'grid-area: iptu' : ''"
						><strong>IPTU</strong> R$
						{{ formatCurrency(currentProperty?.IPTU) }}</span
					>
				</div>
			</div>

			<div
				class="d-flex align-start justify-space-between ga-16"
				:class="isMobile ? 'mt-16 flex-column' : 'mt-100'"
			>
				<div>
					<div class="fit-content">
						<h3
							class="roboto-title font-weight-medium mr-5"
							:style="isMobile ? 'font-size: 20px' : 'font-size: 22px'"
						>
							Infraestrutura e outras características
						</h3>
						<v-divider
							color="grey"
							class="border-opacity-50"
							:class="isMobile ? 'w-75 mt-1' : ''"
							:thickness="1"
						/>
					</div>
					<v-list lines="one" class="list mt-6 py-0 fit-content">
						<v-list-item
							v-for="(item, index) in visibleInfraestructureItems"
							:key="index"
							:title="item"
							prepend-icon="mdi-circle-small"
							class="px-0 text-no-wrap"
							min-width="fit-content"
						></v-list-item>
					</v-list>
					<v-btn
						v-if="infrastructureItems.length > 6"
						variant="text"
						class="px-0 mt-4 ml-2"
						@click="openDialog = true"
					>
						<span class="text-decoration-underline">
							Veja mais <v-icon class="mb-1">mdi-menu-right</v-icon></span
						>
					</v-btn>
				</div>
				<div class="fit-content" :class="isMobile ? '' : 'mx-auto'">
					<div class="fit-content">
						<h3
							class="roboto-title font-weight-medium mr-5"
							:style="isMobile ? 'font-size: 20px' : 'font-size: 22px'"
						>
							Detalhes
						</h3>
						<v-divider
							color="grey"
							class="border-opacity-50"
							:class="isMobile ? 'mt-1' : ''"
							:thickness="1"
						/>
					</div>
					<div
						class="d-flex align-center"
						:class="isMobile ? 'my-6 ga-10' : 'my-8 ga-12 justify-space-between'"
					>
						<div class="d-flex flex-column align-center">
							<v-btn
								color="primary"
								:size="isMobile ? '70px' : '90px'"
								icon="true"
								class="mb-3"
								style="cursor: pointer"
								@click="openPhotoDialog = true"
							>
								<v-icon color="secondary-darken-1" :size="isMobile ? '30px' : '35px'">
									mdi-camera-outline
								</v-icon>
							</v-btn>
							<p>Fotos</p>
						</div>

						<div class="d-flex flex-column align-center">
							<v-btn
								color="primary"
								:size="isMobile ? '70px' : '90px'"
								icon="true"
								class="mb-3"
								@click="openVideoDialog = true"
							>
								<v-icon color="secondary-darken-1" :size="isMobile ? '30px' : '35px'">
									mdi-play-outline
								</v-icon>
							</v-btn>
							<p>Vídeo</p>
						</div>

						<div v-if="addressFormatted" class="d-flex flex-column align-center">
							<v-btn
								color="primary"
								:size="isMobile ? '70px' : '90px'"
								icon="true"
								class="mb-3"
								@click="openMapDialog = true"
							>
								<v-icon color="secondary-darken-1" :size="isMobile ? '30px' : '35px'">
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
				class="d-flex flex-column align-center"
				:class="isMobile ? 'mt-16' : 'mt-120'"
			>
				<h2 class="roboto-title font-weight-medium mr-5" style="font-size: 24px">
					Imóveis relacionados
				</h2>
				<v-divider
					color="grey"
					class="border-opacity-50 mb-8 mt-3"
					:style="isMobile ? 'width: 100%' : 'width: 540px'"
					:thickness="1"
				/>
				<div
					class="d-flex justify-space-between align-center ga-10"
					:class="isMobile ? 'flex-column' : ''"
				>
					<PropertyCard
						v-for="property in relatedProperties"
						:key="property.code"
						:featured-property="property"
						class="property-card"
						@click="goToProperty(property.code)"
					/>
				</div>
			</div>
		</div>

		<InfraestructureModal
			v-if="visibleInfraestructureItems.length"
			v-model="openDialog"
			:infraestructure-items="infrastructureItems"
		/>

		<PhotosModal
			v-model="openPhotoDialog"
			:property-images="propertyImages"
			:first-image="firstImage"
		/>

		<VideoModal
			v-if="currentProperty?.video"
			v-model="openVideoDialog"
			:video="currentProperty?.video"
		/>

		<MapModal
			v-if="addressFormatted"
			v-model="openMapDialog"
			:address-formatted="addressFormatted"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, watch } from "vue";
import { useCookie, useRuntimeConfig } from "nuxt/app";
import { animate } from "motion";
import { useRoute, useRouter } from "vue-router";
import { usePropertiesStore } from "../../../store/properties";
import InfraestructureModal from "./components/InfraestructureModal/index.vue";
import PhotosModal from "./components/PhotosModal/index.vue";
import VideoModal from "./components/VideoModal/index.vue";
import MapModal from "./components/MapModal/index.vue";
import { type Property } from "@/types";
import { useScreen } from "@/composables/useScreen";

const { isMobile, windowWidth } = useScreen();

const propertiesStore = usePropertiesStore();
const currentPropertyId = ref<string | null>(null);
const currentProperty = ref<Property>();
const route = useRoute();
const router = useRouter();
const runtimeConfig = useRuntimeConfig();

const visibleInfraestructureItems = ref([]);
const infrastructureItems = ref<String[]>([]);
const propertyImages = ref([]);

const cardsContainer = ref<HTMLElement | null>(null);
const currentIndex = ref(0);
const openDialog = ref(false);
const openPhotoDialog = ref(false);
const openVideoDialog = ref(false);
const openMapDialog = ref(false);
const firstImage = ref<string>();
const addressFormatted = ref<string | null>(null);

const fullUrl = computed(() => {
	return `${runtimeConfig.public.siteUrl || runtimeConfig.public.localStorage}${route.fullPath}`;
});

const favoritedProperties = computed<Property[]>(
	() => propertiesStore.favoritedProperties,
);

const visibleCount = computed(() => {
	if (windowWidth.value <= 956) return 1;
	if (windowWidth.value <= 1280) return 2;
	if (windowWidth.value <= 1700) return 3;
	return 4;
});

watch(openPhotoDialog, (bool) => {
	if (!bool) {
		setTimeout(() => {
			firstImage.value = propertyImages.value[0];
		}, 400);
	}
});

onMounted(async () => {
	currentPropertyId.value = route.params.propertyId as string;
	currentProperty.value = await propertiesStore.getPropertyByCode(
		currentPropertyId.value,
	);

	const { infrastructure, images, address } = currentProperty.value;

	if (infrastructure) {
		infrastructureItems.value = infrastructure;

		visibleInfraestructureItems.value = [...infrastructureItems.value].slice(
			0,
			6,
		);
	}

	if (images) {
		propertyImages.value = images;
	}

	if (address) {
		addressFormatted.value = formatAddress(address);
	}
});

const favoriteProperties = useCookie("favoriteProperties", {
	default: () => [],
});
const isFavorited = ref(false);

watch(currentProperty, () => {
	isFavorited.value = favoriteProperties.value.some(
		(property: Property) => property.code === currentProperty.value.code,
	);
});

const visibleProperties = computed(() => {
	return propertyImages.value.slice(
		currentIndex.value,
		currentIndex.value + visibleCount.value,
	);
});

const relatedProperties = computed<Property[]>(() => {
	if (currentProperty.value) {
		const { related_properties } = currentProperty.value;
		return propertiesStore.propertiesList.filter((property: Property) => {
			return related_properties.includes(property.code);
		});
	}
	return [];
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
	if (currentIndex.value + visibleCount.value < propertyImages.value.length) {
		animateCards("right");

		currentIndex.value = Math.min(
			currentIndex.value + visibleCount.value,
			propertyImages.value.length - visibleCount.value,
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

function goToProperty(code: string) {
	router.push("/properties-list/" + code);
}

function handleOpenPhotoDialog(image: string) {
	openPhotoDialog.value = true;
	firstImage.value = image;
}

function formatAddress(address: string) {
	return address.replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/g, "+");
}

function formatFootage(footage: string) {
	const number = Number(footage);

	return `${number?.toLocaleString("pt-BR")} m²` || `${footage} m²`;
}
</script>

<style scoped lang="scss">
.infoList {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 30px 80px;
	max-width: 90%;
	overflow-x: hidden;
}
.list {
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	grid-template-columns: repeat(3, 1fr);
	gap: 0 30px;
	white-space: nowrap;
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

@media (max-width: 956px) {
	.mainContent {
		padding: 30px 20px;
	}

	.infoList {
		grid-template-columns: unset;
		gap: 25px 80px;
		grid-template-areas:
			"total_area bedrooms"
			"living_area bathrooms"
			"iptu suites"
			"condominium garages";
	}
}

@media (max-width: 480px) {
	.infoList {
		grid-template-columns: unset;
		gap: 10px;
		grid-template-areas:
			"total_area"
			"living_area"
			"iptu"
			"condominium"
			"bedrooms"
			"bathrooms"
			"suites"
			"garages";
	}

	.list {
		display: grid;
		grid-template-rows: auto;
		grid-template-columns: 1fr;
		gap: 0;
	}
}
</style>
