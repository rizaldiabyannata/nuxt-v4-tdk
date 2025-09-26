export default defineNuxtRouteMiddleware(async (to, from) => {
  // Only run this middleware for admin routes
  if (to.path.startsWith('/admin')) {
    const { $api } = useNuxtApp();

    try {
      // Make a lightweight API call to a protected endpoint to verify authentication.
      // The `api` plugin automatically sends the auth cookie.
      // If this request fails (e.g., returns 401), axios will throw an error.
      await $api.get('/api/user/profile');
      
      // If the call succeeds, the user is authenticated. We can allow navigation.
    } catch (error) {
      // If the API call fails, the user is not authenticated.
      console.error('Authentication check failed, redirecting to login.');
      // Redirect ke halaman login agar jelas status auth, hindari flicker ke public home
      return navigateTo('/login');
    }
  }
});
