import { ref, onMounted, computed } from "vue";
import { useDisplay } from "vuetify";

export function useScreen() {
	const windowWidth = ref<number | null>(null);
	const isMounted = ref(false); // Add a mount check
	const display = useDisplay();

	const isXMobile = computed(
		() => isMounted.value && display.name.value === "xs",
	);
	const isMobile = computed(
		() =>
			isMounted.value &&
			(display.name.value === "sm" || display.name.value === "xs"),
	);
	const isTablet = computed(
		() => isMounted.value && display.name.value === "md",
	);

	onMounted(() => {
		isMounted.value = true;
		windowWidth.value = window.innerWidth;
	});

	return {
		windowWidth,
		isMobile,
		isTablet,
		isXMobile,
	};
}
