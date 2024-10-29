<template>
	<div class="d-flex flex-column" style="margin: 100px 0">
		<div
			class="d-flex flex-column fill-height justify-center align-end mb-16"
			style="width: 652px"
		>
			<h2 style="font-size: 32px" class="font-weight-regular">
				Compare até 3 imóveis
			</h2>
			<v-divider color="dark" class="border-opacity-75 w-100" :thickness="1" />
		</div>
		<div v-if="favoritedProperties.length" class="table">
			<div class="apartment-comparison">
				<table>
					<thead>
						<tr>
							<th
								style="width: 250px; background-color: transparent; border: none"
							></th>
							<th
								v-for="apartment in favoritedProperties"
								:key="apartment.code"
								style="background-color: transparent; border: none"
							>
								<div class="d-flex flex-column align-center justify-center ga-3 pa-0">
									<img
										:src="apartment?.image_cover || 'https://placehold.co/250'"
										style="min-height: 150px; max-height: 150px"
									/>
									<v-btn
										icon="true"
										flat
										variant="tonal"
										color="secondary"
										@click="propertiesStore.toggleFavorite(apartment?.code)"
									>
										<v-icon color="secondary-darken-1">mdi-heart</v-icon>
									</v-btn>
								</div>
							</th>
						</tr>
						<tr>
							<th style="width: 250px">Código</th>
							<th
								v-for="apartment in favoritedProperties"
								:key="apartment.code"
								class="text-center"
							>
								{{ apartment.code }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Dormitórios</td>
							<td
								v-for="apartment in favoritedProperties"
								:key="apartment.code"
								class="text-center"
							>
								{{ apartment?.bedrooms || " - " }}
							</td>
						</tr>
						<tr>
							<td>Suítes</td>
							<td
								v-for="apartment in favoritedProperties"
								:key="apartment.code"
								class="text-center"
							>
								{{ apartment?.suites || " - " }}
							</td>
						</tr>
						<tr>
							<td>Banheiros</td>
							<td
								v-for="apartment in favoritedProperties"
								:key="apartment.code"
								class="text-center"
							>
								{{ apartment?.bathrooms || " - " }}
							</td>
						</tr>
						<tr>
							<td>Vagas de garagem</td>
							<td
								v-for="apartment in favoritedProperties"
								:key="apartment.code"
								class="text-center"
							>
								{{ apartment?.garage || " - " }}
							</td>
						</tr>
						<tr>
							<td>Perfil do Imóvel</td>
							<td
								v-for="apartment in favoritedProperties"
								:key="apartment.code"
								class="text-center"
							>
								{{ apartment?.sale_or_rent || " - " }}
							</td>
						</tr>
						<tr>
							<td>Tipo de imóvel</td>
							<td
								v-for="apartment in favoritedProperties"
								:key="apartment.code"
								class="text-center"
							>
								{{ apartment?.property_type || " - " }}
							</td>
						</tr>
						<tr>
							<td>Bairro</td>
							<td
								v-for="apartment in favoritedProperties"
								:key="apartment.code"
								class="text-center"
							>
								{{ apartment?.neighborhood || " - " }}
							</td>
						</tr>
						<tr>
							<td>Área privativa</td>
							<td
								v-for="apartment in favoritedProperties"
								:key="apartment.code"
								class="text-center"
							>
								{{ apartment?.private_area || " - " }}
							</td>
						</tr>
						<tr>
							<td>Área total</td>
							<td
								v-for="apartment in favoritedProperties"
								:key="apartment.code"
								class="text-center"
							>
								{{ apartment?.total_area || " - " }}
							</td>
						</tr>
						<tr>
							<td>Valor</td>
							<td
								v-for="apartment in favoritedProperties"
								:key="apartment.code"
								class="text-center"
							>
								R$
								{{ formatCurrency(apartment?.price) || " - " }}
							</td>
						</tr>
						<tr>
							<td>Condomínio</td>
							<td
								v-for="apartment in favoritedProperties"
								:key="apartment.code"
								class="text-center"
							>
								R$
								{{ formatCurrency(apartment?.condominium_price) || " - " }}
							</td>
						</tr>
						<tr>
							<td>IPTU</td>
							<td
								v-for="apartment in favoritedProperties"
								:key="apartment.code"
								class="text-center"
							>
								R$
								{{ formatCurrency(apartment?.IPTU) || " - " }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div v-else>
			<NoContent class="mx-auto" headline="Nenhum imóvel favoritado" size="250" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePropertiesStore } from "../../store/properties";

const propertiesStore = usePropertiesStore();
const favoritedProperties = computed(() => propertiesStore.favoritedProperties);

function formatCurrency(price: string) {
	return (
		Number(price).toLocaleString("pt-BR", { minimumFractionDigits: 2 }) || 0
	);
}
</script>

<style scoped lang="scss">
.table {
	margin: 20px auto;
	padding: 0;
	width: 100%;
	max-width: 1200px;
}
.apartment-comparison {
	width: 100%;
}

table {
	width: 100%;
	border-collapse: collapse;
	text-align: left;
	border-radius: 6px;
}

th,
td {
	padding: 12px 15px;
	border: 1px solid #f2f2f2;
}

td:first-child,
th:first-child {
	background-color: #f1c263;
	font-weight: bold;
	color: #000;
}

td:not(:first-child),
th:not(:first-child) {
	background-color: #f2f2f2;
}

tbody tr:nth-child(even) td:not(:first-child) {
	background-color: #f2f2f2;
}

tbody tr:nth-child(odd) td:not(:first-child) {
	background-color: #fff;
}
</style>
