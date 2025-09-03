<template>
  <div v-if="blog">
    <div class="relative min-h-[300px] h-[50vh] flex flex-col">
      <div
        class="absolute inset-0 bg-cover bg-center brightness-50 -z-10"
        :style="`background-image: url('${blog.coverImage}')`"
      ></div>
      <div class="relative space-y-2 w-full lg:w-1/2 flex flex-col h-full justify-center p-4 sm:p-6 md:p-8">
        <h1 class="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-5xl ">
          {{ blog.title }}
        </h1>
        <p class=" text-sm sm:text-base md:text-lg">
          By {{ blog.author || 'PT. Total Desain Konsultan' }}
        </p>
      </div>
    </div>
    <div class="w-full flex flex-col lg:flex-row bg-white p-4 sm:p-6 md:p-8">
      <articleTemplate
        :firstParagraph="blog.summary"
        :image="blog.coverImage"
        :secondParagraph="blog.description"
      />
    </div>
  </div>
  <div v-else>
    <p>Blog tidak ditemukan.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blog: {},
      slug: this.$route.params.slug,
    };
  },
  created() {
    this.fetchBlog();
  },
  methods: {
    async fetchBlog() {
      try {
        const response = await this.$api.get(`/api/blogs/${this.slug}`);
        this.blog = response.data.data;
        this.blog.coverImage = useRuntimeConfig().public.apiBaseUrl + this.blog.coverImage; 
        console.log("Data blog berhasil diambil:", this.blog);
      } catch (error) {
        console.error("Gagal mengambil data blog:", error);
      }
    }
  },
};
</script>
