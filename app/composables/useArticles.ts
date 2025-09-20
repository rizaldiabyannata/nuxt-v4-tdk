// app/composables/useArticles.ts
import { ref, watch, computed, type Ref } from 'vue';

// Definisikan tipe data untuk artikel dan paginasi agar lebih aman dan jelas.
interface Article {
  _id: string;
  title: string;
  summary: string;
  coverImage: string;
  slug: string;
  // tambahkan properti lain jika ada
}

interface Pagination {
  totalPages: number;
  // tambahkan properti paginasi lain jika ada
}

interface ArticlesData {
  data: Article[];
  pagination: Pagination;
}

// `useState` membuat state yang reaktif dan dapat dibagikan di seluruh aplikasi.
// Data ini akan tetap ada selama sesi pengguna (navigasi sisi klien).
export const useArticles = () => {
  const articlesCache = useState<Record<number, ArticlesData>>(
    'articles-cache',
    () => ({})
  );
  const { $api } = useNuxtApp();
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;

  const fetchArticles = (page: Ref<number>, pageSize: number) => {
    const key = computed(() => `articles-page-${page.value}`);

    return useAsyncData<ArticlesData>(
      key.value,
      async () => {
        // 1. Periksa cache terlebih dahulu
        if (articlesCache.value[page.value]) {
          console.log(`Mengambil dari cache untuk halaman: ${page.value}`);
          return articlesCache.value[page.value];
        }

        // 2. Jika tidak ada di cache, ambil dari API
        console.log(`Mengambil dari API untuk halaman: ${page.value}`);
        try {
          const response = await $api.get(
            `/api/blogs?limit=${pageSize}&page=${page.value}&status=active`
          );
          const data = response.data;

          // 3. Simpan hasil ke cache
          articlesCache.value[page.value] = data;
          return data;

        } catch (error) {
          console.error(`Gagal mengambil data artikel untuk halaman ${page.value}:`, error);
          // Kembalikan struktur data default jika terjadi error
          return { data: [], pagination: { totalPages: 1 } };
        }
      },
      {
        watch: [page], // Otomatis fetch ulang saat 'page' berubah
        transform(input) {
          // Transformasi untuk menambahkan baseUrl ke coverImage
          if (!input) return { data: [], pagination: { totalPages: 1 } };
          return {
            ...input,
            data: input.data.map((article: Article) => ({
              ...article,
              coverImage: article.coverImage.startsWith('http') ? article.coverImage : baseUrl + article.coverImage,
            })),
          };
        },
        default: () => ({ data: [], pagination: { totalPages: 1 } }),
      }
    );
  };

  return {
    fetchArticles,
  };
};
