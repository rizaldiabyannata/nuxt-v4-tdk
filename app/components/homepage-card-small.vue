<template>
  <div
    ref="card"
    class="card bg-base-100 image-full w-full shadow-xl rounded-2xl ratio-square transition-all duration-300"
  >
    <figure>
      <img
        :src="imageUrl"
        crossorigin="anonymous"
        alt="Shoes"
        class="object-cover aspect-square"
      />
    </figure>
    <div class="card-body px-4 sm:px-6 gap-1 sm:gap-2">
      <h2 class="card-title text-lg sm:text-xl md:text-2xl">{{ title }}</h2>
      <p class="text-xs sm:text-sm mt-1 sm:mt-2">
        {{ shortDescription }}
      </p>
      <div class="card-actions justify-end mt-4 sm:mt-6">
        <NuxtLink :to="navigateTO">
          <button
            class="btn btn-sm sm:btn-md rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
          >
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
    navigateTO: {
      type: String,
      default: "#",
    },
  },
  mounted() {
    const gsap = this.$gsap;
    const card = this.$refs.card;
    if (card) {
      const tl = gsap.timeline({ paused: true });
      tl.to(card, {
        scale: 1.05,
        boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
        duration: 0.3,
        ease: "power2.out",
      });

      card.addEventListener("mouseenter", () => tl.play());
      card.addEventListener("mouseleave", () => tl.reverse());
    }
  },
};
</script>
