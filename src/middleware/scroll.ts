export default defineNuxtRouteMiddleware(() => {
	if (process.client) {
		window.scrollTo(0, 0);
	}
});
