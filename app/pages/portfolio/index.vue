<template>
  <div class="relative h-[50vh] lg:h-screen flex flex-col justify-center items-center">
    <div class="absolute inset-0 bg-[url('/img/sample/sample-4.jpeg')] bg-cover bg-center brightness-50 -z-10"></div>

    <div class="relative space-y-2 lg:w-1/2 flex flex-col items-center p-4">
      <h1 class="font-extrabold text-2xl lg:text-5xl text-center text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h1>
      <p class="lg:text-2xl text-center text-white">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus ab magni explicabo quibusdam architecto tenetur?
      </p>
      <a href=""
        class="group flex flex-row w-fit border-white border rounded-full px-4 py-2 mt-6 text-sm items-center space-x-2 hover:bg-white transition-colors">
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.1969 10.625H1.625C1.30625 10.625 1.03925 10.517 0.824004 10.301C0.608754 10.085 0.500754 9.818 0.500004 9.5C0.499254 9.182 0.607254 8.915 0.824004 8.699C1.04075 8.483 1.30775 8.375 1.625 8.375H14.1969L8.68437 2.8625C8.45937 2.6375 8.35138 2.375 8.36038 2.075C8.36938 1.775 8.48675 1.5125 8.7125 1.2875C8.9375 1.08125 9.2 0.973246 9.5 0.963496C9.8 0.953746 10.0625 1.06175 10.2875 1.2875L17.7125 8.7125C17.825 8.825 17.9049 8.94687 17.9521 9.07812C17.9994 9.20937 18.0226 9.35 18.0219 9.5C18.0211 9.65 17.9979 9.79062 17.9521 9.92187C17.9064 10.0531 17.8265 10.175 17.7125 10.2875L10.2875 17.7125C10.0813 17.9187 9.82362 18.0219 9.51462 18.0219C9.20563 18.0219 8.93825 17.9187 8.7125 17.7125C8.4875 17.4875 8.375 17.2205 8.375 16.9115C8.375 16.6025 8.4875 16.3351 8.7125 16.1094L14.1969 10.625Z"
            fill="#EB5523" />
        </svg>
        <p class="font-semibold text-white group-hover:text-black">Our Services</p>
      </a>
    </div>
  </div>

  <div class="max-w-screen min-h-screen flex flex-col justify-center items-center px-8 md:px-32 py-16">
    <div class="flex flex-col w-full">
      <p>Our Article</p>
      <h1 class="text-3xl font bold text-[#EB5523]">Lorem Ipsum</h1>
    </div>
    <div class="flex flex-col lg:flex-row w-full mt-5 gap-4">
      <homepage-card class="w-full lg:w-1/2" />
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full lg:w-1/2">
        <homepage-card-small class="" />
        <homepage-card-small class="" />
        <homepage-card-small class="" />
        <homepage-card-small class="" />
      </div>
    </div>
  </div>
  <div id="portfolio-section" class="max-w-screen min-h-screen flex flex-col justify-center items-center px-8 md:px-32 py-16 bg-slate-300 gap-8">
    <div class="flex flex-col w-full">
      <p>Our Portfolio</p>
      <h1 class="text-3xl font bold text-[#EB5523]">Lorem Ipsum</h1>
    </div>
    <div class="flex flex-col lg:flex-row w-full mt-5 justify-center items-center">
      <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-24 md:grid-cols-2 md:gap-x-6 w-full gap-y-4">
        <homepage-card class="h-5/6" 
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
        <circle cx="32" cy="32" r="32" fill="#F3F4F6"/>
        <path d="M20 40V24a4 4 0 014-4h16a4 4 0 014 4v16" stroke="#A1A1AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M24 32h16" stroke="#A1A1AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
            page === currentPage
              ? 'bg-[#EB5523] text-white border-[#EB5523] font-bold scale-110'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
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
      currentPage: 1,
      pageSize: 6,
      totalPages: 1,
    }
  },

  async mounted() {
    await this.fetchPortfolios();
  },

  methods: {
    async fetchPortfolios() {
      const baseUrl = useRuntimeConfig().public.apiBaseUrl;
      try {
        const response = await this.$api.get(`/api/portfolios?limit=${this.pageSize}&page=${this.currentPage}&status=active`);
        this.portfoliosList = response.data.data.map(portfolio => ({
          ...portfolio,
          coverImage: baseUrl + portfolio.coverImage
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
        const section = document.getElementById('portfolio-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
    },
  }
}
</script>