<template>
  <div
    ref="heroSection"
    class="relative h-[50vh] lg:h-[60vh] flex flex-col justify-center text-black overflow-hidden px-4 sm:px-8"
  >
    <!-- Background image overlay with brightness -->
    <div
      class="absolute inset-0 bg-[url('/img/sample/sample-2.jpeg')] bg-cover bg-center brightness-50 -z-10"
    ></div>

    <!-- Konten tetap terang -->
    <div class="w-full lg:w-1/2 relative z-10 space-y-4">
      <h1 class="font-extrabold text-3xl md:text-4xl lg:text-5xl text-white">
        Stay Updated with Our Latest News & Reports
      </h1>
      <p class="text-base lg:text-lg text-white">
        Discover insights, trends, and stories from the world of architecture
        and construction.
      </p>
    </div>
  </div>

  <!-- Tetap gunakan bagian ini tanpa perubahan -->
  <div
    id="article-section"
    ref="articlesSection"
    class="max-w-screen min-h-screen flex flex-col items-center px-4 py-16 sm:px-8 sm:py-24"
  >
    <div class="flex flex-col w-full max-w-6xl text-center">
      <p class="text-lg font-semibold text-gray-600">Our Articles</p>
      <h1 class="text-4xl md:text-5xl font-bold text-[#EB5523] mt-2">
        Insights & Innovations
      </h1>
    </div>
    <div
      class="flex flex-col lg:flex-row w-full max-w-6xl mt-12 justify-center items-center"
    >
      <div
        ref="articlesGrid"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
      >
        <carousel-card
          v-for="article in articleList"
          :key="article._id"
          :title="article.title"
          :summary="article.summary"
          :imageUrl="article.coverImage"
          :slug="article.slug"
          class="transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
        />
      </div>
    </div>
    <div
      v-if="articleList.length === 0"
      class="flex flex-col items-center justify-center py-16"
    >
      <svg
        width="64"
        height="64"
        fill="none"
        viewBox="0 0 64 64"
        class="mb-4 text-gray-300"
      >
        <circle cx="32" cy="32" r="32" fill="#F3F4F6" />
        <path
          d="M20 40V24a4 4 0 014-4h16a4 4 0 014 4v16"
          stroke="#A1A1AA"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M24 32h16"
          stroke="#A1A1AA"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <p class="text-gray-500 text-lg font-semibold">Tidak ada data artikel.</p>
    </div>
    <div class="pagination flex gap-2 justify-center mt-8">
      <button
        @click="goToPageWithScroll(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow cursor-pointer"
      >
        Prev
      </button>
      <span v-for="page in totalPages" :key="page">
        <button
          @click="goToPageWithScroll(page)"
          :class="[
            'mx-1 px-3 py-2 rounded-full border transition-all shadow cursor-pointer',
            page === currentPage
              ? 'bg-[#EB5523] text-white border-[#EB5523] font-bold scale-110'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100',
          ]"
        >
          {{ page }}
        </button>
      </span>
      <button
        @click="goToPageWithScroll(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow cursor-pointer"
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
      articleList: [],
      currentPage: 1,
      pageSize: 6,
      totalPages: 1,
    };
  },

  async mounted() {
    await this.fetchArticles();
    this.initAnimations();
  },

  methods: {
    initAnimations() {
      const gsap = this.$gsap;
      const animateOnScroll = (elem, vars) => {
        if (!elem) return;
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          duration: 0.8,
          autoAlpha: 0,
          y: 50,
          ease: "power3.out",
          ...vars,
        });
      };

      // Hero Section
      gsap.from(this.$refs.heroSection.children, {
        duration: 1,
        autoAlpha: 0,
        y: 30,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.2,
      });

      // Articles Section
      const articlesSection = this.$refs.articlesSection;
      if (articlesSection) {
        animateOnScroll(articlesSection.querySelector("p"));
        animateOnScroll(articlesSection.querySelector("h1"), { delay: 0.1 });
      }
      this.animateArticleCards();
    },

    animateArticleCards() {
      const gsap = this.$gsap;
      this.$nextTick(() => {
        const articlesGrid = this.$refs.articlesGrid;
        if (articlesGrid) {
          const articleCards = articlesGrid.querySelectorAll(".transition-transform");
          gsap.from(articleCards, {
            duration: 0.5,
            autoAlpha: 0,
            y: 50,
            ease: "power3.out",
            stagger: 0.1,
          });
        }
      });
    },
    async fetchArticles() {
      const baseUrl = useRuntimeConfig().public.apiBaseUrl;
      try {
        const response = await this.$api.get(
          `/api/blogs?limit=${this.pageSize}&page=${this.currentPage}&status=active`
        );
        this.articleList = response.data.data.map((article) => ({
          ...article,
          coverImage: baseUrl + article.coverImage,
        }));
        this.totalPages = response.data.pagination.totalPages;
        this.animateArticleCards();
      } catch (error) {
        console.error("Gagal mengambil data artikel:", error);
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchArticles();
      }
    },
    goToPageWithScroll(page) {
      this.goToPage(page);
      this.$nextTick(() => {
        const section = document.getElementById("article-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      });
    },
  },
};
</script>