<template>
  <div class="relative h-[50vh] lg:h-[60vh] flex flex-col justify-center items-center text-white px-4 sm:px-8">
    <div class="absolute inset-0 bg-[url('/img/sample/sample-4.jpeg')] bg-cover bg-center brightness-50 -z-10"></div>

    <div class="relative space-y-4 lg:w-1/2 text-center">
      <h1 class="font-extrabold text-3xl md:text-4xl lg:text-5xl">Explore Our Finest Work</h1>
      <p class="text-base lg:text-lg text-gray-200">Browse through our portfolio of innovative and sustainable architectural designs.</p>
    </div>
  </div>

  <div class="max-w-screen flex flex-col justify-center items-center px-4 py-16 sm:px-8 sm:py-24">
    <div class="flex flex-col w-full max-w-6xl text-center">
      <p class="text-lg font-semibold text-gray-600">Featured Projects</p>
      <h1 class="text-4xl md:text-5xl font-bold text-[#EB5523] mt-2">Highlights</h1>
    </div>
    <div v-if="highlightedPortfolios.length > 0" class="w-full max-w-6xl mt-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="lg:col-span-2 lg:row-span-2" v-if="highlightedPortfolios[0]">
          <homepage-card
            :title="highlightedPortfolios[0].title"
            :shortDescription="highlightedPortfolios[0].shortDescription"
            :imageUrl="highlightedPortfolios[0].coverImage"
            :slug="highlightedPortfolios[0].slug"
            class="h-full"
          />
        </div>
        <template v-for="(portfolio, index) in highlightedPortfolios.slice(1, 5)" :key="index">
          <homepage-card-small
            :title="portfolio.title"
            :shortDescription="portfolio.shortDescription"
            :imageUrl="portfolio.coverImage"
            :navigateTO="`/portfolio/${portfolio.slug}`"
            class="h-full"
          />
        </template>
      </div>
    </div>
  </div>
  <div id="portfolio-section" class="max-w-screen min-h-screen flex flex-col justify-center items-center px-4 py-16 sm:px-8 sm:py-24 bg-slate-100">
    <div class="flex flex-col w-full max-w-6xl text-center">
      <p class="text-lg font-semibold text-gray-600">Our Portfolio</p>
      <h1 class="text-4xl md:text-5xl font-bold text-[#EB5523] mt-2">All Projects</h1>
    </div>
    <div class="flex flex-col lg:flex-row w-full max-w-6xl mt-12 justify-center items-center">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <portfolio-card
          class="h-5/6"
          v-for="portfolio in portfoliosList"
          :key="portfolio._id"
          :title="portfolio.title"
          :shortDescription="portfolio.shortDescription"
          :imageUrl="portfolio.coverImage"
          :slug="portfolio.slug"
        />
      </div>
    </div>
    <div v-if="portfoliosList.length === 0" class="flex flex-col items-center justify-center py-16">
      <svg width="64" height="64" fill="none" viewBox="0 0 64 64" class="mb-4 text-gray-300">
        <circle cx="32" cy="32" r="32" fill="#F3F4F6" />
        <path d="M20 40V24a4 4 0 014-4h16a4 4 0 014 4v16" stroke="#A1A1AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M24 32h16" stroke="#A1A1AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <p class="text-gray-500 text-lg font-semibold">Tidak ada data portfolio.</p>
    </div>
    <div class="pagination flex gap-2 justify-center mt-8">
      <button
        @click="goToPageWithScroll(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow"
      >
        Prev
      </button>
      <span v-for="page in totalPages" :key="page">
        <button
          @click="goToPageWithScroll(page)"
          :class="[
            'mx-1 px-3 py-2 rounded-full border transition-all shadow',
            page === currentPage ? 'bg-[#EB5523] text-white border-[#EB5523] font-bold scale-110' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100',
          ]"
        >
          {{ page }}
        </button>
      </span>
      <button
        @click="goToPageWithScroll(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      portfoliosList: [],
      highlightedPortfolios: [],
      currentPage: 1,
      pageSize: 6,
      totalPages: 1,
    };
  },

  async mounted() {
    await this.fetchHighlightedPortfolios();
    await this.fetchPortfolios();
  },

  methods: {
    async fetchHighlightedPortfolios() {
      const baseUrl = useRuntimeConfig().public.apiBaseUrl;
      try {
        const response = await this.$api.get(`/api/content-tracking/`);
        console.log(response.data);
        this.highlightedPortfolios = response.data.highlightedPortfolios.map((portfolio) => ({
          ...portfolio,
          coverImage: baseUrl + portfolio.coverImage,
        }));
      } catch (error) {
        console.error("Gagal mengambil data portfolio yang di-highlight:", error);
      }
    },
    async fetchPortfolios() {
      const baseUrl = useRuntimeConfig().public.apiBaseUrl;
      try {
        const response = await this.$api.get(`/api/portfolios?limit=${this.pageSize}&page=${this.currentPage}&status=active`);
        this.portfoliosList = response.data.data.map((portfolio) => ({
          ...portfolio,
          coverImage: baseUrl + portfolio.coverImage,
        }));
        this.totalPages = response.data.pagination.totalPages;
      } catch (error) {
        console.error("Gagal mengambil data portfolio:", error);
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchPortfolios();
      }
    },
    goToPageWithScroll(page) {
      this.goToPage(page);
      this.$nextTick(() => {
        const section = document.getElementById("portfolio-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      });
    },
  },
};
</script>
