<template>
	<div
		class="d-flex justify-space-between align-center bg-primary header"
		:class="isMobile ? 'px-4' : 'px-8'"
	>
		<nuxt-link
			class="text-secondary font-weight-bold roboto-title title font-weight-bold"
			to="/"
		>
			LELIS MAGNO IMÓVEIS
		</nuxt-link>

		<template v-if="isMounted && isMobile">
			<v-btn icon flat variant="text" @click="drawer = !drawer">
				<v-icon>mdi-menu</v-icon>
			</v-btn>
		</template>

		<template v-else>
			<div class="d-flex align-center ga-6">
				<nuxt-link
					class="font-weight-bold"
					exact-active-class="text-secondary"
					to="/"
				>
					Home
				</nuxt-link>
				<nuxt-link
					class="font-weight-bold"
					exact-active-class="text-secondary"
					to="/properties-list"
				>
					Imóveis
				</nuxt-link>
				<nuxt-link
					class="font-weight-bold"
					exact-active-class="text-secondary"
					to="/favorites"
				>
					Favoritos
				</nuxt-link>
				<v-btn
					rounded="xs"
					variant="elevated"
					class="bg-secondary font-weight-bold btn"
					to="/contact"
				>
					Entre em contato
				</v-btn>
			</div>
		</template>

		<v-navigation-drawer v-model="drawer" temporary right color="primary">
			<v-list>
				<v-list-item
					v-for="(item, index) in navLinks"
					:key="index"
					:to="item.to"
					class="text-secondary font-weight-bold"
					@click="drawer = false"
				>
					{{ item.text }}
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useScreen } from "@/composables/useScreen";

const { isMobile } = useScreen();
const drawer = ref(false);

const isMounted = ref(false);
onMounted(() => {
	isMounted.value = true;
	drawer.value = false;
});

watch(isMobile, () => {
	if (!isMobile.value) {
		drawer.value = false;
	}
});

const navLinks = [
	{ text: "Home", to: "/" },
	{ text: "Imóveis", to: "/properties-list" },
	{ text: "Favoritos", to: "/favorites" },
	{ text: "Entre em contato", to: "/contact" },
];
</script>

<style scoped lang="scss">
.header {
	min-height: 64px;
}
.title {
	font-size: 1.5rem;
}

.btn {
	margin-right: 0.5rem;
}

@media (max-width: 768px) {
	.title {
		font-size: 1.2rem;
	}
}
</style>
