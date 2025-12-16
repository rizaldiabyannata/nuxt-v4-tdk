<template>
  <div class="logos group bg-white relative overflow-hidden whitespace-nowrap py-12">
    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center items-center h-16">
      <span class="loading loading-dots loading-lg text-gray-400"></span>
    </div>

    <!-- Empty State -->
    <div v-else-if="!sponsorships || sponsorships.length === 0" class="text-center text-gray-400 py-4">
      <!-- Optional: Hide section or show placeholder -->
    </div>

    <!-- Marquee Content -->
    <div v-else class="relative flex overflow-hidden">
      <!-- 
        We need two identical sets of logos for the seamless loop effect.
        The animation moves the container to the left by 50% (width of one set).
      -->
      <div 
        class="animate-marquee flex items-center"
        :style="{ animationDuration: duration + 's' }"
      >
        <!-- First Set -->
        <div class="flex items-center shrink-0">
          <a
            v-for="item in displaySponsorships"
            :key="`set1-${item._id}`"
            :href="getExternalLink(item.websiteLink)"
            target="_blank"
            rel="noopener noreferrer"
            class="mx-8 sm:mx-12 md:mx-16 transition-transform hover:scale-110 duration-300 block"
          >
            <img
              :src="getImageUrl(item.logoUrl)"
              :alt="item.name"
              class="h-12 sm:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              loading="lazy"
            />
          </a>
        </div>

        <!-- Second Set (Duplicate for Loop) -->
        <div class="flex items-center shrink-0">
          <a
            v-for="item in displaySponsorships"
            :key="`set2-${item._id}`"
            :href="getExternalLink(item.websiteLink)"
            target="_blank"
            rel="noopener noreferrer"
            class="mx-8 sm:mx-12 md:mx-16 transition-transform hover:scale-110 duration-300 block"
          >
            <img
              :src="getImageUrl(item.logoUrl)"
              :alt="item.name"
              class="h-12 sm:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const { $api } = useNuxtApp()
const { $getImageUrl } = useNuxtApp()

// Helper for image URL (using plugin logic)
const getImageUrl = (path) => {
  return $getImageUrl ? $getImageUrl(path) : path
}

// Fetch sponsorships
const { data: sponsorships, pending } = useAsyncData('sponsorships-marquee', async () => {
  try {
    const res = await $api.get('/api/sponsorships')
    // Handle different response structures
    if (Array.isArray(res.data)) return res.data
    if (res.data && Array.isArray(res.data.data)) return res.data.data
    return []
  } catch (err) {
    console.error('Failed to fetch sponsorships:', err)
    return []
  }
})

// Helper to ensure external link
const getExternalLink = (url) => {
  if (!url) return '#'
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `https://${url}`
}

// Computed property to handle small number of items
// If items are few, we duplicate them enough times to fill the screen width for a smooth marquee
const displaySponsorships = computed(() => {
  const items = sponsorships.value || []
  if (items.length === 0) return []
  
  // If we have very few items (e.g., 1-3), duplicate them to ensure the marquee looks good
  // and covers enough width before repeating.
  if (items.length < 4) {
    // Repeat items to have at least 6-8 items in the list
    const multiplier = Math.ceil(6 / items.length)
    return Array(multiplier).fill(items).flat()
  }
  
  return items
})

// Dynamic duration based on number of items to keep speed consistent
const duration = computed(() => {
  const count = displaySponsorships.value.length
  // Base speed: 5 seconds per item roughly, but adjustable
  // Minimum 20s for smoothness
  return Math.max(20, count * 4)
})
</script>

<style scoped>
.animate-marquee {
  animation: marquee linear infinite;
}

/* Pause animation on hover for better UX */
.animate-marquee:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%); /* Move by half the total width (one full set) */
  }
}
</style>
