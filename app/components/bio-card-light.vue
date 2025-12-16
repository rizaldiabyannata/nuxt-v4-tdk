<template>
  <div
    ref="card"
    class="flex flex-col sm:flex-row w-full bg-gray-100 justify-center items-center px-3 py-4 sm:px-4 sm:py-3 md:px-6 md:py-4 min-h-fit shadow-lg shadow-gray-300 rounded-xl transition-all duration-300 gap-3 sm:gap-4 hover:shadow-xl"
  >
    <div class="w-32 h-32 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0 rounded-md">
      <img
        :src="image"
        class="w-full h-full object-cover rounded-md"
        :alt="name"
        loading="lazy"
        placeholder
      />
    </div>
    <div class="flex flex-col justify-center w-full text-gray-800 min-w-0">
      <h1 class="text-[#EB5523] font-semibold text-base sm:text-xs md:text-xl">{{ name }}</h1>
      <p class="text-gray-700 text-xs sm:text-sm md:text-base">{{ title }}</p>
      <hr class="border-gray-400 w-20 sm:w-24 mt-2" />
      <p class="text-justify pt-3 text-gray-600 text-xs sm:text-xs md:text-sm line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
        {{ shortDescription || 'Profesional berpengalaman dengan dedikasi tinggi terhadap pengembangan bisnis dan kepemimpinan organisasi yang berkelanjutan.' }}
      </p>
      <div v-if="socialMedia && socialMedia.length > 0" class="flex flex-row space-x-2 sm:space-x-3 pt-2">
        <a
          v-for="social in socialMedia"
          :key="social.platform"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-[#EB5523] transition-colors cursor-pointer group"
        >
          <!-- Facebook -->
          <svg
            v-if="social.platform.toLowerCase() === 'facebook'"
            width="11"
            height="20"
            viewBox="0 0 11 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="group-hover:fill-white fill-gray-600"
          >
            <path
              d="M7 11.5H9.5L10.5 7.5H7V5.5C7 4.47 7 3.5 9 3.5H10.5V0.14C10.174 0.0970001 8.943 0 7.643 0C4.928 0 3 1.657 3 4.7V7.5H0V11.5H3V20H7V11.5Z"
              class="group-hover:fill-white fill-gray-600"
            />
          </svg>

          <!-- Instagram -->
          <svg
            v-else-if="social.platform.toLowerCase() === 'instagram'"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 17.7383 21.3889 19.2135 20.3012 20.3012C19.2135 21.3889 17.7383 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 6.26174 2.61107 4.78649 3.69878 3.69878C4.78649 2.61107 6.26174 2 7.8 2ZM7.6 4C6.64522 4 5.72955 4.37928 5.05442 5.05442C4.37928 5.72955 4 6.64522 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C17.3548 20 18.2705 19.6207 18.9456 18.9456C19.6207 18.2705 20 17.3548 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.5815 5.5 17.8995 5.6317 18.1339 5.86612C18.3683 6.10054 18.5 6.41848 18.5 6.75C18.5 7.08152 18.3683 7.39946 18.1339 7.63388C17.8995 7.8683 17.5815 8 17.25 8C16.9185 8 16.6005 7.8683 16.3661 7.63388C16.1317 7.39946 16 7.08152 16 6.75C16 6.41848 16.1317 6.10054 16.3661 5.86612C16.6005 5.6317 16.9185 5.5 17.25 5.5ZM12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z"
              class="group-hover:fill-white fill-gray-600"
            />
          </svg>

          <!-- Twitter/X -->
          <svg
            v-else-if="social.platform.toLowerCase() === 'twitter' || social.platform.toLowerCase() === 'x'"
            width="18"
            height="18"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_twitter"
              style="mask-type: luminance"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="14"
              height="14"
            >
              <path d="M0 0H14V14H0V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_twitter)">
              <path
                d="M11.025 0.656006H13.172L8.482 6.03001L14 13.344H9.68L6.294 8.90901L2.424 13.344H0.275L5.291 7.59401L0 0.657006H4.43L7.486 4.71001L11.025 0.656006ZM10.27 12.056H11.46L3.78 1.87701H2.504L10.27 12.056Z"
                class="group-hover:fill-white fill-gray-600"
              />
            </g>
          </svg>

          <!-- LinkedIn -->
          <svg
            v-else-if="social.platform.toLowerCase() === 'linkedin'"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
              class="group-hover:fill-white fill-gray-600"
            />
            <path
              d="M4 10V20"
              class="group-hover:stroke-white stroke-gray-600"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 10V20"
              class="group-hover:stroke-white stroke-gray-600"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 15C10 12.24 12.24 10 15 10C17.76 10 20 12.24 20 15V20"
              class="group-hover:stroke-white stroke-gray-600"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <!-- YouTube -->
          <svg
            v-else-if="social.platform.toLowerCase() === 'youtube'"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
              class="group-hover:fill-white fill-gray-600"
            />
          </svg>

          <!-- TikTok -->
          <svg
            v-else-if="social.platform.toLowerCase() === 'tiktok'"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
              class="group-hover:fill-white fill-gray-600"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import { gsap } from "gsap";

// Define the props that this component expects to receive
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "/img/Alireza.jpg",
  },
  shortDescription: {
    type: String,
    default: "",
  },
  socialMedia: {
    type: Array,
    default: () => [],
  },
});

const card = ref(null);

onMounted(() => {
  if (card.value) {
    const tl = gsap.timeline({ paused: true });
    tl.to(card.value, {
      scale: 1.05,
      boxShadow: "0px 15px 30px rgba(0,0,0,0.15)",
      duration: 0.3,
      ease: "power2.out",
    });
    card.value.addEventListener("mouseenter", () => tl.play());
    card.value.addEventListener("mouseleave", () => tl.reverse());
  }
});
</script>
