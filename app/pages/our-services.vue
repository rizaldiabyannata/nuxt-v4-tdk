<template>
  <div
    ref="heroSection"
    class="relative min-h-screen flex flex-col justify-center px-4 py-16 sm:px-8 sm:py-24 pt-24 md:pt-16"
  >
    <img
      src="/img/sample/sample-5.jpeg"
      class="absolute inset-0 w-full h-full object-cover brightness-50 -z-10"
      alt="Services background"
      loading="lazy"
    />

    <div class="relative flex flex-col grow w-full justify-center">
      <div class="flex flex-col w-full md:w-1/2 justify-center items-start">
        <h1 class="font-bold text-3xl md:text-4xl text-white">
          Solusi Inovatif untuk Setiap Proyek Anda
        </h1>
        <p class="mt-4 text-base lg:text-lg text-white">
          Kami memanfaatkan teknologi canggih dan praktik modern untuk
          memberikan layanan perencanaan dan supervisi terbaik. Tim profesional
          kami yang berpengalaman menggabungkan keahlian teknis dengan komitmen
          terhadap keunggulan, memastikan setiap proyek memenuhi standar
          kualitas dan keberlanjutan tertinggi.
        </p>
      </div>
      <a
        href=""
        class="group flex flex-row w-fit border-white border rounded-full px-4 py-2 mt-8 text-sm items-center space-x-2 hover:bg-white transition-colors"
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.1969 10.625H1.625C1.30625 10.625 1.03925 10.517 0.824004 10.301C0.608754 10.085 0.500754 9.818 0.500004 9.5C0.499254 9.182 0.607254 8.915 0.824004 8.699C1.04075 8.483 1.30775 8.375 1.625 8.375H14.1969L8.68437 2.8625C8.45937 2.6375 8.35138 2.375 8.36038 2.075C8.36938 1.775 8.48675 1.5125 8.7125 1.2875C8.9375 1.08125 9.2 0.973246 9.5 0.963496C9.8 0.953746 10.0625 1.06175 10.2875 1.2875L17.7125 8.7125C17.825 8.825 17.9049 8.94687 17.9521 9.07812C17.9994 9.20937 18.0226 9.35 18.0219 9.5C18.0211 9.65 17.9979 9.79062 17.9521 9.92187C17.9064 10.0531 17.8265 10.175 17.7125 10.2875L10.2875 17.7125C10.0813 17.9187 9.82362 18.0219 9.51462 18.0219C9.20563 18.0219 8.93825 17.9187 8.7125 17.7125C8.4875 17.4875 8.375 17.2205 8.375 16.9115C8.375 16.6025 8.4875 16.3351 8.7125 16.1094L14.1969 10.625Z"
            fill="#EB5523"
          />
        </svg>
        <p class="font-semibold text-white group-hover:text-black">
          Our Services
        </p>
      </a>
    </div>
  </div>

  <div
    ref="servicesSection"
    class="max-w-screen min-h-screen flex flex-col justify-center px-4 py-16 sm:px-8 sm:py-24 space-y-8 bg-gray-50"
  >
    <div class="flex flex-col w-full max-w-6xl mx-auto">
      <p class="text-2xl md:text-3xl font-semibold text-gray-600">
        Our Services
      </p>
      <h1 class="text-4xl md:text-5xl font-bold text-[#EB5523] mt-2">
        What We Offer
      </h1>
    </div>
    <div
      class="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6 lg:gap-8 w-full max-w-6xl mx-auto"
    >
      <div v-if="pending" class="col-span-full">
        <p class="text-center text-gray-500">Loading services...</p>
      </div>
      <div v-else-if="services.length === 0" class="col-span-full">
        <p class="text-center text-gray-500">No services available.</p>
      </div>
      <template v-else>
        <services-card
          v-for="service in services"
          :key="service._id"
          :title="service.title"
          :list="service.list"
          :image="service.image"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { getImageUrl } from "@/composables/useImage";

const { $api, $gsap } = useNuxtApp();

// State
const services = ref([]);
const pending = ref(false);
const error = ref(null);

// Refs for animations
const heroSection = ref(null);
const servicesSection = ref(null);

