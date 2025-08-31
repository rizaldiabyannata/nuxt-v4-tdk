// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "",
      node_env: process.env.NODE_ENV || "development",
    },
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: false,
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/icon"],
});
