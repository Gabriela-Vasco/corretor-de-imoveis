<template>
	<div class="mb-10">
		<div class="d-flex justify-start align-center mr-5" style="margin-top: 86px">
			<div
				class="d-flex flex-column fill-height justify-center align-end"
				style="width: 652px"
			>
				<h2 style="font-size: 32px" class="font-weight-regular">
					Imóveis | Foram encontrados 70 imóveis
				</h2>
				<v-divider color="dark" class="border-opacity-75 w-100" :thickness="1" />
			</div>
			<div class="d-flex align-center justify-center ml-auto mr-10">
				<span style="text-wrap: nowrap">Ordenar por:</span>
				<v-select
					label=""
					class="pt-5 mx-5"
					width="180px"
					:items="['Maior preço', 'Menor preço', 'A-Z', 'Z-A']"
					placeholder="Maior preço"
					variant="solo"
					density="compact"
				></v-select>
			</div>
		</div>

		<div class="d-flex align-start justify-space-between mx-12 my-10 ga-8">
			<SearchBar />

			<div>
				<div class="d-flex ga-10 flex-wrap mb-10">
					<PropertyCard
						v-for="property in featuredPropertiesMock"
						:key="property.code"
						:featured-property="property"
						class="property-card"
					/>
				</div>
				<v-pagination v-model="page" :length="4" rounded></v-pagination>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { featuredPropertiesMock } from "@/app/home/components/featured/featuredPropertiesMock";
import SearchBar from "@/app/properties-list/components/search-bar";
import PropertyCard from "@/components/PropertyCard";

const page = ref();
</script>

<style scoped></style>
