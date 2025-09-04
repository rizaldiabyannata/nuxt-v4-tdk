<template>
  <div class="card bg-base-100 w-full shadow-lg rounded-2xl overflow-hidden flex flex-col">
    <div class="card-body bg-white rounded-t-2xl p-4 sm:p-6 h-1/2">
      <h2 id="title" class="card-title text-black text-xl sm:text-3xl">
        {{ title }}
      </h2>
      <!-- <p id="shortDescription" class="text-black text-sm sm:text-base mt-1">{{ shortDescription }}</p> -->
      <p id="shortDescription" class="text-black text-sm sm:text-xl mt-1">
        {{ shortDescription.length > 100 ? shortDescription.substring(0, 100) + "..." : shortDescription }}
      </p>

      <div class="card-actions justify-start my-2">
        <NuxtLink :to="`/portfolio/${slug}`" class="btn btn-sm sm:btn-md rounded-full bg-gray-200 hover:bg-gray-300 text-black transition-colors"> More Details </NuxtLink>
      </div>
    </div>

    <figure class="h-1/2">
      <img crossorigin="anonymous" id="image" :src="imageUrl" alt="Product Image" class="w-full h-full object-cover" />
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Card Title",
    },
    shortDescription: {
      type: String,
      default: "A card component has a figure, a body part, and inside body there are title and actions parts.",
    },
    imageUrl: {
      type: String,
      default: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    slug: {
      type: String,
    },
  },
};
</script>
