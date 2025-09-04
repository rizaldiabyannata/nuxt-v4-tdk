<template>
  <div class="card bg-base-100 w-full shadow-lg rounded-2xl overflow-hidden aspect-3/4">
    <div class="card-body bg-white rounded-t-2xl p-6 h-[60%] flex flex-col">
      <h2
        id="title"
        class="card-title text-black text-xl font-bold"
      >
        {{ title }}
      </h2>
      <!-- <p id="shortDescription" class="text-black text-sm sm:text-base mt-1">{{ shortDescription }}</p> -->
      <p id="shortDescription" class="text-base mt-2">
        {{
          shortDescription.length > 100
            ? shortDescription.substring(0, 100) + "..."
            : shortDescription
        }}
      </p>
      <div class="card-actions justify-start mt-auto pt-4">
        <NuxtLink
          :to="`/portfolio/${slug}`"
          class="btn btn-md rounded-full bg-gray-200 hover:bg-gray-300 text-black transition-colors"
        >
          More Details
        </NuxtLink>
      </div>
    </div>

    <figure class="h-[40%] mt-2">
      <img
        crossorigin="anonymous"
        id="image"
        :src="imageUrl"
        alt="Product Image"
        class="w-full h-auto object-cover"
      />
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
      default:
        "A card component has a figure, a body part, and inside body there are title and actions parts.",
    },
    imageUrl: {
      type: String,
      default:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    slug: {
      type: String,
    },
  },
};
</script>
