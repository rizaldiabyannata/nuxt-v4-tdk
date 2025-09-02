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

  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };

  // Interceptor untuk response, menangani refresh token
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/api/refresh/') {
        if (isRefreshing) {
          return new Promise(function(resolve, reject) {
            failedQueue.push({ resolve, reject });
          }).then(() => {
            return api(originalRequest);
          }).catch(err => {
            return Promise.reject(err);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          await api.post('/api/auth/refresh/');
          processQueue(null);
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError);
          // Jika refresh token gagal, redirect ke halaman login
          // Ini perlu dijalankan di sisi client
          if (process.client) {
            console.log("Sesi berakhir. Mengarahkan ke halaman login.");
            // window.location = '/login';
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
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