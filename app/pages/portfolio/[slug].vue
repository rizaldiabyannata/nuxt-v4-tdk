<template>
  <div v-if="portfolio">
    <div class="relative min-h-[300px] h-[50vh] flex flex-col justify-center text-white px-4 py-16 sm:px-8 sm:py-24">
      <div
        class="absolute inset-0 bg-cover bg-center brightness-50 -z-10"
        :style="`background-image: url('${portfolio.coverImage}')`"
      ></div>
      <div class="relative space-y-2 w-full lg:w-2/3">
        <h1 class="font-extrabold text-3xl md:text-4xl lg:text-5xl">
          {{ portfolio.title }}
        </h1>
        <p class="text-base lg:text-lg text-gray-200 mt-4">
          By {{ portfolio.author || 'PT. Total Desain Konsultan' }}
        </p>
      </div>
    </div>
    <div class="w-full flex flex-col lg:flex-row bg-white px-4 py-16 sm:px-8 sm:py-24">
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
import PortoTemplate from "~/components/portoTemplate.vue";

export default {
  components: {
    PortoTemplate,
  },
  setup() {
    const route = useRoute();
    const slug = route.params.slug;

    // Gunakan composable generik untuk mengambil konten berdasarkan slug.
    const { fetchContentBySlug } = useContentBySlug();
    const { data: portfolio, pending } = fetchContentBySlug('portfolios', slug);

    return {
      portfolio,
      pending,
    };
  },
};
</script>
