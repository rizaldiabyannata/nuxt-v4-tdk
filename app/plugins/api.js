import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  // Mengambil konfigurasi dari nuxt.config.js
  const config = useRuntimeConfig();

  // Mengambil baseURL dari runtimeConfig.
  const baseURL = config.public.apiBaseUrl; // Pastikan ini benar

  console.log("API baseURL:", baseURL);

  if (!baseURL) {
    console.warn("API baseURL tidak diatur di runtimeConfig.public.apiBaseUrl");
  }

  // Membuat instance axios yang sudah dikonfigurasi
  const api = axios.create({
    baseURL: baseURL,
    // Baris ini adalah yang paling penting untuk otentikasi berbasis cookie.
    // Ini memberitahu browser untuk secara otomatis mengirim cookie
    // yang diterima dari server pada setiap permintaan selanjutnya.
    withCredentials: true,
  });

  // Interceptor untuk request TIDAK DIPERLUKAN lagi karena browser menangani cookie.

  // Opsional: Interceptor untuk response bisa dipertahankan untuk menangani error global.
  api.interceptors.response.use(
    (response) => {
      // Langsung kembalikan response jika berhasil
      return response;
    },
    (error) => {
      // Menangani error global, misalnya jika session habis (401 Unauthorized)
      console.error("API Error:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        // Anda bisa menambahkan logika di sini, misalnya redirect ke halaman login
        console.log("Akses tidak diizinkan (401). Mungkin perlu login ulang.");
      }
      return Promise.reject(error);
    }
  );

  // Menyediakan instance 'api' ke seluruh aplikasi dengan nama $api
  // Anda bisa memanggilnya dengan this.$api (Options API) atau useNuxtApp().$api (Composition API)
  return {
    provide: {
      api: api,
    },
  };
});