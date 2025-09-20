<template>
  <div
    ref="heroSection"
    class="relative h-[50vh] lg:h-[60vh] flex flex-col justify-center items-center text-white px-4 sm:px-8"
  >
    <div
      class="absolute inset-0 bg-[url('/img/sample/sample-4.jpeg')] bg-cover bg-center brightness-50 -z-10"
    ></div>

    <div class="relative space-y-4 lg:w-1/2 text-center">
      <h1 class="font-extrabold text-3xl md:text-4xl lg:text-5xl">
        Explore Our Finest Work
      </h1>
      <p class="text-base lg:text-lg text-gray-200">
        Browse through our portfolio of innovative and sustainable architectural
        designs.
      </p>
    </div>
  </div>

  <div
    v-if="highlightedPortfolios.length > 0 || highlightedPending"
    ref="featuredSection"
    class="max-w-screen flex flex-col justify-center items-center px-4 py-16 sm:px-8 sm:py-24"
  >
    <div class="flex flex-col w-full max-w-6xl text-center">
      <p class="text-lg font-semibold text-gray-600">Featured Projects</p>
      <h1 class="text-4xl md:text-5xl font-bold text-[#EB5523] mt-2">
        Highlights
      </h1>
    </div>
    <div v-if="highlightedPending" class="w-full max-w-6xl mt-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="lg:col-span-2 lg:row-span-2">
          <SkeletonHomepageCardSkeleton />
        </div>
        <SkeletonHomepageCardSmallSkeleton />
        <SkeletonHomepageCardSmallSkeleton />
        <SkeletonHomepageCardSmallSkeleton />
        <SkeletonHomepageCardSmallSkeleton />
      </div>
    </div>
    <div
      v-else-if="highlightedPortfolios.length > 0"
      class="w-full max-w-6xl mt-12"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(portfolio, index) in highlightedPortfolios.slice(0, 5)"
          :key="portfolio._id"
          :class="{
            'lg:col-span-2 lg:row-span-2': index === 0,
          }"
        >
          <component
            :is="index === 0 ? 'HomepageCard' : 'HomepageCardSmall'"
            :title="portfolio.title"
            :shortDescription="portfolio.shortDescription"
            :imageUrl="portfolio.coverImage"
            :slug="portfolio.slug"
            :navigateTO="`/portfolio/${portfolio.slug}`"
            class="h-full"
          />
        </div>
      </div>
    </div>
  </div>
  <div
    id="portfolio-section"
    ref="allProjectsSection"
    class="max-w-screen min-h-screen flex flex-col justify-center items-center px-4 py-16 sm:px-8 sm:py-24 bg-slate-100"
  >
    <div class="flex flex-col w-full max-w-6xl text-center">
      <p class="text-lg font-semibold text-gray-600">Our Portfolio</p>
      <h1 class="text-4xl md:text-5xl font-bold text-[#EB5523] md:mt-2">
        All Projects
      </h1>
    </div>
    <div
      class="flex flex-col lg:flex-row w-full max-w-6xl mt-12 justify-center items-center"
    >
      <div
        v-if="portfoliosPending"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
      >
        <SkeletonPortfolioCardSkeleton v-for="i in pageSize" :key="i" />
      </div>
      <div
        v-else
        ref="portfolioGrid"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-3 w-full"
      >
        <portfolio-card
          class="md:h-5/6"
          v-for="portfolio in portfoliosList"
          :key="portfolio._id"
          :title="portfolio.title"
          :shortDescription="portfolio.shortDescription"
          :imageUrl="portfolio.coverImage"
          :slug="portfolio.slug"
        />
      </div>
    </div>
    <div
      v-if="!portfoliosPending && portfoliosList.length === 0"
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
      <p class="text-gray-500 text-lg font-semibold">
        Tidak ada data portfolio.
      </p>
    </div>
    <div class="pagination flex gap-2 justify-center mt-8">
      <button
        @click="goToPageWithScroll(currentPage - 1)"
        :disabled="currentPage === 1 || portfoliosPending"
        class="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow"
      >
        Prev
      </button>
      <span v-for="page in totalPages" :key="page">
        <button
          @click="goToPageWithScroll(page)"
          :disabled="portfoliosPending"
          :class="[
            'mx-1 px-3 py-2 rounded-full border transition-all shadow',
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
        :disabled="currentPage === totalPages || portfoliosPending"
        class="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, computed } from "vue";
import SkeletonHomepageCardSkeleton from "~/components/skeleton/HomepageCardSkeleton.vue";
import SkeletonHomepageCardSmallSkeleton from "~/components/skeleton/HomepageCardSmallSkeleton.vue";
import SkeletonPortfolioCardSkeleton from "~/components/skeleton/PortfolioCardSkeleton.vue";
import HomepageCard from "~/components/homepage-card.vue";
import HomepageCardSmall from "~/components/homepage-card-small.vue";
import PortfolioCard from "~/components/portfolio-card.vue";

