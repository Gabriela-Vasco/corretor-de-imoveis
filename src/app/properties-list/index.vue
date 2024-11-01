<template>
	<div class="mb-10 d-flex flex-column justify-end align-space-between">
		<div class="d-flex justify-start align-center mr-5" style="margin-top: 86px">
			<div
				class="d-flex flex-column fill-height justify-center align-end"
				style="width: 652px"
			>
				<h2 style="font-size: 32px" class="font-weight-regular">
					Imóveis
					{{
						propertiesList.length === 0
							? ""
							: propertiesList.length === 1
								? "| Foi encontrado 1 imóvel"
								: `| Foram encontrados ${propertiesList.length} imóveis`
					}}
				</h2>
				<v-progress-linear
					v-if="loading"
					size="100%"
					color="primary"
					indeterminate
				/>
				<v-divider
					v-else
					color="dark"
					class="border-opacity-75 w-100"
					:thickness="1"
				/>
			</div>

			<div
				v-if="paginatedProperties.length"
				class="d-flex align-center justify-center ml-auto mr-10"
			>
				<span style="text-wrap: nowrap">Ordenar por:</span>
				<v-select
					v-model="sortOption"
					label=""
					class="pt-5 mx-5"
					width="180px"
					:items="['Maior preço', 'Menor preço', 'A-Z', 'Z-A']"
					variant="solo"
					density="compact"
				></v-select>
			</div>
		</div>

		<div v-if="!loading">
			<div
				v-if="propertiesList.length > 0"
				class="d-flex justify-start mx-12 my-10 ga-8"
				style="align-items: stretch"
			>
				<SearchBar @filter-properties="filterProperties" />
				<div
					v-if="paginatedProperties.length"
					class="w-100 d-flex flex-column align-space-between"
					style="flex-grow: 1"
				>
					<div class="d-flex ga-10 flex-wrap mb-10">
						<PropertyCard
							v-for="(property, index) in paginatedProperties"
							:key="index"
							:featured-property="property"
							class="property-card"
							@click="goToProperty(property.code)"
						/>
					</div>
					<div class="d-flex align-end justify-center mt-auto">
						<v-pagination
							v-model="page"
							:length="pageCount"
							class="mx-auto w-100"
							width="180px"
							rounded
						></v-pagination>
						<v-select
							v-model="itemsPerPage"
							label="Items por página"
							class="pt-5"
							width="130px"
							:items="[5, 10, 15, 20]"
							variant="outlined"
							density="compact"
						></v-select>
					</div>
				</div>
				<NoContent
					v-else
					class="mx-auto"
					headline="Nenhuma propriedade encontrada"
					size="250"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePropertiesStore } from "../../store/properties";
import { type FilterConditions, Property } from "@/types";
import NoContent from "@/components/NoContent";
import SearchBar from "@/app/properties-list/components/search-bar";
import PropertyCard from "@/components/PropertyCard";

const propertiesStore = usePropertiesStore();
const loading = ref(false);
const page = ref(1);
const itemsPerPage = ref(10);
const sortOption = ref("Maior preço");
const filterConditions = ref<FilterConditions>();
const router = useRouter();

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

const propertiesList = computed(() => propertiesStore.propertiesList);

const sortedProperties = computed(() => {
	const properties = propertiesList.value;

	switch (sortOption.value) {
		case "Maior preço":
			return properties.sort((a: Property, b: Property) => b.price - a.price);
		case "Menor preço":
			return properties.sort((a: Property, b: Property) => a.price - b.price);
		case "A-Z":
			return properties.sort((a: Property, b: Property) =>
				a.title.localeCompare(b.title),
			);
		case "Z-A":
			return properties.sort((a: Property, b: Property) =>
				b.title.localeCompare(a.title),
			);
		default:
			return properties;
	}
});

const filteredProperties = computed(() => {
	const properties = [...sortedProperties.value];
	return properties.filter((property) => {
		for (const key in filterConditions.value) {
			if (filterConditions.value[key] !== null) {
				if (
					key === "bedrooms" &&
					((filterConditions.value[key] === 5 && Number(property.bedrooms) < 5) ||
						(filterConditions.value[key] !== 5 &&
							Number(property.bedrooms) !== filterConditions.value[key]))
				) {
					return false;
				}
				if (
					key === "suites" &&
					((filterConditions.value[key] === 5 && Number(property.suites) < 5) ||
						(filterConditions.value[key] !== 5 &&
							Number(property.suites) !== filterConditions.value[key]))
				) {
					return false;
				}
				if (
					key === "bathrooms" &&
					((filterConditions.value[key] === 5 && Number(property.bathrooms) < 5) ||
						(filterConditions.value[key] !== 5 &&
							Number(property.bathrooms) !== filterConditions.value[key]))
				) {
					return false;
				}
				if (
					key === "garages" &&
					((filterConditions.value[key] === 5 && Number(property.garage) < 5) ||
						(filterConditions.value[key] !== 5 &&
							Number(property.garage) !== filterConditions.value[key]))
				) {
					return false;
				}
				if (
					key === "minPrice" &&
					property.price < parseInt(filterConditions.value[key])
				) {
					return false;
				}
				if (
					key === "maxPrice" &&
					property.price > parseInt(filterConditions.value[key])
				) {
					return false;
				}
				if (
					key === "property_type" &&
					property.property_type !== filterConditions.value[key]
				) {
					return false;
				}
				if (
					key === "sale_or_rent" &&
					property.sale_or_rent !== filterConditions.value[key]
				) {
					return false;
				}
				if (
					key === "neighborhood" &&
					property.neighborhood !== filterConditions.value[key]
				) {
					return false;
				}
				if (key === "code" && property.code !== filterConditions.value[key]) {
					return false;
				}
			}
		}

		return true;
	});
});

const paginatedProperties = computed(() => {
	const start = (page.value - 1) * itemsPerPage.value;
	return filteredProperties.value.slice(start, start + itemsPerPage.value);
});

const pageCount = computed(() =>
	Math.ceil(filteredProperties.value.length / itemsPerPage.value),
);

function filterProperties(obj: FilterConditions) {
	filterConditions.value = obj;
}

function goToProperty(code: string) {
	router.push("/properties-list/" + code);
}
</script>

<style scoped></style>
