<template>
	<v-card
		width="320px"
		class="pa-0"
		elevation="3"
		style="box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px"
	>
		<div class="coverImage">
			<v-img :src="props.featuredProperty.image_cover" alt="Test Image" />

			<v-btn
				class="btnFavorite mt-2 mr-2"
				:icon="true"
				color="secondary-darken-1"
				size="small"
				flat
				@click.stop="propertiesStore.toggleFavorite(props.featuredProperty?.code)"
			>
				<v-icon>
					{{
						propertiesStore.favoritedProperties?.find(
							(fav) => fav.code === props.featuredProperty.code,
						)
							? "mdi-heart"
							: "mdi-heart-outline"
					}}
				</v-icon>
			</v-btn>
			<div class="bg-primary propertyCode px-3 py-2 rounded-te">
				<p>Cod: {{ props.featuredProperty.code }}</p>
			</div>
		</div>
		<div class="pa-5">
			<h3 class="card-title mb-auto">{{ props.featuredProperty.title }}</h3>
			<p class="roboto-title">
				{{ props.featuredProperty.neighborhood }}
			</p>
			<p class="roboto-title my-3">
				R$ {{ formatCurrency(props.featuredProperty.price) }}
			</p>
			<div class="d-flex align-end justify-space-between">
				<div class="d-flex flex-column ga-2">
					<small class="d-flex align-center ga-2">
						<v-icon>mdi-bed-double-outline</v-icon>
						{{ props.featuredProperty.bedrooms }}
						dormitório{{ props.featuredProperty.bedrooms > 1 ? "s" : "" }}
					</small>
					<small class="d-flex align-center ga-2">
						<v-icon>mdi-toilet</v-icon>
						{{ props.featuredProperty.bathrooms }}
						banheiro{{ props.featuredProperty.bathrooms > 1 ? "s" : "" }}
					</small>
					<small class="d-flex align-center ga-2">
						<v-icon>mdi-car</v-icon>
						{{ props.featuredProperty.garage }}
						vagas de garage{{ props.featuredProperty.garage > 1 ? "ns" : "m" }}
					</small>
				</div>

				<v-btn
					variant="text"
					size="small"
					class="d-flex align-center"
					append-icon="mdi-arrow-right-thin"
				>
					Veja mais
				</v-btn>
			</div>
		</div>
	</v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePropertiesStore } from "../../store/properties";

const props = defineProps({
	featuredProperty: { type: Object, default: () => {} },
});
const propertiesStore = usePropertiesStore();

console.log(props.featuredProperty);

function formatCurrency(price: string) {
	return Number(price).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}
</script>

<style lang="scss" scoped>
.card-title {
	font-size: 22px;
}

.coverImage {
	position: relative;
}

.propertyCode {
	position: absolute;
	bottom: 0;
	width: fit-content;
}

.btnFavorite {
	position: absolute;
	top: 0;
	right: 0;
}
</style>
