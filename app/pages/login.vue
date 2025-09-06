<template>
  <div class="bg-gray-200 min-h-screen font-sans">
    <div class="flex min-h-screen w-full justify-center items-center p-4">
      <div
        ref="loginBox"
        class="flex flex-col lg:flex-row-reverse lg:w-3/5 w-full max-w-4xl h-auto lg:h-[60vh] shadow-2xl rounded-3xl overflow-hidden"
      >
        <div class="relative h-48 lg:h-full lg:w-2/5">
          <img
            src="/img/login-placeholder.png"
            alt="Halaman Login"
            class="w-full h-full object-cover"
            onerror="this.onerror=null;this.src='https://placehold.co/600x800/1E1E1E/FFFBFC?text=Image';"
          />
        </div>

        <form
          @submit.prevent="login"
          class="lg:w-3/5 w-full bg-[#1E1E1E] text-white rounded-b-3xl lg:rounded-b-none lg:rounded-l-3xl flex flex-col p-8 sm:p-10 lg:p-12 justify-center gap-6"
        >
          <!-- Header -->
          <div class="flex flex-col gap-y-2">
            <h1 class="text-2xl lg:text-3xl font-bold text-white">
              Login to Your Account
            </h1>
            <p class="text-gray-400">Admin Access Only</p>
          </div>

          <!-- Input Fields -->
          <div class="flex flex-col gap-y-4">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-300"
                >Name</label
              >
              <input
                v-model="name"
                type="text"
                name="name"
                id="name"
                class="p-3 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-300"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                class="p-3 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            class="flex border border-white w-fit px-6 py-2 rounded-full justify-center items-center gap-x-3 mt-2 hover:bg-white hover:text-black font-semibold transition-all duration-200 ease-in-out"
          >
            <span>Login</span>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="fill-current"
            >
              <path
                d="M0.75 19.75V17.5833H2.91667V2.41667C2.91667 1.82083 3.129 1.31094 3.55367 0.887C3.97833 0.463056 4.48822 0.250722 5.08333 0.25H15.9167C16.5125 0.25 17.0228 0.462333 17.4474 0.887C17.8721 1.31167 18.0841 1.82156 18.0833 2.41667V17.5833H20.25V19.75H0.75ZM15.9167 17.5833V2.41667H5.08333V17.5833H15.9167ZM12.6667 11.0833C12.9736 11.0833 13.2311 10.9793 13.4391 10.7713C13.6471 10.5633 13.7507 10.3062 13.75 10C13.7493 9.69378 13.6453 9.43667 13.438 9.22867C13.2307 9.02067 12.9736 8.91667 12.6667 8.91667C12.3597 8.91667 12.1026 9.02067 11.8953 9.22867C11.6881 9.43667 11.5841 9.69378 11.5833 10C11.5826 10.3062 11.6866 10.5637 11.8953 10.7724C12.1041 10.9811 12.3612 11.0848 12.6667 11.0833Z"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { navigateTo, useCookie } from "nuxt/app";

export default {
  data() {
    return {
      name: "",
      password: "",
    };
  },
  mounted() {
    this.initAnimations();
  },
  methods: {
    initAnimations() {
      const gsap = this.$gsap;
      const loginBox = this.$refs.loginBox;

      if (loginBox) {
        gsap.from(loginBox, {
          duration: 1,
          autoAlpha: 0,
          y: -50,
          scale: 0.95,
          ease: "power3.out",
        });

        const form = loginBox.querySelector("form");
        if (form) {
          const formChildren = Array.from(form.children);
          // Set semua children ke kondisi awal
          gsap.set(formChildren, { autoAlpha: 0, x: -30 });
          // Animasi ke kondisi akhir
          gsap.to(formChildren, {
            duration: 0.8,
            autoAlpha: 1,
            x: 0,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.5,
          });
        }
      }
    },
    async login() {
      const name = this.name;
      const password = this.password;
      try {
        const response = await this.$api.post("/api/user/login", {
          name,
          password,
        });
        const token = response.data.accessToken;
        if (token) {
          const authToken = useCookie("accessToken");
          authToken.value = token;
        }
        await navigateTo("/admin");
      } catch (error) {
        navigateTo("/login");
        console.error("Login failed:", error);
      }
    },
  },
};
</script>
