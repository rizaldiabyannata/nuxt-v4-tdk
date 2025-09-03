<template>
  <div class="flex justify-between px-6 items-center pt-2 w-full fixed z-30">
    <div class="text-black">
      <NuxtLink to="/"><img class="h-6 md:h-8 xl:h-10" src="/img/logotdk.png" alt=""></NuxtLink>
    </div>
    <div
      class="hidden md:flex flex-row shadow-md rounded-full px-12 py-4 space-x-6 text-[1rem] bg-gray-300/40 backdrop-blur-md text-black">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/article">Article</NuxtLink>
      <NuxtLink to="/portfolio">Our Portfolio</NuxtLink>
      <NuxtLink to="/our-services">Our Service</NuxtLink>
      <NuxtLink to="/about-us">About Us</NuxtLink>
      <NuxtLink to="/contact">Contact</NuxtLink>
    </div>
    <div class="md:hidden flex items-center justify-center z-40">
      <label class="btn btn-ghost swap swap-rotate rounded-2xl bg-gray-400/50 backdrop-blur-md">
        <input type="checkbox" @change="handleMenuToggle" v-model="isMobileMenuOpen" />

        <svg class="swap-off fill-black" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
          viewBox="0 0 512 512">
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

        <svg class="swap-on fill-black" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
          <polygon
            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label>
    </div>
    <div class="w-screen h-screen fixed top-0 left-0 bg-gray-900/50 backdrop-blur-md z-20 items-center justify-center"
      :class="{ 'flex': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }" id="mobile-menu">
      <div class="flex flex-col items-start justify-center h-full space-y-6 text-white">
        <NuxtLink to="/" class="text-lg" @click="closeMobileMenu">
          <p class="font-extrabold text-5xl">Home</p>
        </NuxtLink>
        <NuxtLink to="/article" class="text-lg" @click="closeMobileMenu">
          <p class="font-extrabold text-5xl">Article</p>
        </NuxtLink>
        <NuxtLink to="/portfolio" class="text-lg" @click="closeMobileMenu">
          <p class="font-extrabold text-5xl">Our Portfolio</p>
        </NuxtLink>
        <NuxtLink to="/our-services" class="text-lg" @click="closeMobileMenu">
          <p class="font-extrabold text-5xl">Our Service</p>
        </NuxtLink>
        <NuxtLink to="/about-us" class="text-lg" @click="closeMobileMenu">
          <p class="font-extrabold text-5xl">About Us</p>
        </NuxtLink>
        <NuxtLink to="/contact" class="text-lg" @click="closeMobileMenu">
          <p class="font-extrabold text-5xl">Contact</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobileMenuOpen: false // State untuk melacak status menu mobile
    };
  },
  methods: {
    handleMenuToggle() {
      console.log('Menu toggled, new state:', this.isMobileMenuOpen);
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    }
  }
};
</script>