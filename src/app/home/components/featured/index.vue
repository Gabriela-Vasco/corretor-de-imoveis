<template>
	<div class="d-flex flex-column align-center py-16">
		<h3 class="featuredTitle mb-12">Imóveis em destaque</h3>
		<div
			v-if="featuredProperties?.length"
			class="d-flex align-center justify-space-between w-100"
		>
			<v-btn
				icon
				variant="flat"
				size="90px"
				class="d-flex align-center justify-center ml-2 pr-2"
			>
				<v-icon size="120px" color="primary">mdi-menu-left</v-icon>
			</v-btn>
			<PropertyCard
				v-for="(featuredProperty, index) of featuredProperties"
				:key="index"
				:featured-property="featuredProperty"
			/>
			<v-btn
				icon
				variant="flat"
				size="90px"
				class="d-flex align-center justify-center mr-2 pl-2"
			>
				<v-icon size="120px" color="primary">mdi-menu-right</v-icon>
			</v-btn>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PropertyCard from "@/components/PropertyCard";
import { type FeaturedProperty } from "~/types/FeaturedProperty";

const featuredProperties = ref<FeaturedProperty[]>([
	{
		title: "Apartamento de exemplo",
		neighborhood: "Centro",
		image:
			"https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=612x612&w=0&k=20&c=0Dqjm3NunXjZtWVpsUvNKg2A4rK2gMvJ-827nb4AMU4=",
		code: "547",
		price: 100000,
		bedrooms: 3,
		bathrooms: 2,
		garage: 1,
	},
	{
		title: "Apartamento de exemplo",
		neighborhood: "Centro",
		image:
			"https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=612x612&w=0&k=20&c=0Dqjm3NunXjZtWVpsUvNKg2A4rK2gMvJ-827nb4AMU4=",
		code: "547",
		price: 100000,
		bedrooms: 3,
		bathrooms: 2,
		garage: 1,
	},
	{
		title: "Apartamento de exemplo",
		neighborhood: "Centro",
		image:
			"https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=612x612&w=0&k=20&c=0Dqjm3NunXjZtWVpsUvNKg2A4rK2gMvJ-827nb4AMU4=",
		code: "547",
		price: 100000,
		bedrooms: 3,
		bathrooms: 2,
		garage: 1,
	},
]);
</script>

<style lang="scss" scoped>
.featuredTitle {
	font-size: 32px;
}
</style>
