<template>
	<v-app-bar color="primary" min-height="64px" class="px-8">
		<v-app-bar-title
			tag="h2"
			class="text-secondary font-weight-bold montserrat-title"
		>
			LELIS MAGNO IMÓVEIS
		</v-app-bar-title>
		<template #append>
			<nuxt-link
				class="mr-7 font-weight-bold"
				exact-active-class="text-secondary"
				to="/"
			>
				Home
			</nuxt-link>
			<nuxt-link
				class="mr-7 font-weight-bold"
				exact-active-class="text-secondary"
				to="/properties-list"
			>
				Imóveis
			</nuxt-link>
			<nuxt-link
				class="mr-7 font-weight-bold"
				exact-active-class="text-secondary"
				to="/favorites"
			>
				Favoritos
			</nuxt-link>
			<v-btn
				rounded="xs"
				variant="elevated"
				class="bg-secondary font-weight-bold"
				to="contact"
			>
				Entre em contato
			</v-btn>
		</template>
	</v-app-bar>
</template>

<script setup></script>

<style lang="scss" scoped></style>
