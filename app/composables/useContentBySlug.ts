// app/composables/useContentBySlug.ts
import type { Ref } from 'vue';

// Interface generik untuk konten yang memiliki slug.
// Ini memungkinkan kita menangani artikel dan portofolio dengan cara yang sama.
interface SlugContent {
  _id: string;
  title: string;
  slug: string;
  coverImage: string;
  [key: string]: any; // Izinkan properti lain
}

// Satu cache terpusat untuk semua konten berbasis slug.
// Kunci akan menjadi kombinasi dari tipe konten dan slug, mis., "blogs-judul-artikel".
const contentCache = useState<Record<string, SlugContent>>('content-by-slug-cache', () => ({}));

export const useContentBySlug = () => {
  const { $api } = useNuxtApp();
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;

  /**
   * Mengambil satu item konten (artikel atau portofolio) berdasarkan slug-nya.
   * @param contentType Tipe konten, 'blogs' atau 'portfolios'.
   * @param slug Slug dari konten yang akan diambil.
   */
  const fetchContentBySlug = (contentType: 'blogs' | 'portfolios', slug: string) => {
    const cacheKey = `${contentType}-${slug}`;
    const asyncDataKey = `content-${cacheKey}`; // Kunci unik untuk useAsyncData

    return useAsyncData<SlugContent>(
      asyncDataKey,
      async () => {
        // 1. Periksa cache terlebih dahulu.
        if (contentCache.value[cacheKey]) {
          console.log(`Mengambil konten dari cache untuk kunci: ${cacheKey}`);
          return contentCache.value[cacheKey];
        }

        // 2. Jika tidak ada di cache, ambil dari API.
        console.log(`Mengambil konten dari API untuk kunci: ${cacheKey}`);
        try {
          const response = await $api.get(`/api/${contentType}/${slug}`);
          const data = response.data.data;

          // 3. Simpan hasil ke cache.
          if (data) {
            contentCache.value[cacheKey] = data;
          }
          return data;

        } catch (err) {
          console.error(`Gagal mengambil data untuk ${contentType} dengan slug: ${slug}`, err);
          // Lemparkan error 404 agar Nuxt dapat menampilkannya halaman error.
          throw createError({
            statusCode: 404,
            statusMessage: "Content Not Found",
            fatal: true,
          });
        }
      },
      {
        transform(input) {
          // Tambahkan baseUrl ke URL gambar jika perlu.
          if (!input) return null;
          return {
            ...input,
            coverImage: input.coverImage.startsWith('http') ? input.coverImage : baseUrl + input.coverImage,
          };
        },
      }
    );
  };

  return {
    fetchContentBySlug,
  };
};
