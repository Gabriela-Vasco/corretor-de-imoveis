<template>
	<v-card width="450px">
		<v-img
			:src="props.featuredProperty.image"
			alt="props.featuredProperty.title"
			cover
		/>
		<div class="pa-5">
			<h3 class="card-title mb-1">{{ props.featuredProperty.title }}</h3>
			<p class="montserrat-title">
				{{ props.featuredProperty.neighborhood }}
			</p>
			<p class="montserrat-title my-3">
				{{ toMoney(props.featuredProperty.price) }}
			</p>
			<div class="d-flex align-end justify-space-between">
				<div class="d-flex flex-column ga-2">
					<p class="d-flex align-center ga-2">
						<v-icon>mdi-bed-double-outline</v-icon>
						{{ props.featuredProperty.bedrooms }}
						dormitório{{ props.featuredProperty.bedrooms > 1 ? "s" : "" }}
					</p>
					<p class="d-flex align-center ga-2">
						<v-icon>mdi-toilet</v-icon>
						{{ props.featuredProperty.bathrooms }}
						banheiro{{ props.featuredProperty.bathrooms > 1 ? "s" : "" }}
					</p>
					<p class="d-flex align-center ga-2">
						<v-icon>mdi-car</v-icon>
						{{ props.featuredProperty.garage }}
						vagas de garage{{ props.featuredProperty.garage > 1 ? "ns" : "m" }}
					</p>
				</div>
				<v-btn
					variant="text"
					size="small"
					class="d-flex align-items"
					append-icon="mdi-arrow-right-thin"
				>
					Veja mais
				</v-btn>
			</div>
		</div>
	</v-card>
</template>

<script setup lang="ts">
const props = defineProps({
	featuredProperty: { type: Object, default: () => {} },
});

function toMoney(money: number) {
	return money.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
</script>

<style lang="scss" scoped>
.card-title {
	font-size: 22px;
}
</style>
