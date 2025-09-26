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
  // Disable devtools in production for performance & security
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  css: ['~/assets/css/main.css', '~/assets/css/tiptap-content.css'],
  typescript: {
    strict: false,
  },
  plugins:[
    '~/plugins/api'
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/icon",
    'nuxt-toast'
  ],
});