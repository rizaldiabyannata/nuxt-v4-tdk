<template>
  <div class="relative h-[50vh] lg:h-screen flex flex-col justify-center items-center">
    <div class="absolute inset-0 bg-[url('/img/sample/aboutus.png')] bg-cover bg-center brightness-50 -z-10"></div>

    <div class="relative space-y-2 lg:w-1/2 flex flex-col items-center p-4">
      <h1 class="font-extrabold text-2xl lg:text-5xl text-center text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
      <p class="lg:text-2xl text-center text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus ab magni explicabo quibusdam architecto tenetur?</p>
      <NuxtLink to="/our-services" class="group flex flex-row w-fit border-white border rounded-full px-4 py-2 mt-6 text-sm items-center space-x-2 hover:bg-white transition-colors">
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.1969 10.625H1.625C1.30625 10.625 1.03925 10.517 0.824004 10.301C0.608754 10.085 0.500754 9.818 0.500004 9.5C0.499254 9.182 0.607254 8.915 0.824004 8.699C1.04075 8.483 1.30775 8.375 1.625 8.375H14.1969L8.68437 2.8625C8.45937 2.6375 8.35138 2.375 8.36038 2.075C8.36938 1.775 8.48675 1.5125 8.7125 1.2875C8.9375 1.08125 9.2 0.973246 9.5 0.963496C9.8 0.953746 10.0625 1.06175 10.2875 1.2875L17.7125 8.7125C17.825 8.825 17.9049 8.94687 17.9521 9.07812C17.9994 9.20937 18.0226 9.35 18.0219 9.5C18.0211 9.65 17.9979 9.79062 17.9521 9.92187C17.9064 10.0531 17.8265 10.175 17.7125 10.2875L10.2875 17.7125C10.0813 17.9187 9.82362 18.0219 9.51462 18.0219C9.20563 18.0219 8.93825 17.9187 8.7125 17.7125C8.4875 17.4875 8.375 17.2205 8.375 16.9115C8.375 16.6025 8.4875 16.3351 8.7125 16.1094L14.1969 10.625Z"
            fill="#EB5523"
          />
        </svg>
        <p class="font-semibold text-white group-hover:text-black">Our Services</p>
      </NuxtLink>
    </div>
  </div>

  <div class="max-w-screen h-screen flex flex-col justify-center px-12 lg:px-24 text-justify space-y-4">
    <div class="flex flex-col w-full space-y-2">
      <h1 class="text-4xl lg:text-6xl font-bold text-[#EB5523]">Our Vision</h1>
      <p class="lg:text-2xl">
        Menjadi pemimpin terpercaya dalam perencanaan dan supervisi proyek, menciptakan solusi berkelanjutan dan inovatif yang berkontribusi pada pembangunan infrastruktur dan
        kemajuan masyarakat.
      </p>
    </div>
    <hr />
    <div class="flex flex-col w-full space-y-2">
      <h1 class="text-4xl lg:text-6xl font-bold text-[#EB5523]">Our Mission</h1>
      <ol class="list-decimal pl-6 lg:text-2xl">
        <li>Memberikan layanan perencanaan dan supervisi terbaik untuk proyek gedung, jalan, jembatan, dan sumber daya air.</li>
        <li>Memastikan manajemen konstruksi yang efisien dan memenuhi ekspektasi klien.</li>
        <li>Mengadopsi teknologi dan praktik inovatif yang memprioritaskan kualitas, keselamatan, dan keberlanjutan lingkungan.</li>
        <li>Membangun kemitraan jangka panjang yang didasarkan pada kepercayaan dan profesionalisme.</li>
      </ol>
    </div>
  </div>
  <div class="flex flex-col max-w-screen min-h-screen bg-gray-200 justify-center items-center py-6">
    <h1 class="text-3xl text-[#EB5523] font-bold">Struktur Manajemen</h1>
    <h2 class="text-2xl text-[#EB5523] font-semibold mb-4">Direktur Utama</h2>
    <div class="flex flex-row w-180 h-fit pt-6">
      <img src="/img/Alireza.jpg" alt="Alireza" class="w-64 h-auto object-cover shadow-lg shadow-gray-400 rounded-lg" />
      <div class="flex flex-col bg-white h-auto w-full my-4 shadow-lg shadow-gray-400 py-6 px-8 justify-center space-y-4 rounded-r-lg">
        <h1 class="text-black font-bold text-2xl">Firman</h1>
        <h2 class="text-black font-semibold text-lg">Direktur Utama</h2>
        <p class="text-black text-justify pt-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, sapiente ea ab minima quae alias odio velit labore, mollitia cupiditate delectus, molestias nobis
          eius? Quis rem nobis, perferendis, sit fuga adipisci eum asperiores ad magni, id explicabo molestias minus quidem.
        </p>
        <div class="flex flex-row space-x-6 w-full justify-center items-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z" fill="#727B76" />
            <path d="M2 8V18" stroke="#727B76" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8 8V18" stroke="#727B76" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8 13C8 10.24 10.24 8 13 8C15.76 8 18 10.24 18 13V18" stroke="#727B76" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 11.5H9.5L10.5 7.5H7V5.5C7 4.47 7 3.5 9 3.5H10.5V0.14C10.174 0.0970001 8.943 0 7.643 0C4.928 0 3 1.657 3 4.7V7.5H0V11.5H3V20H7V11.5Z" fill="#727B76" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.028 0C12.153 0.003 12.724 0.009 13.217 0.023L13.411 0.03C13.635 0.038 13.856 0.0479999 14.123 0.0599999C15.187 0.11 15.913 0.278 16.55 0.525C17.21 0.779 17.766 1.123 18.322 1.678C18.8307 2.17773 19.2242 2.78247 19.475 3.45C19.722 4.087 19.89 4.813 19.94 5.878C19.952 6.144 19.962 6.365 19.97 6.59L19.976 6.784C19.991 7.276 19.997 7.847 19.999 8.972L20 9.718V11.028C20.0025 11.7574 19.9948 12.4868 19.977 13.216L19.971 13.41C19.963 13.635 19.953 13.856 19.941 14.122C19.891 15.187 19.721 15.912 19.475 16.55C19.2242 17.2175 18.8307 17.8223 18.322 18.322C17.8223 18.8307 17.2175 19.2242 16.55 19.475C15.913 19.722 15.187 19.89 14.123 19.94L13.411 19.97L13.217 19.976C12.724 19.99 12.153 19.997 11.028 19.999L10.282 20H8.97302C8.24328 20.0026 7.51354 19.9949 6.78402 19.977L6.59002 19.971C6.35263 19.962 6.11529 19.9517 5.87802 19.94C4.81402 19.89 4.08802 19.722 3.45002 19.475C2.78285 19.2241 2.17846 18.8306 1.67902 18.322C1.16996 17.8224 0.776128 17.2176 0.52502 16.55C0.27802 15.913 0.110019 15.187 0.0600194 14.122L0.0300195 13.41L0.0250196 13.216C0.00658562 12.4868 -0.00174861 11.7574 1.94806e-05 11.028V8.972C-0.00274841 8.2426 0.0045857 7.5132 0.0220196 6.784L0.0290195 6.59C0.0370195 6.365 0.0470195 6.144 0.0590195 5.878C0.109019 4.813 0.277019 4.088 0.524019 3.45C0.775714 2.7822 1.17024 2.17744 1.68002 1.678C2.17917 1.16955 2.78321 0.776074 3.45002 0.525C4.08802 0.278 4.81302 0.11 5.87802 0.0599999C6.14402 0.0479999 6.36602 0.038 6.59002 0.03L6.78402 0.0239999C7.51321 0.00623271 8.24261 -0.0014347 8.97202 0.000999928L11.028 0ZM10 5C8.67394 5 7.40217 5.52678 6.46449 6.46447C5.5268 7.40215 5.00002 8.67392 5.00002 10C5.00002 11.3261 5.5268 12.5979 6.46449 13.5355C7.40217 14.4732 8.67394 15 10 15C11.3261 15 12.5979 14.4732 13.5356 13.5355C14.4732 12.5979 15 11.3261 15 10C15 8.67392 14.4732 7.40215 13.5356 6.46447C12.5979 5.52678 11.3261 5 10 5ZM10 7C10.394 6.99993 10.7841 7.07747 11.1481 7.22817C11.5121 7.37887 11.8429 7.5998 12.1215 7.87833C12.4001 8.15686 12.6211 8.48754 12.772 8.85149C12.9228 9.21544 13.0005 9.60553 13.0005 9.9995C13.0006 10.3935 12.9231 10.7836 12.7723 11.1476C12.6216 11.5116 12.4007 11.8423 12.1222 12.121C11.8437 12.3996 11.513 12.6206 11.149 12.7714C10.7851 12.9223 10.395 12.9999 10.001 13C9.20537 13 8.44231 12.6839 7.8797 12.1213C7.31709 11.5587 7.00102 10.7956 7.00102 10C7.00102 9.20435 7.31709 8.44129 7.8797 7.87868C8.44231 7.31607 9.20537 7 10.001 7M15.251 3.5C14.9195 3.5 14.6016 3.6317 14.3671 3.86612C14.1327 4.10054 14.001 4.41848 14.001 4.75C14.001 5.08152 14.1327 5.39946 14.3671 5.63388C14.6016 5.8683 14.9195 6 15.251 6C15.5825 6 15.9005 5.8683 16.1349 5.63388C16.3693 5.39946 16.501 5.08152 16.501 4.75C16.501 4.41848 16.3693 4.10054 16.1349 3.86612C15.9005 3.6317 15.5825 3.5 15.251 3.5Z"
              fill="#727B76"
            />
          </svg>
          <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_439_869)">
              <mask id="mask0_439_869" style="mask-type: luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
                <path d="M0 0H14V14H0V0Z" fill="white" />
              </mask>
              <g mask="url(#mask0_439_869)">
                <path
                  d="M11.025 0.656006H13.172L8.482 6.03001L14 13.344H9.68L6.294 8.90901L2.424 13.344H0.275L5.291 7.59401L0 0.657006H4.43L7.486 4.71001L11.025 0.656006ZM10.27 12.056H11.46L3.78 1.87701H2.504L10.27 12.056Z"
                  fill="#727B76"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_439_869">
                <rect width="14" height="14" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 items-center gap-12 mt-12">
      <bio-card />
      <bio-card />
      <bio-card />
    </div>

    <!-- <div class="flex justify-center mb-12">
      <BioCard
        v-if="mainDirector"
        :name="mainDirector.name"
        :title="mainDirector.title"
        :image="mainDirector.image"
      />
      <p v-else>Direktur utama tidak ditemukan.</p>
    </div>

    <div class="flex flex-col space-y-2 xl:flex-row mb-12 max-w-screen px-2 space-x-2">
      <BioCard
        v-for="member in otherDirectors"
        :key="member.id"
        :name="member.name"
        :title="member.title"
        :image="member.image"
       class=""/>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-8 mb-12">
      <BioCard
        v-for="member in generalManagement"
        :key="member.id"
        :name="member.name"
        :title="member.title"
        :image="member.image"
      />
    </div> -->

    <div class="flex flex-row w-full"></div>
  </div>
