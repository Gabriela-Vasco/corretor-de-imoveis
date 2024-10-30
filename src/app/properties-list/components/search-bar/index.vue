<template>
	<div class="bg-primary d-flex flex-column search pl-6 pr-10 py-10">
		<div class="mb-6">
			<p class="text-secondary mb-3">Dormitórios</p>
			<v-item-group v-model="bedrooms" class="d-flex justify-space-between">
				<v-item v-for="n in 5" :key="n">
					<template #default="{ toggle }">
						<v-btn
							:active="bedrooms === n - 1"
							icon
							height="40"
							variant="text"
							width="40"
							border
							:color="bedrooms === n - 1 ? 'secondary' : 'light'"
							@click="toggle"
						>
							<v-icon>{{ `mdi-numeric-${n}` }}</v-icon>
							{{ n === 5 ? "+" : "" }}
						</v-btn>
					</template>
				</v-item>
			</v-item-group>
		</div>

		<div class="mb-6">
			<p class="text-secondary mb-3">Suítes</p>
			<v-item-group v-model="suites" class="d-flex justify-space-between">
				<v-item v-for="n in 5" :key="n">
					<template #default="{ toggle }">
						<v-btn
							:active="suites === n - 1"
							icon
							height="40"
							variant="text"
							width="40"
							border
							:color="suites === n - 1 ? 'secondary' : 'light'"
							@click="toggle"
						>
							<v-icon>{{ `mdi-numeric-${n}` }}</v-icon>
							{{ n === 5 ? "+" : "" }}
						</v-btn>
					</template>
				</v-item>
			</v-item-group>
		</div>

		<div class="mb-6">
			<p class="text-secondary mb-3">Banheiros</p>
			<v-item-group v-model="bathrooms" class="d-flex justify-space-between">
				<v-item v-for="n in 5" :key="n">
					<template #default="{ toggle }">
						<v-btn
							:active="bathrooms === n - 1"
							icon
							height="40"
							variant="text"
							width="40"
							border
							:color="bathrooms === n - 1 ? 'secondary' : 'light'"
							@click="toggle"
						>
							<v-icon>{{ `mdi-numeric-${n}` }}</v-icon>
							{{ n === 5 ? "+" : "" }}
						</v-btn>
					</template>
				</v-item>
			</v-item-group>
		</div>

		<div class="mb-6">
			<p class="text-secondary mb-3">Vagas de garagem</p>
			<v-item-group v-model="garages" class="d-flex justify-space-between">
				<v-item v-for="n in 5" :key="n">
					<template #default="{ toggle }">
						<v-btn
							:active="garages === n - 1"
							icon
							height="40"
							variant="text"
							width="40"
							border
							:color="garages === n - 1 ? 'secondary' : 'light'"
							@click="toggle"
						>
							<v-icon>{{ `mdi-numeric-${n}` }}</v-icon>
							{{ n === 5 ? "+" : "" }}
						</v-btn>
					</template>
				</v-item>
			</v-item-group>
		</div>

		<v-divider class="my-10 border-opacity-25" :thickness="3" />

		<div>
			<p class="text-secondary mb-2">Preço</p>
			<div class="d-flex align-center justify-space-between ga-5">
				<div class="w-100">
					<small class="text-secondary">Mínimo</small>
					<v-text-field
						v-model="minPrice"
						label=""
						variant="solo-filled"
						prefix="R$"
						placeholder="0,00"
						color="white"
						density="compact"
						persistent-placeholder
					/>
				</div>

				<div class="w-100">
					<small class="text-secondary">Máximo</small>
					<v-text-field
						v-model="maxPrice"
						label=""
						variant="solo-filled"
						prefix="R$"
						placeholder="0,00"
						density="compact"
						persistent-placeholder
					/>
				</div>
			</div>
		</div>

		<div>
			<p class="text-secondary mb-4">Perfil do Imóvel</p>
			<v-select
				v-model="type"
				label=""
				min-width="100%"
				:items="['Residencial', 'Comercial']"
				variant="solo"
				density="compact"
				clearable
			></v-select>
		</div>

		<div>
			<p class="text-secondary mb-4">Tipo do imóvel</p>
			<v-select
				v-model="saleOrRent"
				label=""
				min-width="100%"
				:items="['Venda', 'Aluguel']"
				variant="solo"
				density="compact"
				clearable
			></v-select>
		</div>

		<div>
			<p class="text-secondary mb-4">Bairros</p>
			<v-autocomplete
				v-model="neighborhood"
				label=""
				min-width="100%"
				:items="neighborhoodsList"
				variant="solo"
				density="compact"
				clearable
			/>
		</div>

		<div>
			<p class="text-secondary mb-4">Código</p>
			<v-text-field
				v-model="code"
				label=""
				variant="solo-filled"
				density="compact"
				persistent-placeholder
			/>
		</div>

		<v-btn class="mt-8" color="secondary" @click="searchFilteredProperties">
			Buscar
		</v-btn>

		<v-btn class="mt-6" color="light" @click="clearFilterConditions">
			Limpar
		</v-btn>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { type FilterConditions } from "@/types";
import { useNeighborhoods } from "@/composables/services/useNeighborhoods";

const neighborhoods = useNeighborhoods();
const bedrooms = ref<number>(-1);
const suites = ref<number>(-1);
const bathrooms = ref<number>(-1);
const garages = ref<number>(-1);
const minPrice = ref<string | null>(null);
const maxPrice = ref<string | null>(null);
const saleOrRent = ref<string | null>(null);
const type = ref<string | null>(null);
const neighborhood = ref<string | null>(null);
const code = ref<string | null>(null);
const neighborhoodsList = ref([]);

const emit = defineEmits(["filterProperties"]);

onMounted(async () => {
	try {
		neighborhoodsList.value = await neighborhoods.list();
	} catch (e) {
		console.error(e);
	}
});

function searchFilteredProperties() {
	const obj: FilterConditions = {
		bedrooms: bedrooms.value + 1,
		suites: suites.value + 1,
		bathrooms: bathrooms.value + 1,
		garages: garages.value + 1,
		minPrice: minPrice.value,
		maxPrice: maxPrice.value,
		sale_or_rent: saleOrRent.value,
		property_type: type.value,
		neighborhood: neighborhood.value,
		code: code.value,
	};

	for (const item in obj) {
		if (
			!obj[item as keyof FilterConditions] ||
			obj[item as keyof FilterConditions] === -1 ||
			obj[item as keyof FilterConditions] === 0
		) {
			delete obj[item as keyof FilterConditions];
		}
	}

	emit("filterProperties", obj);
}

function clearFilterConditions() {
	bedrooms.value = -1;
	suites.value = -1;
	bathrooms.value = -1;
	garages.value = -1;
	minPrice.value = null;
	maxPrice.value = null;
	type.value = null;
	saleOrRent.value = null;
	neighborhood.value = null;
	code.value = null;

	searchFilteredProperties();
}
</script>

<style scoped lang="scss">
.search {
	min-width: 300px;
}
</style>
