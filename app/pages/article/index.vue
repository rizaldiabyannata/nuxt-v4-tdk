<template>
  <div
    ref="heroSection"
    class="relative h-[50vh] lg:h-[60vh] flex flex-col justify-center text-black overflow-hidden px-4 sm:px-8"
  >
    <NuxtImg
      src="/img/sample/sample-2.jpeg"
      class="absolute inset-0 w-full h-full object-cover brightness-50 -z-10"
      placeholder
    />
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
        v-if="pending"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
      >
        <SkeletonCarouselCardSkeleton v-for="i in pageSize" :key="i" />
      </div>
      <div
        v-else
        ref="articlesGrid"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
      >
        <carousel-card
          v-for="article in articleList"
          :key="article._id"
          :title="
            article.title.substring(0, 35) +
            (article.title.length > 35 ? '...' : '')
          "
          :summary="article.summary"
          :imageUrl="article.coverImage"
          :slug="article.slug"
          class="transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
        />
      </div>
    </div>
    <div
      v-if="!pending && articleList.length === 0"
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
        :disabled="currentPage === 1 || pending"
        class="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow cursor-pointer"
      >
        Prev
      </button>
      <span v-for="page in totalPages" :key="page">
        <button
          @click="goToPageWithScroll(page)"
          :disabled="pending"
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
        :disabled="currentPage === totalPages || pending"
        class="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow cursor-pointer"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import SkeletonCarouselCardSkeleton from '~/components/skeleton/CarouselCardSkeleton.vue';

const { $api, $gsap } = useNuxtApp();
const config = useRuntimeConfig();
const baseUrl = config.public.apiBaseUrl;

const articleList = ref([]);
const currentPage = ref(1);
const pageSize = 6;
const totalPages = ref(1);

const heroSection = ref(null);
const articlesSection = ref(null);
const articlesGrid = ref(null);

const { pending, data: articlesData, refresh: refreshArticles } = useAsyncData(
  'articles-list',
  async () => {
    try {
      const response = await $api.get(
        `/api/blogs?limit=${pageSize}&page=${currentPage.value}&status=active`
      );
      return response.data;
    } catch (error) {
      console.error("Gagal mengambil data artikel:", error);
      return { data: [], pagination: { totalPages: 1 } };
    }
  },
  { watch: [currentPage] }
);

watch(articlesData, (newData) => {
  if (newData) {
    articleList.value = newData.data.map((article) => ({
      ...article,
      coverImage: baseUrl + article.coverImage,
    }));
    totalPages.value = newData.pagination.totalPages;
    nextTick(() => {
      animateArticleCards();
    });
  }
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const goToPageWithScroll = (page) => {
  goToPage(page);
  nextTick(() => {
    const section = document.getElementById('article-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
};

const initAnimations = () => {
      const gsap = $gsap;
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

      if(heroSection.value) {
        gsap.from(heroSection.value.children, {
          duration: 1,
          autoAlpha: 0,
          y: 30,
          ease: "power3.out",
          stagger: 0.2,
          delay: 0.2,
        });
      }

      const articlesSectionElem = articlesSection.value;
      if (articlesSectionElem) {
        animateOnScroll(articlesSectionElem.querySelector("p"));
        animateOnScroll(articlesSectionElem.querySelector("h1"), { delay: 0.1 });
      }
    };

const animateArticleCards = () => {
  const gsap = $gsap;
  nextTick(() => {
    const articlesGridElem = articlesGrid.value;
    if (articlesGridElem) {
      const articleCards = articlesGridElem.querySelectorAll(
        ".transition-transform"
      );
      gsap.set(articleCards, { autoAlpha: 0, y: 50 });
      gsap.to(articleCards, {
        duration: 0.5,
        autoAlpha: 1,
        y: 0,
        ease: "power3.out",
        stagger: 0.1,
      });
    }
  });
};

onMounted(() => {
  initAnimations();
});
</script>