</template>

<script>
import { h } from "vue";
import BioCard from "/components/bio-card.vue";

export default {
  data() {
    return {
      managementTeam: [
        { level: 1, name: "John Doe", title: "Direktur Utama", image: "/img/bioprofile.png" },
        { level: 2, name: "Jane Smith", title: "Direktur Operasional", image: "/img/bioprofile.png" },
        { level: 2, name: "Peter Jones", title: "Direktur Keuangan", image: "/img/bioprofile.png" },
        { level: 2, name: "Alice Brown", title: "Kepala Divisi Teknis", image: "/img/bioprofile.png" },
        { level: 3, name: "Rizky Pratama", title: "Manajer Pemasaran", image: "/img/bioprofile.png" },
        { level: 3, name: "Maya Indah Sari", title: "Manajer SDM", image: "/img/bioprofile.png" },
        { level: 3, name: "Joko Susilo", title: "Kepala Proyek Senior", image: "/img/bioprofile.png" },
        { level: 3, name: "Citra Kirana", title: "Spesialis Desain Grafis", image: "/img/bioprofile.png" },
      ],
    };
  },
  computed: {
    // Computed property untuk Direktur Utama (ID 1)
    mainDirector() {
      return this.managementTeam.find((member) => member.level === 1);
    },
    // Computed property untuk Direksi Lainnya (ID 2, 3, 4)
    otherDirectors() {
      return this.managementTeam.filter((member) => member.level === 2);
    },
    // Computed property untuk Manajemen Umum (ID 5 ke atas)
    generalManagement() {
      return this.managementTeam.filter((member) => member.level >= 3);
    },
  },
};
</script>
