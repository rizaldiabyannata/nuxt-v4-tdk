// app/composables/useContentTracking.ts

// Mendefinisikan tipe data untuk memastikan keamanan dan kejelasan.
interface Portfolio {
  _id: string;
  title: string;
  shortDescription: string;
  coverImage: string;
  slug: string;
}

interface Article {
  _id: string;
  title: string;
  summary: string;
  coverImage: string;
  slug: string;
  createdAt: string;
}

interface ContentTrackingData {
  highlightedPortfolios: Portfolio[];
  featuredBlogs: Article[];
}

export const useContentTracking = () => {
  // Cache tunggal untuk data content tracking (dideklarasikan dalam konteks composable)
  const contentTrackingCache = useState<ContentTrackingData | null>(
    'content-tracking-cache',
    () => null
  );
  const { $api } = useNuxtApp();
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;

  /**
   * Mengambil data content tracking (highlighted portfolios dan featured blogs).
   * Memeriksa cache terlebih dahulu sebelum melakukan panggilan API.
   */
  const fetchContentTracking = () => {
    const key = 'content-tracking-data';

    return useAsyncData<ContentTrackingData>(
      key,
      async () => {
        // 1. Periksa cache.
        if (contentTrackingCache.value) {
          console.log('Mengambil data content tracking dari cache.');
          return contentTrackingCache.value;
        }

        // 2. Jika tidak ada, ambil dari API.
        console.log('Mengambil data content tracking dari API.');
        try {
          const response = await $api.get('/api/content-tracking/');
          const data = response.data;

          // 3. Simpan ke cache.
          if (data) {
            contentTrackingCache.value = data;
          }
          return data;

        } catch (error) {
          console.error('Gagal mengambil data content tracking:', error);
          return { highlightedPortfolios: [], featuredBlogs: [] };
        }
      },
      {
        transform(input) {
          // Transformasi untuk menambahkan baseUrl ke gambar.
          if (!input) {
            return { highlightedPortfolios: [], featuredBlogs: [] };
          }
          return {
            highlightedPortfolios: input.highlightedPortfolios.map((p: Portfolio) => ({
              ...p,
              coverImage: p.coverImage.startsWith('http') ? p.coverImage : baseUrl + p.coverImage,
            })),
            featuredBlogs: input.featuredBlogs.map((b: Article) => ({
              ...b,
              coverImage: b.coverImage.startsWith('http') ? b.coverImage : baseUrl + b.coverImage,
            })),
          };
        },
        default: () => ({ highlightedPortfolios: [], featuredBlogs: [] }),
      }
    );
  };

  return {
    fetchContentTracking,
  };
};
