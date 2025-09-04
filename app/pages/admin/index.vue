<template>
  <div class="flex flex-col bg-white space-y-8">
    <div class="flex flex-row w-full justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
      <logout-component />
    </div>

    <hr class="border-gray-200" />

    <div>
      <h2 class="text-xl font-semibold text-gray-700">Overview</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black mt-4">
        <!-- Total Visitor Card -->
        <div class="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          </div>
          <p class="text-gray-500 font-medium">Total Visitor</p>
          <h3 class="font-semibold text-3xl">{{ summary?.uniqueViews ?? 0 }}</h3>
        </div>
        <!-- Total Views Article Card -->
        <div class="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <p class="text-gray-500 font-medium">Total Views Article</p>
          <h3 class="font-semibold text-3xl">{{ summary?.blogViews ?? 0 }}</h3>
        </div>
        <!-- Total Viewed Portfolio Card -->
        <div class="flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
          </div>
          <p class="text-gray-500 font-medium">Total Viewed Portfolio</p>
          <h3 class="font-semibold text-3xl">{{ summary?.portfolioViews ?? 0 }}</h3>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 flex flex-col border bg-white border-gray-200 rounded-lg shadow-sm h-96">
        <div class="p-4 border-b border-gray-200">
          <h3 class="font-semibold text-xl text-gray-800">Popular Portfolios</h3>
        </div>
        <div class="flex-grow overflow-auto p-4">
          <table class="table w-full">
            <thead class="text-gray-600">
              <tr>
                <th class="text-left font-medium">Title</th>
                <th class="text-left font-medium">Created At</th>
                <th class="text-left font-medium">Views</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="portfolio in topContent?.portfolios.slice(0, 5)" :key="portfolio._id" class="border-b border-gray-100">
                <td class="py-3">{{ portfolio.title }}</td>
                <td class="py-3">{{ formatMongoDate(portfolio._id) }}</td>
                <td class="py-3">{{ portfolio.views.total }}</td>
              </tr>
              <tr v-if="!topContent?.portfolios?.length">
                <td colspan="3" class="text-center py-8 text-gray-500">No data available</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex flex-col border bg-white border-gray-200 rounded-lg shadow-sm h-96 p-4">
        <h3 class="font-semibold text-xl text-gray-800 mb-4">Portfolio Views (Last 7 Days)</h3>
        <div class="flex-grow">
          <bar-portfolio v-if="portfolioBarData" :chart-data="portfolioBarData" :max-data="maxDataPortfolio" />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 flex flex-col border bg-white border-gray-200 rounded-lg shadow-sm h-96">
        <div class="p-4 border-b border-gray-200">
          <h3 class="font-semibold text-xl text-gray-800">Popular Articles</h3>
        </div>
        <div class="flex-grow overflow-auto p-4">
          <table class="table w-full">
            <thead class="text-gray-600">
              <tr>
                <th class="text-left font-medium">Title</th>
                <th class="text-left font-medium">Created At</th>
                <th class="text-left font-medium">Views</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="blog in topContent?.blogs.slice(0, 5)" :key="blog._id" class="border-b border-gray-100">
                <td class="py-3">{{ blog.title }}</td>
                <td class="py-3">{{ formatMongoDate(blog._id) }}</td>
                <td class="py-3">{{ blog.views.total }}</td>
              </tr>
              <tr v-if="!topContent?.blogs?.length">
                <td colspan="3" class="text-center py-8 text-gray-500">No data available</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex flex-col border bg-white border-gray-200 rounded-lg shadow-sm h-96 p-4">
        <h3 class="font-semibold text-xl text-gray-800 mb-4">Article Views (Last 7 Days)</h3>
        <div class="flex-grow">
          <bar-portfolio v-if="articleBarData" :chart-data="articleBarData" :max-data="maxDataArticle" />
        </div>
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
              backgroundColor: "#8b5cf6",
              borderRadius: 6,
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
              backgroundColor: "#3b82f6",
              borderRadius: 6,
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
