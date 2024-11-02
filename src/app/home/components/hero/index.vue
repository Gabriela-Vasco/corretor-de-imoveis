<template>
	<v-parallax :src="cover" width="100%">
		<div
			class="d-flex flex-column fill-height justify-center align-end text-white titleContainer"
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
.titleContainer {
	width: 710px;
}
.mainTitle {
	font-size: 45px;
}

@media (max-width: 956px) {
	.mainTitle {
		font-size: 32px;
	}

	.titleContainer {
		width: 500px;
	}
}

@media (max-width: 768px) {
	.mainTitle {
		font-size: 24px;
	}

	.titleContainer {
		width: clamp(300px, 60%, 710px);
	}
}

@media (max-width: 600px) {
	.titleContainer {
		visibility: hidden;
	}
}
</style>
