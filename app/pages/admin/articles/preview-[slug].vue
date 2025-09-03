<template>
  <div class="w-full flex flex-col px-4 sm:px-8 text-justify py-6 sm:py-10 md:py-12 space-y-10 text-black text-base sm:text-lg md:text-xl lg:text-2xl">
    <div class="relative flex min-h-[300px] h-[50vh] flex flex-col">
      <div class="absolute inset-0 bg-cover bg-center brightness-50 -z-10" :style="{ backgroundImage: `url(${article.coverImage})`}"></div>
      <div class="relative space-y-2 w-full  flex flex-col h-full justify-center p-4 sm:p-6 md:p-8">
        <h1 class="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-5xl ">
          {{ article.title }}
        </h1>
        <p class="text-sm sm:text-base md:text-lg">By {{ article.author || "PT. Total Desain Konsultan" }}</p>
      </div>
    </div>
    <!-- <p>
      {{ firstParagraph }}
    </p> -->
    <div class="flex justify-center w-full">
      <img crossorigin="anonymous" :src="article.coverImage" alt="" class="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl rounded-lg shadow-md object-cover " />
    </div>
    <div class="w-full px-2 sm:px-4 md:px-8">
      <div v-html="article.content" class="prose prose-sm sm:prose lg:prose-lg max-w-none break-words tiptap-content-view"></div>
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

