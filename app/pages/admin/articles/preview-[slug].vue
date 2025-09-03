<template>
  <div v-if="article">
    <div class="relative min-h-[300px] h-[50vh] flex flex-col">
      <div
        crossorigin="anonymous"
        class="absolute inset-0 bg-cover bg-center brightness-50 -z-10"
        :style="{ backgroundImage: `url(${article.coverImage})` }"
      ></div>
      <div
        class="relative space-y-2 w-full lg:w-1/2 flex flex-col h-full justify-center p-4 sm:p-6 md:p-8"
      >
        <h1
          class="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white"
        >
          {{ article.title }}
        </h1>
        <p class="text-white text-sm sm:text-base md:text-lg">
          By {{ article.author || "PT. Total Desain Konsultan" }}
        </p>
      </div>
    </div>
    <div class="w-full flex flex-col lg:flex-row bg-white p-4 sm:p-6 md:p-8">
      <article-template
        :image="article.coverImage"
        :secondParagraph="article.content"
      ></article-template>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watchEffect } from "vue";

const route = useRoute();
const article = ref(null);

watchEffect(() => {
  if (route.query) {
    article.value = {
      title: route.query.title || "Untitled",
      content: route.query.content || "",
      coverImage: route.query.coverImage || "/img/placeholder.png",
      author: "PT. Total Desain Konsultan",
    };
  }
});
</script>
