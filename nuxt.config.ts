// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "",
      node_env: process.env.NODE_ENV || "development",
      minioProxyMode: process.env.MINIO_PROXY_MODE || "backend",
      minioPublicUrl: process.env.MINIO_PUBLIC_URL || "http://localhost:9004",
    },
  },
  devtools: { enabled: true },
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