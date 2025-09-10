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
import { computed } from "vue";
import PortoTemplate from "~/components/portoTemplate.vue";

export default {
  components: {
    PortoTemplate,
  },
  setup() {
    const { $api } = useNuxtApp();
    const route = useRoute();
    const config = useRuntimeConfig();
    const slug = route.params.slug;
    const baseUrl = config.public.apiBaseUrl;

    const { data, pending, error } = useAsyncData(
      `portfolio-${slug}`,
      async () => {
        try {
          const response = await $api.get(`/api/portfolios/${slug}`);
          return response.data.data;
        } catch (err) {
          console.error(
            `Gagal mengambil data portfolio untuk slug: ${slug}`,
            err
          );
          // This will cause the error page to be shown if the portfolio is not found
          throw createError({
            statusCode: 404,
            statusMessage: "Portfolio Not Found",
            fatal: true,
          });
        }
      },
      {
        transform(input) {
          if (!input) return null;
          return {
            ...input,
            coverImage: baseUrl + input.coverImage,
          };
        },
      }
    );

    const portfolio = computed(() => data.value);

    return {
      portfolio,
      pending,
    };
  },
};
</script>