export default {
  name: "PortfolioPage",
  components: {
    SkeletonHomepageCardSkeleton,
    SkeletonHomepageCardSmallSkeleton,
    SkeletonPortfolioCardSkeleton,
    HomepageCard,
    HomepageCardSmall,
    PortfolioCard,
  },
  setup() {
    const currentPage = ref(1);
    const pageSize = 6;

    // Fetch highlighted portfolios
    const { pending: highlightedPending, data: highlightedData } = useAsyncData(
      "highlighted-portfolios",
      async () => {
        try {
          const response = await $api.get(`/api/content-tracking/`);
          return response.data.highlightedPortfolios;
        } catch (error) {
          console.error(
            "Gagal mengambil data portfolio yang di-highlight:",
            error
          );
          return [];
        }
      },
      {
        transform(input) {
          if (!input) return [];
          return input.map((portfolio) => ({
            ...portfolio,
            coverImage: baseUrl + portfolio.coverImage,
          }));
        },
        default: () => [],
      }
    );

    // Fetch paginated portfolios
    const { pending: portfoliosPending, data: portfoliosData } = useAsyncData(
      "portfolios-list",
      () => {
        try {
          return $api
            .get(
              `/api/portfolios?limit=${pageSize}&page=${currentPage.value}&status=active`
            )
            .then((res) => res.data);
        } catch (error) {
          console.error("Gagal mengambil data portfolio:", error);
          return { data: [], pagination: { totalPages: 1 } };
        }
      },
      {
        watch: [currentPage],
        transform(input) {
          if (!input) return { data: [], pagination: { totalPages: 1 } };
          return {
            data: input.data.map((portfolio) => ({
              ...portfolio,
              coverImage: baseUrl + portfolio.coverImage,
            })),
            pagination: input.pagination,
          };
        },
        default: () => ({ data: [], pagination: { totalPages: 1 } }),
      }
    );

    const highlightedPortfolios = computed(() => highlightedData.value || []);
    const portfoliosList = computed(
      () => (portfoliosData.value && portfoliosData.value.data) || []
    );
    const totalPages = computed(
      () =>
        (portfoliosData.value && portfoliosData.value.pagination.totalPages) ||
        1
    );

    return {
      highlightedPending,
      portfoliosPending,
      highlightedPortfolios,
      portfoliosList,
      currentPage,
      totalPages,
      pageSize,
    };
  },
  watch: {
    // Tonton perubahan data untuk memicu animasi
    portfoliosList(newList, oldList) {
      if (newList.length > 0) {
        nextTick(() => {
          this.animatePortfolioCards();
        });
      }
    },
  },
  mounted() {
    this.initAnimations();
    // Animasikan kartu saat muat awal juga
    if (this.portfoliosList.length > 0) {
      this.animatePortfolioCards();
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    goToPageWithScroll(page) {
      this.goToPage(page);
      nextTick(() => {
        const section = document.getElementById("portfolio-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      });
    },
    initAnimations() {
      const { $gsap } = useNuxtApp();
      const animateOnScroll = (elem, vars) => {
        if (!elem) return;
        $gsap.from(elem, {
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
      if (this.$refs.heroSection) {
        $gsap.from(this.$refs.heroSection.children, {
          duration: 1,
          autoAlpha: 0,
          y: 30,
          ease: "power3.out",
          stagger: 0.2,
          delay: 0.2,
        });
      }
      if (this.$refs.featuredSection) {
        animateOnScroll(this.$refs.featuredSection.querySelector("p"));
        animateOnScroll(this.$refs.featuredSection.querySelector("h1"), {
          delay: 0.1,
        });
        const featuredCards =
          this.$refs.featuredSection.querySelectorAll(".grid > div");
        featuredCards.forEach((card, index) => {
          animateOnScroll(card, { delay: index * 0.1 });
        });
      }
      if (this.$refs.allProjectsSection) {
        animateOnScroll(this.$refs.allProjectsSection.querySelector("p"));
        animateOnScroll(this.$refs.allProjectsSection.querySelector("h1"), {
          delay: 0.1,
        });
      }
    },
    animatePortfolioCards() {
      const { $gsap } = useNuxtApp();
      if (this.$refs.portfolioGrid) {
        const portfolioCards =
          this.$refs.portfolioGrid.querySelectorAll(".h-5\\/6");
        $gsap.set(portfolioCards, { autoAlpha: 0, y: 50 });
        $gsap.to(portfolioCards, {
          duration: 0.5,
          autoAlpha: 1,
          y: 0,
          ease: "power3.out",
          stagger: 0.1,
        });
      }
    },
  },
};
</script>
