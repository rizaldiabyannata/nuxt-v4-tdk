<template>
  <nav class="flex justify-between items-center w-full fixed z-30 px-4 sm:px-6 lg:px-8 py-4">
    <div>
      <NuxtLink to="/"><img class="h-8 md:h-10" src="/img/logotdk.png" alt="Logo"></NuxtLink>
    </div>
    <div
      class="hidden md:flex flex-row shadow-md rounded-full px-8 py-3 space-x-8 text-base bg-gray-300/40 backdrop-blur-md text-black font-medium">
      <NuxtLink to="/" class="hover:text-[#EB5523] transition-colors">Home</NuxtLink>
      <NuxtLink to="/article" class="hover:text-[#EB5523] transition-colors">Article</NuxtLink>
      <NuxtLink to="/portfolio" class="hover:text-[#EB5523] transition-colors">Our Portfolio</NuxtLink>
      <NuxtLink to="/our-services" class="hover:text-[#EB5523] transition-colors">Our Service</NuxtLink>
      <NuxtLink to="/about-us" class="hover:text-[#EB5523] transition-colors">About Us</NuxtLink>
      <NuxtLink to="/contact" class="hover:text-[#EB5523] transition-colors">Contact</NuxtLink>
    </div>
    <div class="md:hidden flex items-center justify-center z-40">
      <label class="btn btn-ghost swap swap-rotate rounded-full bg-gray-400/50 backdrop-blur-md">
        <input type="checkbox" @change="handleMenuToggle" v-model="isMobileMenuOpen" />

        <svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
          viewBox="0 0 512 512">
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

        <svg class="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
          <polygon
            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label>
    </div>
    <div class="w-screen h-screen fixed top-0 left-0 bg-gray-900/50 backdrop-blur-md z-20 items-center justify-center"
      :class="{ 'flex': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }" id="mobile-menu">
      <div class="flex flex-col items-center justify-center h-full space-y-8 text-white">
        <NuxtLink to="/" class="text-3xl font-bold hover:text-[#EB5523] transition-colors" @click="closeMobileMenu">Home</NuxtLink>
        <NuxtLink to="/article" class="text-3xl font-bold hover:text-[#EB5523] transition-colors" @click="closeMobileMenu">Article</NuxtLink>
        <NuxtLink to="/portfolio" class="text-3xl font-bold hover:text-[#EB5523] transition-colors" @click="closeMobileMenu">Our Portfolio</NuxtLink>
        <NuxtLink to="/our-services" class="text-3xl font-bold hover:text-[#EB5523] transition-colors" @click="closeMobileMenu">Our Service</NuxtLink>
        <NuxtLink to="/about-us" class="text-3xl font-bold hover:text-[#EB5523] transition-colors" @click="closeMobileMenu">About Us</NuxtLink>
        <NuxtLink to="/contact" class="text-3xl font-bold hover:text-[#EB5523] transition-colors" @click="closeMobileMenu">Contact</NuxtLink>
      </div>
    </div>
  </nav>
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