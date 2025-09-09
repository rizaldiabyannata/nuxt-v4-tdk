<template>
  <div v-if="pending" class="min-h-screen flex items-center justify-center">
    <p>Loading...</p> <!-- Replace with a proper skeleton loader if you have one -->
  </div>
  <div v-else-if="blog">
    <div class="relative min-h-[300px] h-[50vh] flex flex-col justify-center text-white px-4 py-16 sm:px-8 sm:py-24">
      <NuxtImg
        :src="blog.coverImage"
        class="absolute inset-0 w-full h-full object-cover brightness-50 -z-10"
        placeholder
      />
      <div class="relative space-y-2 w-full lg:w-2/3">
        <h1 class="font-extrabold text-3xl md:text-4xl lg:text-5xl">
          {{ blog.title }}
        </h1>
        <p class="text-base lg:text-lg text-gray-200 mt-4">
          By {{ blog.author || 'PT. Total Desain Konsultan' }}
        </p>
      </div>
    </div>
    <div class="w-full flex flex-col lg:flex-row bg-white px-4 py-16 sm:px-8 sm:py-24">
      <articleTemplate
        :firstParagraph="blog.summary"
        :image="blog.coverImage"
        :secondParagraph="blog.description"
      />
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <p class="text-xl text-gray-500">Blog post not found.</p>
  </div>
</template>

<script>
import { computed } from "vue";
import articleTemplate from "~/components/articleTemplate.vue";

export default {
  name: "ArticleDetailPage",
  components: {
    articleTemplate,
  },
  setup() {
    const { $api } = useNuxtApp();
    const route = useRoute();
    const config = useRuntimeConfig();
    const slug = route.params.slug;
    const baseUrl = config.public.apiBaseUrl;

    const {
      data: blog,
      pending,
      error,
    } = useAsyncData(
      `blog-${slug}`,
      async () => {
        try {
          const response = await $api.get(`/api/blogs/${slug}`);
          return response.data.data;
        } catch (err) {
          console.error(`Gagal mengambil data blog untuk slug: ${slug}`, err);
          throw createError({
            statusCode: 404,
            statusMessage: "Blog post not found",
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

    return {
      blog,
      pending,
    };
  },
};
</script>
