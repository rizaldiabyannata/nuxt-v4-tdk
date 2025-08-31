<template>
  <div class="flex flex-col md:flex-row xl:flex-col rounded-4xl p-8 bg-white justify-center items-center space-y-4 md:space-x-5">
    <div class="flex flex-col h-full w-full items-center justify-center">
      <img :src="image" alt="" class="border border-black aspect-[5/3] object-cover" />
      <p class="font-extrabold text-black text-xl lg:text-2xl">{{ title }}</p>
    </div>
    <div class="flex flex-col w-full space-y-2 md:justify-center md:h-full">
      <div v-for="poin in list" class="flex flex-col w-full">
        <hr class="flex border-t-1 border w-full border-gray-400" />
        <p class="text-black">{{ poin }}</p>
      </div>
      <!-- <hr class="flex border-t-1 border w-full border-gray-400" />
      <p class="text-black">Lorem ipsum dolor sit amet.</p>
      <hr class="flex border-t-1 border w-full border-gray-400" />
      <p class="text-black">Lorem ipsum dolor sit amet.</p>
      <hr class="flex border-t-1 border w-full border-gray-400" />
      <p class="text-black">Lorem ipsum dolor sit amet.</p> -->
      <NuxtLink to="/contact" class="flex flex-row w-fit border-black border rounded-full px-4 py-2 mt-4 text-sm items-center space-x-2 hover:bg-gray-100 transition-colors">
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.1969 10.625H1.625C1.30625 10.625 1.03925 10.517 0.824004 10.301C0.608754 10.085 0.500754 9.818 0.500004 9.5C0.499254 9.182 0.607254 8.915 0.824004 8.699C1.04075 8.483 1.30775 8.375 1.625 8.375H14.1969L8.68437 2.8625C8.45937 2.6375 8.35138 2.375 8.36038 2.075C8.36938 1.775 8.48675 1.5125 8.7125 1.2875C8.9375 1.08125 9.2 0.973246 9.5 0.963496C9.8 0.953746 10.0625 1.06175 10.2875 1.2875L17.7125 8.7125C17.825 8.825 17.9049 8.94687 17.9521 9.07812C17.9994 9.20937 18.0226 9.35 18.0219 9.5C18.0211 9.65 17.9979 9.79062 17.9521 9.92187C17.9064 10.0531 17.8265 10.175 17.7125 10.2875L10.2875 17.7125C10.0813 17.9187 9.82362 18.0219 9.51462 18.0219C9.20563 18.0219 8.93825 17.9187 8.7125 17.7125C8.4875 17.4875 8.375 17.2205 8.375 16.9115C8.375 16.6025 8.4875 16.3351 8.7125 16.1094L14.1969 10.625Z"
            fill="#EB5523"
          />
        </svg>
        <p class="font-semibold text-black">Contact Us</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
  export default {
  props: {
    image: {
      type: String,
      default: "/img/login-placeholder.png"
    },
    title: {
      type: String,
      default: "Lorem ipsum dolor sit amet."
    },
    list: {
      type: Array,
      required: true, 
      validator: function(value) {
        return value.every(item => typeof item === 'string');
      }

    }
  }
}
</script>
