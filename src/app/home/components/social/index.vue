<template>
	<div class="bg-light py-5">
		<v-carousel
			height="400"
			:show-arrows="false"
			hide-delimiter-background
			color="dark"
			class="bg-light"
		>
			<v-carousel-item v-for="(quote, i) in props.quotes" :key="i">
				<v-sheet color="light" height="100%">
					<div class="d-flex flex-column fill-height justify-center align-center">
						<p class="mb-4" style="font-size: 24px">{{ quote.message }}</p>
						<small>{{ quote.author }}</small>
					</div>
				</v-sheet>
			</v-carousel-item>
		</v-carousel>
	</div>
</template>

<script setup>
const props = defineProps({
	quotes: { type: Array, default: () => [] },
});
</script>

<style lang="scss" scoped></style>
