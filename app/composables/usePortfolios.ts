// app/composables/usePortfolios.ts
import type { Ref } from 'vue';

// Definisi tipe untuk data Portofolio, Paginasi, dan struktur data Portfolios.
// Ini memastikan keamanan tipe dan kejelasan kode.
interface Portfolio {
  _id: string;
  title: string;
  shortDescription: string;
  coverImage: string;
  slug: string;
}

interface Pagination {
  totalPages: number;
}

interface PortfoliosData {
  data: Portfolio[];
  pagination: Pagination;
}

export const usePortfolios = () => {
  // Cache untuk menyimpan data portofolio yang sudah diambil, dipisahkan per halaman.
  const portfoliosCache = useState<Record<number, PortfoliosData>>(
    'portfolios-cache',
    () => ({})
  );
  const { $api } = useNuxtApp();
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;

  /**
   * Mengambil daftar portofolio yang dipaginasi.
   * Fungsi ini akan memeriksa cache terlebih dahulu sebelum membuat panggilan API.
   * @param page - Ref<number> dari halaman saat ini.
   * @param pageSize - Jumlah item per halaman.
   */
  const fetchPortfolios = (page: Ref<number>, pageSize: number) => {
    const key = `portfolios-list-data`;

    return useAsyncData<PortfoliosData>(
      key,
      async () => {
        // 1. Periksa cache terlebih dahulu.
        if (portfoliosCache.value[page.value]) {
          console.log(`Mengambil portofolio dari cache untuk halaman: ${page.value}`);
          return portfoliosCache.value[page.value];
        }

        // 2. Jika tidak ada di cache, ambil dari API.
        console.log(`Mengambil portofolio dari API untuk halaman: ${page.value}`);
        try {
          const response = await $api.get(
            `/api/portfolios?limit=${pageSize}&page=${page.value}&status=active`
          );
          const data = response.data;

          // 3. Simpan hasil ke cache untuk penggunaan di masa mendatang.
          if (data) {
            portfoliosCache.value[page.value] = data;
          }
          return data;

        } catch (error) {
          console.error(`Gagal mengambil data portofolio untuk halaman ${page.value}:`, error);
          return { data: [], pagination: { totalPages: 1 } };
        }
      },
      {
        watch: [page], // Secara otomatis mengambil ulang data saat 'page' berubah.
        transform(input) {
          // Menambahkan baseUrl ke URL gambar jika belum ada.
          if (!input || !input.data) return { data: [], pagination: { totalPages: 1 } };
          return {
            ...input,
            data: input.data.map((portfolio: Portfolio) => ({
              ...portfolio,
              coverImage: portfolio.coverImage.startsWith('http') ? portfolio.coverImage : baseUrl + portfolio.coverImage,
            })),
          };
        },
        default: () => ({ data: [], pagination: { totalPages: 1 } }),
      }
    );
  };

  return {
    fetchPortfolios,
  };
};
