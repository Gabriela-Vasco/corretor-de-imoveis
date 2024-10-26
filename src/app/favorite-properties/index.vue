<template>
	<div class="d-flex flex-column" style="margin: 86px 0">
		<div
			class="d-flex flex-column fill-height justify-center align-end mb-16"
			style="width: 652px"
		>
			<h2 style="font-size: 32px" class="font-weight-regular">
				Compare até 3 imóveis
			</h2>
			<v-divider color="dark" class="border-opacity-75 w-100" :thickness="1" />
		</div>
		<div class="table">
			<div class="d-flex justify-space-between align-center pa-0">
				<div
					v-for="(image, index) in propertyImages"
					:key="index"
					class="mb-10 mx-0"
				>
					<div v-if="index === 0" style="width: 250px"></div>
					<div
						v-else
						class="d-flex flex-column align-center justify-center ga-3 pa-0 mr-5"
					>
						<img :src="image" width="250px" />
						<v-btn icon="true" flat variant="tonal" color="secondary">
							<v-icon color="secondary-darken-1">mdi-heart</v-icon>
						</v-btn>
					</div>
				</div>
			</div>

			<div class="apartment-comparison">
				<table>
					<thead>
						<tr>
							<th>Código</th>
							<th v-for="apartment in apartments" :key="apartment.code">
								{{ apartment.code }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Dormitórios</td>
							<td v-for="apartment in apartments" :key="apartment.code">
								{{ apartment.bedrooms }}
							</td>
						</tr>
						<tr>
							<td>Suítes</td>
							<td v-for="apartment in apartments" :key="apartment.code">
								{{ apartment.suites }}
							</td>
						</tr>
						<tr>
							<td>Banheiros</td>
							<td v-for="apartment in apartments" :key="apartment.code">
								{{ apartment.bathrooms }}
							</td>
						</tr>
						<tr>
							<td>Vagas de garagem</td>
							<td v-for="apartment in apartments" :key="apartment.code">
								{{ apartment.garages }}
							</td>
						</tr>
						<tr>
							<td>Tipo</td>
							<td v-for="apartment in apartments" :key="apartment.code">
								{{ apartment.type }}
							</td>
						</tr>
						<tr>
							<td>Bairro</td>
							<td v-for="apartment in apartments" :key="apartment.code">
								{{ apartment.neighborhood }}
							</td>
						</tr>
						<tr>
							<td>Área privativa</td>
							<td v-for="apartment in apartments" :key="apartment.code">
								{{ apartment.privateArea }} m²
							</td>
						</tr>
						<tr>
							<td>Área total</td>
							<td v-for="apartment in apartments" :key="apartment.code">
								{{ apartment.totalArea }} m²
							</td>
						</tr>
						<tr>
							<td>Valor</td>
							<td v-for="apartment in apartments" :key="apartment.code">
								R$
								{{
									apartment.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
								}}
							</td>
						</tr>
						<tr>
							<td>Condomínio</td>
							<td v-for="apartment in apartments" :key="apartment.code">
								R$
								{{
									apartment.condoFee.toLocaleString("pt-BR", {
										minimumFractionDigits: 2,
									})
								}}
							</td>
						</tr>
						<tr>
							<td>IPTU</td>
							<td v-for="apartment in apartments" :key="apartment.code">
								R$
								{{
									apartment.iptu.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
								}}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const propertyImages = ref([
	"",
	"https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=612x612&w=0&k=20&c=0Dqjm3NunXjZtWVpsUvNKg2A4rK2gMvJ-827nb4AMU4=",
	"https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=612x612&w=0&k=20&c=0Dqjm3NunXjZtWVpsUvNKg2A4rK2gMvJ-827nb4AMU4=",
	"https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=612x612&w=0&k=20&c=0Dqjm3NunXjZtWVpsUvNKg2A4rK2gMvJ-827nb4AMU4=",
]);

const apartments = ref([
	{
		code: "0000",
		bedrooms: 3,
		suites: 1,
		bathrooms: 1,
		garages: 1,
		type: "Apartamento",
		neighborhood: "Centro - Florianópolis",
		privateArea: 76.31,
		totalArea: 108.77,
		price: 1850000,
		condoFee: 1500,
		iptu: 1500,
	},
	{
		code: "0000",
		bedrooms: 4,
		suites: 2,
		bathrooms: 2,
		garages: 2,
		type: "Apartamento",
		neighborhood: "Centro - Florianópolis",
		privateArea: 85.31,
		totalArea: 98,
		price: 530000,
		condoFee: 1500,
		iptu: 1500,
	},
	{
		code: "0000",
		bedrooms: 5,
		suites: 3,
		bathrooms: 3,
		garages: 3,
		type: "Apartamento",
		neighborhood: "Centro - Florianópolis",
		privateArea: 76.31,
		totalArea: 108.77,
		price: 1850000,
		condoFee: 1500,
		iptu: 1500,
	},
]);
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
