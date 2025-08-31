<template>
  <div class="flex flex-col min-h-screen bg-white py-4">
    <div class="flex flex-row w-full justify-between px-6 items-center">
      <h1 class="text-3xl font-bold text-[#EB5523]">Dashboard</h1>
      <logout-component />
    </div>

    <hr class="border-0.5 border-black mt-4" />

    <h1 class="text-black px-6 font-semibold text-xl mt-8">Overview</h1>

    <div class="grid grid-cols-3 gap-6 px-6 text-black mt-4">
      <div class="flex flex-col p-8 border border-black rounded-2xl space-y-2">
        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="46" height="46" rx="23" fill="#D398E7" />
          <path
            d="M14 20C14 20 18.477 15 24 15C29.523 15 34 20 34 20"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M33.544 25.045C33.848 25.471 34 25.685 34 26C34 26.316 33.848 26.529 33.544 26.955C32.178 28.871 28.689 33 24 33C19.31 33 15.822 28.87 14.456 26.955C14.152 26.529 14 26.315 14 26C14 25.684 14.152 25.471 14.456 25.045C15.822 23.129 19.311 19 24 19C28.69 19 32.178 23.13 33.544 25.045Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M27 26C27 25.2044 26.6839 24.4413 26.1213 23.8787C25.5587 23.3161 24.7956 23 24 23C23.2044 23 22.4413 23.3161 21.8787 23.8787C21.3161 24.4413 21 25.2044 21 26C21 26.7956 21.3161 27.5587 21.8787 28.1213C22.4413 28.6839 23.2044 29 24 29C24.7956 29 25.5587 28.6839 26.1213 28.1213C26.6839 27.5587 27 26.7956 27 26Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="text-gray-400">Total Visitor</p>
        <h1 class="font-semibold text-2xl">{{ summary?.uniqueViews ?? 0 }}</h1>
        <div class="flex flex-row items-center space-x-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.06043 3.49414C5.06043 3.25252 5.25631 3.05664 5.49793 3.05664L10.5054 3.05664C10.6215 3.05664 10.7327 3.10273 10.8148 3.18478C10.8968 3.26683 10.9429 3.37811 10.9429 3.49414L10.9429 8.50164C10.9429 8.74326 10.747 8.93914 10.5054 8.93914C10.2638 8.93914 10.0679 8.74326 10.0679 8.50164L10.0679 3.93164L5.49793 3.93164C5.25631 3.93164 5.06043 3.73577 5.06043 3.49414Z"
              fill="#1A932E"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.18393 10.8152C3.01308 10.6444 3.01308 10.3674 3.18393 10.1965L10.126 3.25448C10.2968 3.08362 10.5738 3.08362 10.7447 3.25448C10.9155 3.42533 10.9155 3.70234 10.7447 3.8732L3.80265 10.8152C3.6318 10.9861 3.35479 10.9861 3.18393 10.8152Z"
              fill="#1A932E"
            />
          </svg>
          <p class="text-xs"></p>
        </div>
      </div>
      <div class="flex flex-col p-8 border border-black rounded-2xl space-y-2">
        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="46" height="46" rx="23" fill="#D398E7" />
          <path
            d="M14 20C14 20 18.477 15 24 15C29.523 15 34 20 34 20"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M33.544 25.045C33.848 25.471 34 25.685 34 26C34 26.316 33.848 26.529 33.544 26.955C32.178 28.871 28.689 33 24 33C19.31 33 15.822 28.87 14.456 26.955C14.152 26.529 14 26.315 14 26C14 25.684 14.152 25.471 14.456 25.045C15.822 23.129 19.311 19 24 19C28.69 19 32.178 23.13 33.544 25.045Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M27 26C27 25.2044 26.6839 24.4413 26.1213 23.8787C25.5587 23.3161 24.7956 23 24 23C23.2044 23 22.4413 23.3161 21.8787 23.8787C21.3161 24.4413 21 25.2044 21 26C21 26.7956 21.3161 27.5587 21.8787 28.1213C22.4413 28.6839 23.2044 29 24 29C24.7956 29 25.5587 28.6839 26.1213 28.1213C26.6839 27.5587 27 26.7956 27 26Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="text-gray-400">Total Views Article</p>
        <h1 class="font-semibold text-2xl">{{ summary?.blogViews ?? 0 }}</h1>
        <div class="flex flex-row items-center space-x-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.06043 3.49414C5.06043 3.25252 5.25631 3.05664 5.49793 3.05664L10.5054 3.05664C10.6215 3.05664 10.7327 3.10273 10.8148 3.18478C10.8968 3.26683 10.9429 3.37811 10.9429 3.49414L10.9429 8.50164C10.9429 8.74326 10.747 8.93914 10.5054 8.93914C10.2638 8.93914 10.0679 8.74326 10.0679 8.50164L10.0679 3.93164L5.49793 3.93164C5.25631 3.93164 5.06043 3.73577 5.06043 3.49414Z"
              fill="#1A932E"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.18393 10.8152C3.01308 10.6444 3.01308 10.3674 3.18393 10.1965L10.126 3.25448C10.2968 3.08362 10.5738 3.08362 10.7447 3.25448C10.9155 3.42533 10.9155 3.70234 10.7447 3.8732L3.80265 10.8152C3.6318 10.9861 3.35479 10.9861 3.18393 10.8152Z"
              fill="#1A932E"
            />
          </svg>
          <p class="text-xs"></p>
        </div>
      </div>
      <div class="flex flex-col p-8 border border-black rounded-2xl space-y-2">
        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="46" height="46" rx="23" fill="#D398E7" />
          <path
            d="M14 20C14 20 18.477 15 24 15C29.523 15 34 20 34 20"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M33.544 25.045C33.848 25.471 34 25.685 34 26C34 26.316 33.848 26.529 33.544 26.955C32.178 28.871 28.689 33 24 33C19.31 33 15.822 28.87 14.456 26.955C14.152 26.529 14 26.315 14 26C14 25.684 14.152 25.471 14.456 25.045C15.822 23.129 19.311 19 24 19C28.69 19 32.178 23.13 33.544 25.045Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M27 26C27 25.2044 26.6839 24.4413 26.1213 23.8787C25.5587 23.3161 24.7956 23 24 23C23.2044 23 22.4413 23.3161 21.8787 23.8787C21.3161 24.4413 21 25.2044 21 26C21 26.7956 21.3161 27.5587 21.8787 28.1213C22.4413 28.6839 23.2044 29 24 29C24.7956 29 25.5587 28.6839 26.1213 28.1213C26.6839 27.5587 27 26.7956 27 26Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="text-gray-400">Total Viewed Portfolio</p>
        <h1 class="font-semibold text-2xl">
          {{ summary?.portfolioViews ?? 0 }}
        </h1>
        <div class="flex flex-row items-center space-x-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.06043 3.49414C5.06043 3.25252 5.25631 3.05664 5.49793 3.05664L10.5054 3.05664C10.6215 3.05664 10.7327 3.10273 10.8148 3.18478C10.8968 3.26683 10.9429 3.37811 10.9429 3.49414L10.9429 8.50164C10.9429 8.74326 10.747 8.93914 10.5054 8.93914C10.2638 8.93914 10.0679 8.74326 10.0679 8.50164L10.0679 3.93164L5.49793 3.93164C5.25631 3.93164 5.06043 3.73577 5.06043 3.49414Z"
              fill="#1A932E"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.18393 10.8152C3.01308 10.6444 3.01308 10.3674 3.18393 10.1965L10.126 3.25448C10.2968 3.08362 10.5738 3.08362 10.7447 3.25448C10.9155 3.42533 10.9155 3.70234 10.7447 3.8732L3.80265 10.8152C3.6318 10.9861 3.35479 10.9861 3.18393 10.8152Z"
              fill="#1A932E"
            />
          </svg>
          <p class="text-xs"></p>
        </div>
      </div>
    </div>

    <div class="flex flex-row w-full px-6 mt-6 gap-3">
      <div
        class="flex flex-col w-2/3 border border-black rounded-xl h-72 text-black p-4"
      >
        <h1 class="font-bold text-2xl text-[#EB5523]">Popular Portfolio</h1>
        <table class="table w-full">
          <thead class="text-black">
            <tr>
              <th>Title</th>
              <th>Created At</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="portfolio in topContent?.portfolios.slice(0, 4)"
              :key="portfolio._id"
            >
              <td>{{ portfolio.title }}</td>
              <td>{{ formatMongoDate(portfolio._id) }}</td>
              <td>{{ portfolio.views.total }}</td>
            </tr>
            <tr v-if="!topContent?.portfolios?.length">
              <td colspan="4" class="text-center py-4">No data available</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex-col w-1/3 border border-black rounded-xl h-72 p-4">
        <h3 class="font-bold text-xl text-[#EB5523] mb-1">Peak portfolios View</h3>
        <bar-portfolio v-if="portfolioBarData" :chart-data="portfolioBarData" :max-data="maxDataPortfolio" />
      </div>
    </div>
    <div class="flex flex-row w-full px-6 mt-6 gap-3">
      <div
        class="flex flex-col w-2/3 border border-black rounded-xl h-72 text-black p-4"
      >
        <h1 class="font-bold text-2xl text-[#EB5523]">Popular Articles</h1>
        <table class="table w-full">
          <thead class="text-black">
            <tr>
              <th>Title</th>
              <th>Created At</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="blog in topContent?.blogs.slice(0, 4)" :key="blog._id">
              <td>{{ blog.title }}</td>
              <td>{{ formatMongoDate(blog._id) }}</td>
              <td>{{ blog.views.total }}</td>
            </tr>
            <tr v-if="!topContent?.blogs?.length">
              <td colspan="4" class="text-center py-4">No data available</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex-col w-1/3 border border-black rounded-xl h-72 p-4">
        <h3 class="font-bold text-xl text-[#EB5523] mb-1">Peak Articles View</h3>
        <bar-portfolio v-if="articleBarData" :chart-data="articleBarData" :max-data="maxDataArticle" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      summary: null,
      topContent: null,
      dailyData: [],
      portfolioBarData: null,
      articleBarData: null,
      maxDataPortfolio: 0,
      maxDataArticle: 0,
    };
  },

  created() {
    this.fetchStatisticData();
  },

  methods: {
    async fetchStatisticData() {
      try {
        const apiUrl = "/api/statistic/";
        const response = await this.$api.get(apiUrl);
        console.log("Data statistic berhasil diambil:", response.data);

        const apiData = response.data.data;
        this.summary = apiData.summary;
        this.topContent = apiData.topContent;
        this.dailyData = apiData.dailyData;

        this.dailyData.forEach((item) => {
          const date = new Date(item.date);
          item.date =
            date
              .toLocaleDateString("en-US", { weekday: "short" })
              .charAt(0)
              .toLocaleUpperCase() +
            date.toLocaleDateString("en-US", { weekday: "short" }).slice(1);
          console.log("Formatted date:", item.date);
        });

        this.portfolioBarData = {
          labels: this.dailyData.map((item) => item.date),
          datasets: [
            {
              label: "Total Views",
              backgroundColor: "#00B4D8",
              borderRadius: 100,
              borderSkipped: false,
              barThickness: 20,
              data: this.dailyData.map((item) => item.portfolioViews || 0),
            },
          ],
        };
        const maxPortfolio = Math.max(...(this.portfolioBarData?.datasets[0]?.data || [0]));
        this.maxDataPortfolio = maxPortfolio > 4 ? Math.ceil(maxPortfolio) + 1 : 4;
        console.log("Max data portfolio:", this.maxDataPortfolio);

        this.articleBarData = {
          labels: this.dailyData.map((item) => item.date),
          datasets: [
            {
              label: "Total Views",
              backgroundColor: "#00B4D8",
              borderRadius: 100,
              borderSkipped: false,
              barThickness: 20,
              data: this.dailyData.map((item) => item.blogViews || 0),
            },
          ],
        };
        const maxArticle = Math.max(...(this.articleBarData?.datasets[0]?.data || [0]));
        this.maxDataArticle = maxArticle > 4 ? Math.ceil(maxArticle) + 1 : 4;
      } catch (error) {
        console.error("Gagal mengambil data statistic:", error);
      }
    },

    formatMongoDate(objectId) {
      if (!objectId || objectId.length < 8) return "Invalid Date";
      const timestamp = parseInt(objectId.substring(0, 8), 16) * 1000;
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
};

definePageMeta({
  layout: "admin",
});
</script>
