<template>
  <div class="card bg-base-100 image-full w-full shadow-xl rounded-2xl">
    <figure>
      <img :src="imageUrl" alt="Shoes" class="object-cover w-full h-full" />
    </figure>
    <div class="card-body p-4 sm:p-6">
      <h2 class="card-title text-lg sm:text-xl md:text-2xl">{{ title }}</h2>
      <p class="text-xs sm:text-sm mt-1 sm:mt-2">
        {{ shortDescription }}
      </p>
      <div class="card-actions justify-end mt-4 sm:mt-6">
        <NuxtLink :to="navigateTO">
          <button class="btn btn-sm sm:btn-md rounded-full bg-white text-black hover:bg-gray-200 transition-colors">
            More Details
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Card Title'
    },
    shortDescription: {
      type: String,
      default: 'A card component has a figure, a body part, and inside body there are title and actions parts.'
    },
    imageUrl: {
      type: String,
      default: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
    },
    navigateTO: {
      type: String,
      default: '#'
    }
  }
}
</script>
