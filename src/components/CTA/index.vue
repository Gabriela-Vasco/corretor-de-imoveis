<template>
	<v-sheet
		color="secondary-darken-1"
		height="320px"
		width="100%"
		class="d-flex flex-column align-center justify-center"
	>
		<div class="d-flex align-center justify-center mb-14" style="gap: 200px">
			<h2 class="text-black cta-title">
				Gostaria de conhecer o imóvel dos seus sonhos?
			</h2>
			<v-btn
				rounded="xs"
				variant="elevated"
				size="x-large"
				class="bg-secondary font-weight-bold"
				to="contact"
			>
				Entre em contato
			</v-btn>
		</div>
		<v-divider
			color="dark"
			class="border-opacity-25"
			:thickness="2"
			style="width: 1170px"
		/>
	</v-sheet>
</template>

<style lang="scss" scoped>
.cta-title {
	font-size: 32px;
	width: 557px;
	text-align: center;
}
</style>
