<template>
  <div class="relative h-[50vh] flex flex-col">
    <div class="absolute inset-0 bg-[url('/img/sample/sample-4.jpeg')] bg-cover bg-center brightness-50 -z-10"></div>

    <div class="relative space-y-2 lg:w-1/2 flex flex-col h-full justify-center p-4">
      <h1 class="font-extrabold text-2xl lg:text-5xl text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
      <p class="lg:text-white">By PT. Total Desain Konsultan</p>
    </div>
  </div>
  <div class="w-full flex bg-white">
    <PortoTemplate 
    :firstParagraph = "portfoliosList.shortDescription"
    :image = "`http://localhost:5000${portfoliosList.coverImage}`"
    :secondParagraph = "portfoliosList.description"
    />
  </div>
</template>

<script setup>
import PortoTemplate from "../components/portoTemplate.vue";
import axios from "axios";

const route = useRoute();
const slug = route.params.slug; // <- ambil dari query ?slug=xxx

console.log("Slug porto: ", slug);

const portfoliosList = ref({});

onMounted(async () => {
  console.log("Mencoba mengambil data portfolio dari API...");
  try {
    const response = await axios.get(`http://localhost:5000/api/portfolios/${slug}`);
    console.log("Data portfolio berhasil diambil:", response.data);
    portfoliosList.value = response.data.data;
  } catch (error) {
    console.error("Gagal mengambil data portfolio:", error);
  }
});
</script>


