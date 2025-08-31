<template>
  <div class="relative h-[50vh] lg:h-screen flex flex-col justify-center text-black overflow-hidden">
    <!-- Background image overlay with brightness -->
    <div class="absolute inset-0 bg-[url('/img/sample/sample-2.jpeg')] bg-cover bg-center brightness-50 -z-10"></div>

    <!-- Konten tetap terang -->
    <div class="w-9/10 pl-12 space-y-2 lg:pl-24 lg:w-1/2 relative z-10">
      <h1 class="font-extrabold text-2xl lg:text-5xl text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h1>
      <p class="lg:text-2xl text-white">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus ab magni explicabo
        quibusdam architecto tenetur?
      </p>
      <a
        href=""
        class="flex flex-row w-fit shadow-xl backdrop-blur-sm text-white border rounded-full px-4 py-2 mt-6 text-sm items-center space-x-2 hover:backdrop-blur-lg transition-colors hover:text-black"
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.1969 10.625H1.625C1.30625 10.625 1.03925 10.517 0.824004 10.301C0.608754 10.085 0.500754 9.818 0.500004 9.5C0.499254 9.182 0.607254 8.915 0.824004 8.699C1.04075 8.483 1.30775 8.375 1.625 8.375H14.1969L8.68437 2.8625C8.45937 2.6375 8.35138 2.375 8.36038 2.075C8.36938 1.775 8.48675 1.5125 8.7125 1.2875C8.9375 1.08125 9.2 0.973246 9.5 0.963496C9.8 0.953746 10.0625 1.06175 10.2875 1.2875L17.7125 8.7125C17.825 8.825 17.9049 8.94687 17.9521 9.07812C17.9994 9.20937 18.0226 9.35 18.0219 9.5C18.0211 9.65 17.9979 9.79062 17.9521 9.92187C17.9064 10.0531 17.8265 10.175 17.7125 10.2875L10.2875 17.7125C10.0813 17.9187 9.82362 18.0219 9.51462 18.0219C9.20563 18.0219 8.93825 17.9187 8.7125 17.7125C8.4875 17.4875 8.375 17.2205 8.375 16.9115C8.375 16.6025 8.4875 16.3351 8.7125 16.1094L14.1969 10.625Z"
            fill="#EB5523"
          />
        </svg>
        <p class="font-semibold text-white">Our Services</p>
      </a>
    </div>
  </div>

  <!-- Tetap gunakan bagian ini tanpa perubahan -->
  <div class="max-w-screen min-h-screen flex flex-col justify-center items-center px-8 md:px-32 py-16">
    <div class="flex flex-col w-full">
      <p>Our Article</p>
      <h1 class="text-3xl font bold text-[#EB5523]">Lorem Ipsum</h1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-14 md:mt-8">
      <article-card v-for="article in articleList" :key="article.slug" :title="article.title" :content="article.content" :imageUrl="`http://localhost:5000${article.coverImage}`" :author="article.author"/>

    </div>
    <div class="join mt-4">
      <button class="join-item btn bg-white text-black">1</button>
      <button class="join-item btn bg-white text-black">2</button>
      <button class="join-item btn bg-white text-black">...</button>
      <button class="join-item btn bg-white text-black">99</button>
      <button class="join-item btn bg-white text-black">100</button>
    </div>
  </div>
</template>

<script>
export default{
  data() {
    return{
      articleList: []
    }
  },

  mounted() {
    this.fetchArticles();
  },

  methods: {
    async fetchArticles() {
      console.log("Mencoba mengambil data article dari API...");
      try {
        const response = await this.$api.get("/blogs?limit=2&page=1");
        console.log("Data article berhasil diambil:", response.data);
        this.articleList = response.data.data;
      } catch (error) {
        console.error("Gagal mengambil data article:", error);
      }
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.article.coverImage = file;
      }
    },
  }
  
}
</script>