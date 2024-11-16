<template>
	<div class="d-flex flex-column" :class="isMobile ? 'my-10' : 'my-16'">
		<div
			class="d-flex flex-column fill-height align-end"
			:class="isMobile ? 'justify-start mb-10' : 'mb-16 justify-center'"
			:style="isMobile || isTablet ? 'width: fit-content' : 'width: 652px'"
		>
			<h2 class="font-weight-regular favoritesTitle roboto-title">
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
								style="background-color: transparent; border: none"
								:style="isMobile ? 'width: fit-content' : 'width: 250px'"
							></th>
							<th
								v-for="apartment in favoritedProperties"
								:key="apartment.code"
								style="background-color: transparent; border: none"
							>
								<div class="d-flex flex-column align-center justify-center ga-3 pa-0">
									<nuxt-link :to="`/properties-list/${apartment.code}`">
										<img
											:src="apartment?.image_cover || 'https://placehold.co/250'"
											class="image-cover"
										/>
									</nuxt-link>
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
import { Property } from "@/types";
import { useScreen } from "@/composables/useScreen";

const { isMobile, isTablet } = useScreen();
const propertiesStore = usePropertiesStore();
const favoritedProperties = computed<Property[]>(
	() => propertiesStore.favoritedProperties,
);

function formatCurrency(price: string) {
	return (
		Number(price).toLocaleString("pt-BR", { minimumFractionDigits: 2 }) || 0
	);
}
</script>

<style scoped lang="scss">
.favoritesTitle {
	font-size: 32px;
	padding-left: 30px;
}

.image-cover {
	min-height: 150px;
	max-height: 150px;
	border-radius: 4px;
	cursor: pointer;
}

.image-cover:hover {
	opacity: 0.8;
}

.apartment-comparison {
	width: 100%;
}

.table {
	margin: 20px auto;
	padding: 0;
	width: 100%;
	max-width: 1200px;
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

@media (max-width: 1080px) {
	.favoritesTitle {
		font-size: 30px;
	}

	td,
	th {
		padding: 10px 8px;
		font-size: 14px;
	}

	.apartment-comparison {
		padding: 0 60px;
	}
}

@media (max-width: 768px) {
	.favoritesTitle {
		font-size: 28px;
	}

	.apartment-comparison {
		overflow-x: scroll;
		padding: 0 20px 20px;
	}

	td,
	th {
		padding: 8px 10px;
		font-size: 12px;
	}

	.table {
		height: 100%;
		max-width: fit-content;
	}
}

@media (max-width: 480px) {
	.favoritesTitle {
		font-size: 24px;
	}

	.apartment-comparison {
		padding: 0 10px 20px;
	}

	.image-cover {
		min-width: 100px;
		min-height: 100px;
		max-width: 100px;
		max-height: 100px;
	}

	td,
	th {
		font-size: 10px;
	}
}
</style>
