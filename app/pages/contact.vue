<template>
  <div class="flex flex-col max-w-screen">
    <div class="flex flex-col md:flex-row w-full h-screen">
      <img src="/img/placeholder.png" alt="" class="h-1/2 w-full md:h-full md:w-1/2" />
      <div class="flex flex-col bg-white text-black h-1/2 w-full md:h-full md:w-1/2 items-center justify-center px-4">
        <h1 class="text-2xl font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, velit?</p>
      </div>
    </div>
    <div class="flex flex-col md:flex-row w-full h-screen justify-center items-center bg-white">
      <div class="flex flex-col w-full md:w-1/2 py-4 space-y-1 px-4 md:space-y-4">
        <h1 class="text-3xl font-bold text-[#EB5523]">Contact Us</h1>
        <p class="text-black text-base sm:text-lg md:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse perferendis eos necessitatibus, totam earum quasi a.</p>
        <form @submit.prevent="submitMessage" class="space-y-2 w-full">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-900">Name</label>
            <div class="mt-2">
              <input
                v-model="message.name"
                type="text"
                name="name"
                id="name"
                class="block w-full rounded-xl py-2 sm:py-2.5 px-3 bg-white text-base text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm leading-6"
              />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-900">Email</label>
            <div class="mt-2">
              <input
                v-model="message.email"
                type="email"
                name="email"
                id="email"
                class="block w-full rounded-xl py-2 sm:py-2.5 px-3 bg-white text-base text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm leading-6"
              />
            </div>
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-gray-900">Message</label>
            <div class="mt-2">
              <textarea
                v-model="message.message"
                name="message"
                id="message"
                rows="5"
                class="block w-full rounded-xl bg-white px-3 py-2 sm:py-2.5 text-base text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm leading-6"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            class="inline-flex flex-row items-center justify-center border-black border w-fit rounded-full px-5 py-2 sm:px-6 sm:py-2.5 space-x-2 text-sm sm:text-base hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 19 19" fill="black" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.1969 10.625H1.625C1.30625 10.625 1.03925 10.517 0.824004 10.301C0.608754 10.085 0.500754 9.818 0.500004 9.5C0.499254 9.182 0.607254 8.915 0.824004 8.699C1.04075 8.483 1.30775 8.375 1.625 8.375H14.1969L8.68437 2.8625C8.45937 2.6375 8.35138 2.375 8.36038 2.075C8.36938 1.775 8.48675 1.5125 8.7125 1.2875C8.9375 1.08125 9.2 0.973246 9.5 0.963496C9.8 0.953746 10.0625 1.06175 10.2875 1.2875L17.7125 8.7125C17.825 8.825 17.9049 8.94687 17.9521 9.07812C17.9994 9.20937 18.0226 9.35 18.0219 9.5C18.0211 9.65 17.9979 9.79062 17.9521 9.92187C17.9064 10.0531 17.8265 10.175 17.7125 10.2875L10.2875 17.7125C10.0813 17.9187 9.82362 18.0219 9.51462 18.0219C9.20563 18.0219 8.93825 17.9187 8.7125 17.7125C8.4875 17.4875 8.375 17.2205 8.375 16.9115C8.375 16.6025 8.4875 16.3351 8.7125 16.1094L14.1969 10.625Z"
              />
            </svg>
            <p class="font-semibold text-black">Send</p>
          </button>
        </form>
      </div>
      <img src="/img/placeholder.png" alt="" class="h-1/2 w-full md:h-full md:w-1/2" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: {
        name: "",
        email: "",
        message: "",
      },
    };
  },

  methods: {
    async submitMessage() {
      try {
        const response = await this.$api.post("/contact-form/", {
          name: this.message.name,
          email: this.message.email,
          message: this.message.message,
        });

        console.log("Pesan berhasil dikirim", response.data);
        this.tampilanAktif = "daftar";
      } catch (error) {
        console.error("Gagal mengirim pesan:", error);
      }
    },
  },
};
</script>