// Fetch services dari backend
async function fetchServices() {
  pending.value = true;
  error.value = null;
  
  try {
    console.log("🚀 Starting fetch services...");
    const response = await $api.get("/api/services");
    console.log("🔍 Raw services response:", response.data);
    
    const input = response.data;
    
    if (!input || !Array.isArray(input)) {
      console.warn("⚠️ Services data is not an array:", input);
      services.value = [];
      return;
    }
    
    console.log("📦 Services count:", input.length);
    
    // Map to display format with robust normalization (sama seperti work-scope admin)
    services.value = input.map((item) => {
      console.log("🔧 Processing service:", item.title);
      console.log("  - Raw list:", item.list);
      
      // Normalize list: can be array or a JSON/string from backend
      let normalizedList = []
      const rawList = item?.list
      
      if (Array.isArray(rawList)) {
        // Handle cases where backend returns ["item1","item2"] correctly,
        // and also cases like ["[\"item1\",\"item2\"]"] (stringified inside array)
        normalizedList = rawList.flatMap((entry) => {
          if (typeof entry !== 'string') return []
          const e = entry.trim()
          // Try parse JSON array within string element
          if ((e.startsWith('[') && e.endsWith(']')) || (e.startsWith('"[') && e.endsWith(']"'))) {
            try {
              const parsedInner = JSON.parse(e.replace(/^\"|\"$/g, ''))
              if (Array.isArray(parsedInner)) {
                return parsedInner.filter(v => typeof v === 'string').map(v => v.trim()).filter(Boolean)
              }
            } catch (_) {
              // fallthrough to splitting
            }
          }
          // Fallback split by common separators/newlines
          return e
            .split(/\r?\n|\s*","\s*|\||,|;|·|•/)
            .map(v => v.replace(/^\s*"|"\s*$/g, '').trim())
            .filter(Boolean)
        })
      } else if (typeof rawList === 'string') {
        const s = rawList.trim()
        // Preferred: try JSON.parse directly
        let parsed = null
        try {
          parsed = JSON.parse(s)
        } catch (_) {
          parsed = null
        }
        if (Array.isArray(parsed)) {
          normalizedList = parsed.filter(v => typeof v === 'string').map(v => v.trim()).filter(Boolean)
        } else {
          // Fallback: remove wrapping brackets then split by common separators/newlines
          const noBrackets = s.replace(/^\[|\]$/g, '')
          normalizedList = noBrackets
            .split(/\r?\n|\s*","\s*|\||,|;|·|•/)
            .map(v => v.replace(/^\s*"|"\s*$/g, '').trim())
            .filter(Boolean)
        }
      }

      console.log("✅ Normalized list for", item.title, ":", normalizedList);

      return {
        ...item,
        image: getImageUrl(item.image),
        list: normalizedList,
      };
    });
    
    console.log("🎯 Final services:", services.value);
  } catch (err) {
    console.error("❌ Gagal mengambil data services:", err);
    error.value = err;
    services.value = [];
  } finally {
    pending.value = false;
  }
}

// Animations
onMounted(() => {
  console.log("✅ Component mounted, fetching services and initializing animations...");
  fetchServices();
  initAnimations();
});

const initAnimations = () => {
  const animateOnScroll = (elem, vars) => {
    if (!elem) return;
    $gsap.from(elem, {
      scrollTrigger: {
        trigger: elem,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      duration: 0.8,
      autoAlpha: 0,
      y: 50,
      ease: "power3.out",
      ...vars,
    });
  };

  // Hero Section
  if (heroSection.value) {
    $gsap.from(heroSection.value.querySelector(".relative").children, {
      duration: 1,
      autoAlpha: 0,
      y: 30,
      ease: "power3.out",
      stagger: 0.2,
      delay: 0.2,
    });
  }

  // Services Section
  if (servicesSection.value) {
    animateOnScroll(servicesSection.value.querySelector("p"));
    animateOnScroll(servicesSection.value.querySelector("h1"), { delay: 0.1 });
    const serviceCards = servicesSection.value.querySelectorAll(".grid > div");
    serviceCards.forEach((card, index) => {
      animateOnScroll(card, { delay: index * 0.15 });
    });
  }
};
</script>
