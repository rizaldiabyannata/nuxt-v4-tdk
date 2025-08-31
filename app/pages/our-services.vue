<template>
  <div class="relative min-h-screen flex flex-col md:pl-12 lg:pl-32">
    <div class="absolute inset-0 bg-[url('/img/sample/sample-5.jpeg')] bg-cover bg-center brightness-50 -z-10"></div>

    <div class="relative flex flex-col flex-grow w-full justify-center p-4">
      <div class="flex flex-col w-full md:w-1/2 justify-center items-start">
        <h1 class="font-bold text-xl md:text-5xl text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h1>
        <p class="mt-2 text-sm sm:text-base text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic eligendi esse accusamus omnis nobis eaque tempore ipsam, odit culpa aut, similique eum dolores iure error
          temporibus molestiae, voluptatum natus! Minus!
        </p>
      </div>
      <a href=""
        class="group flex flex-row w-fit border-white border rounded-full px-4 py-2 mt-6 text-sm items-center space-x-2 hover:bg-white transition-colors">
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.1969 10.625H1.625C1.30625 10.625 1.03925 10.517 0.824004 10.301C0.608754 10.085 0.500754 9.818 0.500004 9.5C0.499254 9.182 0.607254 8.915 0.824004 8.699C1.04075 8.483 1.30775 8.375 1.625 8.375H14.1969L8.68437 2.8625C8.45937 2.6375 8.35138 2.375 8.36038 2.075C8.36938 1.775 8.48675 1.5125 8.7125 1.2875C8.9375 1.08125 9.2 0.973246 9.5 0.963496C9.8 0.953746 10.0625 1.06175 10.2875 1.2875L17.7125 8.7125C17.825 8.825 17.9049 8.94687 17.9521 9.07812C17.9994 9.20937 18.0226 9.35 18.0219 9.5C18.0211 9.65 17.9979 9.79062 17.9521 9.92187C17.9064 10.0531 17.8265 10.175 17.7125 10.2875L10.2875 17.7125C10.0813 17.9187 9.82362 18.0219 9.51462 18.0219C9.20563 18.0219 8.93825 17.9187 8.7125 17.7125C8.4875 17.4875 8.375 17.2205 8.375 16.9115C8.375 16.6025 8.4875 16.3351 8.7125 16.1094L14.1969 10.625Z"
            fill="#EB5523" />
        </svg>
        <p class="font-semibold text-white group-hover:text-black">Our Services</p>
      </a>
    </div>
  </div>

  <div class="max-w-screen min-h-screen flex flex-col justify-center lg:px-24 px-8 space-y-2 py-4 ">
    <div class="flex flex-col w-full">
      <p class="text-xl lg:text-3xl">Our Services</p>
      <h1 class="text-3xl lg:text-5xl font-bold text-[#EB5523]">Lorem Ipsum</h1>
    </div>
    <div class="grid xl:grid-cols-3 grid-cols-1 gap-4 lg:gap-16 md:grid-cols-1 w-full pt-8">
      <services-card title="Perencanaan Proyek" :list="list_1" :image="img_1"/>
      <services-card title="Supervisi Proyek" :list="list_2" :image="img_2"/>
      <services-card title="Manajemen Konstruksi" :list="list_3" :image="img_3"/>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        list_1: ["Perencanaan konstruksi gedung", "Desain jalan dan jembatan","Proyek irigasi dan sumber daya air"],
        list_2: ["Jaminan kualitas di lokasi", "Kepatuhan terhadap protokol keselamatan","Penyelesaian proyek tepat waktu"],
        list_3: ["Manajemen biaya dan anggaran", "Penjadwalan dan koordinasi","Manajemen risiko dan mitigasi"],
        img_1: "/img/projectPlanning.jpeg",
        img_2: "/img/supervision.jpeg",
        img_3: "/img/management.jpeg",
      }
    }
  }
</script>