<template>
	<div class="bg-primary d-flex flex-column search pl-6 pr-10 py-10">
		<div class="mb-6">
			<p class="text-secondary mb-3">Dormitórios</p>
			<v-item-group v-model="dorms" class="d-flex justify-space-between">
				<v-item v-for="n in 5" :key="n">
					<template #default="{ toggle }">
						<v-btn
							:active="dorms === n - 1"
							icon
							height="40"
							variant="text"
							width="40"
							border
							:color="dorms === n - 1 ? 'secondary' : 'light'"
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
			<p class="text-secondary mb-4">Tipo do imóvel</p>
			<v-select
				label=""
				min-width="100%"
				:items="['Residencial', 'Comercial']"
				variant="solo"
				density="compact"
			></v-select>
		</div>

		<div>
			<p class="text-secondary mb-4">Bairros</p>
			<v-select
				label=""
				min-width="100%"
				:items="['Centro', 'João Paulo']"
				variant="solo"
				density="compact"
			></v-select>
		</div>

		<div>
			<p class="text-secondary mb-4">Código</p>
			<v-text-field
				label=""
				variant="solo-filled"
				density="compact"
				persistent-placeholder
			/>
		</div>

		<v-btn class="mt-8" color="secondary">Buscar</v-btn>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dorms = ref(0);
const suites = ref(0);
const bathrooms = ref(0);
const garages = ref(0);
const minPrice = ref(null);
const maxPrice = ref(null);
</script>

<style scoped lang="scss">
.search {
	min-width: 300px;
}
</style>
