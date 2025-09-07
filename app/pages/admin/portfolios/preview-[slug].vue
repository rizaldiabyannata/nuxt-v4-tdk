<template>
  <div v-if="portfolio">
    <div class="relative min-h-[300px] h-[50vh] flex flex-col">
      <div crossorigin="anonymous" class="absolute inset-0 bg-cover bg-center brightness-50 -z-10" :style="{ backgroundImage: `url(${portfolio.coverImage})` }"></div>
      <div class="relative space-y-2 w-full lg:w-1/2 flex flex-col h-full justify-center p-4 sm:p-6 md:p-8">
        <h1 class="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white">
          {{ portfolio.title }}
        </h1>
        <p class="text-white text-sm sm:text-base md:text-lg">By {{ portfolio.author || "PT. Total Desain Konsultan" }}</p>
      </div>
    </div>
    <div class="w-full flex flex-col lg:flex-row bg-white p-4 sm:p-6 md:p-8">
      <PortoTemplate :firstParagraph="portfolio.summary" :image="portfolio.coverImage" :secondParagraph="portfolio.description" />
    </div>
  </div>
  <div v-else class="text-center p-8">
    <p class="text-lg text-gray-600">Loading portfolio preview...</p>
  </div>
</template>

<script>
import PortoTemplate from '~/components/portoTemplate.vue';

export default {
  name: 'PortfolioPreviewPage',
  components: {
    PortoTemplate,
  },
  data() {
    return {
      portfolio: null,
    };
  },
  methods: {
    updatePortfolioFromQuery(query) {
      if (query) {
        this.portfolio = {
          title: query.title || 'Untitled',
          summary: query.shortDescription || '',
          description: query.description || '',
          coverImage: query.coverImage || '/img/placeholder.png',
          author: 'PT. Total Desain Konsultan',
        };
      }
    },
  },
  created() {
    this.updatePortfolioFromQuery(this.$route.query);
  },
  watch: {
    '$route.query'(newQuery) {
      this.updatePortfolioFromQuery(newQuery);
    },
  },
};
</script>
