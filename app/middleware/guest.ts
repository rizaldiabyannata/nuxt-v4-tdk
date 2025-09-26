export default defineNuxtRouteMiddleware(async (to) => {
  // If user already authenticated, redirect away from guest-only pages like login
  if (to.path === '/login') {
    const { $api } = useNuxtApp();
    try {
      await $api.get('/api/user/profile');
      // Already logged in
      return navigateTo('/admin');
    } catch (e) {
      // not logged in; stay
    }
  }
});