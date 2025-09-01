<template>
  <div v-if="portfolio">
    <div class="relative min-h-[300px] h-[50vh] flex flex-col">
      <div
        crossorigin="anonymous"
        class="absolute inset-0 bg-cover bg-center brightness-50 -z-10"
        :style="{ backgroundImage: `url(${portfolio.coverImage})` }"
      ></div>
      <div
        class="relative space-y-2 w-full lg:w-1/2 flex flex-col h-full justify-center p-4 sm:p-6 md:p-8"
      >
        <h1
          class="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white"
        >
          {{ portfolio.title }}
        </h1>
        <p class="text-white text-sm sm:text-base md:text-lg">
          By {{ portfolio.author || "PT. Total Desain Konsultan" }}
        </p>
      </div>
    </div>
    <div class="w-full flex flex-col lg:flex-row bg-white p-4 sm:p-6 md:p-8">
      <PortoTemplate
        :firstParagraph="portfolio.summary"
        :image="portfolio.coverImage"
        :secondParagraph="portfolio.description"
      />
    </div>
  </div>
  <div v-else class="text-center p-8">
    <p class="text-lg text-gray-600">Loading portfolio preview...</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watchEffect } from "vue";

const route = useRoute();
const portfolio = ref(null);

watchEffect(() => {
  if (route.query) {
    portfolio.value = {
      title: route.query.title || "Untitled",
      summary: route.query.shortDescription || "",
      description: route.query.description || "",
      coverImage: route.query.coverImage || "/img/placeholder.png",
      author: "PT. Total Desain Konsultan",
    };
  }
});
</script>
