<template>
	<v-parallax :src="cover" width="100%" class="w-100">
		<div
			class="d-flex flex-column fill-height justify-center align-end text-white"
			style="width: 710px"
		>
			<h1 class="text-dark font-weight-bold montserrat-title mainTitle">
				LELIS MAGNO IMÓVEIS
			</h1>
			<v-divider color="dark" class="border-opacity-75 w-100" :thickness="2" />
		</div>
	</v-parallax>
</template>

<script setup>
import cover from "assets/images/hero-cover.png";
</script>

<style lang="scss" scoped>
.mainTitle {
	font-size: 45px;
}
</style>
