import { ref, onMounted, onUnmounted, computed } from "vue";
import { useDisplay } from "vuetify";

export function useScreen() {
	// const windowWidth = ref(window.innerWidth);
	// const windowHeight = ref(window.innerHeight);

	const display = useDisplay();

	const isMobile = computed(
		() => display.name.value === "sm" || display.name.value === "xs",
	);

	const isTablet = computed(() => display.name.value === "md");

	// function handleResize() {
	// 	windowWidth.value = window.innerWidth;
	// 	windowHeight.value = window.innerHeight;
	// }

	// onMounted(() => {
	// 	// handleResize();
	// 	window.addEventListener("resize", handleResize);
	// });

	// onUnmounted(() => {
	// 	window.removeEventListener("resize", handleResize);
	// });

	return {
		// windowWidth,
		// windowHeight,
		isMobile,
		isTablet,
		// handleResize,
	};
}
