<template>
  <div v-if="portfolio">
    <div class="relative min-h-[300px] h-[50vh] flex flex-col">
      <div
        class="absolute inset-0 bg-cover bg-center brightness-50 -z-10"
        :style="`background-image: url('${portfolio.coverImage}')`"
      ></div>
      <div class="relative space-y-2 w-full lg:w-1/2 flex flex-col h-full justify-center p-4 sm:p-6 md:p-8">
        <h1 class="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white">
          {{ portfolio.title }}
        </h1>
        <p class="text-white text-sm sm:text-base md:text-lg">
          By {{ portfolio.author || 'PT. Total Desain Konsultan' }}
        </p>
      </div>
    </div>
    <div class="w-full flex flex-col lg:flex-row bg-white p-4 sm:p-6 md:p-8">
      <PortoTemplate
        :firstParagraph="portfolio.shortDescription"
        :image="portfolio.coverImage"
        :secondParagraph="portfolio.description"
      />
    </div>
  </div>
  <div v-else>
    <p>Portfolio tidak ditemukan.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      portfolio: {},
      slug: this.$route.params.slug,
    };
  },
  created() {
    this.fetchPortfolio();
  },
  methods: {
    async fetchPortfolio() {
      try {
        const response = await this.$api.get(`/api/portfolios/${this.slug}`);
        this.portfolio = response.data.data;
        this.portfolio.coverImage = useRuntimeConfig().public.apiBaseUrl + this.portfolio.coverImage; 
        console.log("Data portfolio berhasil diambil:", this.portfolio);
      } catch (error) {
        console.error("Gagal mengambil data portfolio:", error);
      }
    }
  },
};
</script>
