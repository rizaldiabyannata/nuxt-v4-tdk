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
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="46" height="46" rx="23" fill="#D398E7" />
          <path d="M14 20C14 20 18.477 15 24 15C29.523 15 34 20 34 20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="46" height="46" rx="23" fill="#D398E7" />
          <path d="M14 20C14 20 18.477 15 24 15C29.523 15 34 20 34 20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <!-- <div class="flex flex-col p-8 border border-black rounded-2xl space-y-2">
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="46" height="46" rx="23" fill="#D398E7" />
          <path
            d="M24.481 14C24.0381 14.0026 23.6075 14.1457 23.2513 14.4088C22.8951 14.672 22.6316 15.0415 22.499 15.464L21.697 17.955C21.6079 18.238 21.4569 18.4976 21.255 18.715C20.6429 19.378 20.1284 20.1249 19.727 20.933H19.075C18.7716 20.5131 18.3325 20.2107 17.832 20.077C17.543 19.999 17.215 20 16.834 20H16.666C16.286 20 15.956 20 15.668 20.077C15.2866 20.1791 14.9388 20.3798 14.6596 20.6589C14.3803 20.938 14.1794 21.2857 14.077 21.667C13.999 21.957 14 22.285 14 22.667V28.834C14 29.214 14 29.544 14.077 29.832C14.1791 30.2134 14.3798 30.5612 14.6589 30.8404C14.938 31.1197 15.2857 31.3206 15.667 31.423C15.957 31.501 16.285 31.501 16.667 31.5H16.834C17.214 31.5 17.544 31.5 17.832 31.423C18.3594 31.2819 18.8175 30.9539 19.121 30.5H25.75C27.091 30.5 28.006 30.442 28.734 30.133C29.3606 29.8659 29.9056 29.4382 30.314 28.893C30.779 28.275 30.994 27.467 31.313 26.271L31.353 26.123L32.044 23.756L32.054 23.726C32.214 23.192 32.347 22.746 32.424 22.376C32.502 21.997 32.54 21.612 32.439 21.226C32.2925 20.6576 31.9387 20.1646 31.447 19.844C31.108 19.625 30.73 19.548 30.349 19.513C29.982 19.479 29.526 19.479 28.985 19.479H26.683C27.216 17.784 27.041 16.413 26.753 15.502C26.42 14.444 25.411 14 24.532 14H24.481ZM19.501 29V22.666L19.5 22.433H20.682L20.976 21.797C21.3258 21.0414 21.7914 20.345 22.356 19.733C22.706 19.356 22.967 18.905 23.126 18.414L23.926 15.924C23.9613 15.8034 24.0342 15.6973 24.134 15.6211C24.2338 15.5448 24.3554 15.5024 24.481 15.5H24.532C24.982 15.5 25.246 15.71 25.323 15.954C25.569 16.733 25.747 18.104 24.907 19.913C24.8539 20.0273 24.8305 20.1531 24.8388 20.2788C24.8472 20.4045 24.8871 20.5261 24.9549 20.6323C25.0226 20.7386 25.1161 20.826 25.2266 20.8866C25.337 20.9472 25.461 20.979 25.587 20.979H28.951C29.535 20.979 29.921 20.979 30.211 21.006C30.496 21.033 30.591 21.078 30.632 21.104C30.803 21.214 30.932 21.391 30.988 21.604C31.003 21.662 31.015 21.781 30.954 22.074C30.894 22.37 30.779 22.754 30.607 23.328L30.605 23.333L29.907 25.719L29.905 25.727C29.528 27.14 29.382 27.637 29.115 27.992C28.8652 28.326 28.5316 28.5882 28.148 28.752C27.739 28.925 27.122 29 25.75 29H19.501ZM16.056 21.525C16.127 21.506 16.236 21.5 16.75 21.5C17.263 21.5 17.373 21.506 17.444 21.525C17.5711 21.5591 17.6869 21.626 17.78 21.719C17.873 21.8121 17.9399 21.9279 17.974 22.055C17.994 22.127 18 22.237 18 22.75V28.75C18 29.263 17.994 29.373 17.975 29.444C17.9409 29.5711 17.874 29.6869 17.781 29.78C17.6879 29.873 17.5721 29.9399 17.445 29.974C17.373 29.994 17.263 30 16.75 30C16.237 30 16.127 29.994 16.056 29.974C15.9289 29.9399 15.8131 29.873 15.72 29.78C15.627 29.6869 15.5601 29.5711 15.526 29.444C15.506 29.373 15.5 29.264 15.5 28.75V22.75C15.5 22.237 15.507 22.127 15.526 22.056C15.5601 21.9289 15.627 21.8131 15.72 21.72C15.8131 21.627 15.9289 21.5601 16.056 21.526"
            fill="white"
          />
        </svg>
        <p class="text-gray-400">Total Liked Article</p>
        <h1 class="font-semibold text-2xl">N/A</h1>
        <div class="flex flex-row items-center space-x-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      </div> -->
      <div class="flex flex-col p-8 border border-black rounded-2xl space-y-2">
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="46" height="46" rx="23" fill="#D398E7" />
          <path d="M14 20C14 20 18.477 15 24 15C29.523 15 34 20 34 20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
        <h1 class="font-semibold text-2xl">{{ summary?.portfolioViews ?? 0 }}</h1>
        <div class="flex flex-row items-center space-x-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <div class="flex flex-col w-2/3 border border-black rounded-xl h-72 text-black p-4">
        <h1 class="font-bold text-2xl text-[#EB5523]">Popular Portfolio</h1>
        <table class="table w-full">
          <thead class="text-black">
            <tr>
              <th>Title</th>
              <th>Created At</th>
              <th>Views</th>
              <th>Liked</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="portfolio in topContent?.portfolios" :key="portfolio._id">
              <td>{{ portfolio.title }}</td>
              <td>{{ formatMongoDate(portfolio._id) }}</td>
              <td>{{ portfolio.views.total }}</td>
              <td>N/A</td>
            </tr>
            <tr v-if="!topContent?.portfolios?.length">
              <td colspan="4" class="text-center py-4">No data available</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex w-1/3 border border-black rounded-xl h-72 p-4">
        <bar-portfolio />
      </div>
    </div>
    <div class="flex flex-row w-full px-6 mt-6 gap-3">
      <div class="flex flex-col w-2/3 border border-black rounded-xl h-72 text-black p-4">
        <h1 class="font-bold text-2xl text-[#EB5523]">Popular Articles</h1>
        <table class="table w-full">
          <thead class="text-black">
            <tr>
              <th>Title</th>
              <th>Created At</th>
              <th>Views</th>
              <th>Liked</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="blog in topContent?.blogs" :key="blog._id">
              <td>{{ blog.title }}</td>
              <td>{{ formatMongoDate(blog._id) }}</td>
              <td>{{ blog.views.total }}</td>
              <td>N/A</td>
            </tr>
            <tr v-if="!topContent?.blogs?.length">
              <td colspan="4" class="text-center py-4">No data available</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex w-1/3 border border-black rounded-xl h-72 p-4">
        <bar-portfolio />
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from "chart.js";

export default {
  data() {
    return {
      summary: null,
      topContent: null,
      dailyData: [],
    };
  },

  created() {
    this.fetchStatisticData();
  },

  methods: {
    async fetchStatisticData() {
      try {
        const apiUrl = "/statistic/";
        const response = await this.$api.get(apiUrl);
        console.log("Data statistic berhasil diambil:", response.data);

        const apiData = response.data.data;
        this.summary = apiData.summary;
        this.topContent = apiData.topContent;
        this.dailyData = apiData.dailyData;
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
