<template>
  <div ref="heroSection" class="relative h-[50vh] lg:h-screen flex flex-col justify-center items-center">
    <div class="absolute inset-0 bg-[url('/img/sample/aboutus.png')] bg-cover bg-center brightness-50 -z-10"></div>

    <div class="relative space-y-2 lg:w-1/2 flex flex-col items-center p-4">
      <h1 class="font-extrabold text-3xl lg:text-4xl text-center text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
      <p class="text-lg lg:text-xl text-center text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus ab magni explicabo quibusdam architecto tenetur?</p>
      <NuxtLink
        to="/our-services"
        class="group flex flex-row w-fit border-white border rounded-full px-4 py-2 mt-8 text-sm items-center space-x-2 hover:bg-white transition-colors"
      >
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

  <div class="max-w-screen min-h-screen flex flex-col justify-center px-4 py-16 sm:px-8 sm:py-24 text-justify space-y-12">
    <div ref="visionSection" class="flex flex-col w-full space-y-2 justify-center items-center space-y-12 lg:px-24">
      <h1 class="text-3xl lg:text-5xl font-bold text-[#EB5523]">Our Vision</h1>
      <p class="text-2xl text-center font-bold">
        Menjadi pemimpin terpercaya dalam perencanaan dan supervisi proyek, menciptakan solusi berkelanjutan dan inovatif yang berkontribusi pada pembangunan infrastruktur dan
        kemajuan masyarakat.
      </p>
    </div>
    <hr />
    <div ref="missionSection" class="flex flex-col w-full space-y-2 jutify-center items-center space-y-12">
      <h1 class="text-3xl lg:text-5xl font-bold text-[#EB5523]">Our Mission</h1>
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-12 justify-center items-center mb-8">
        <div class="flex flex-col w-72 h-96 bg-gray-300 mb-4 rounded-2xl shadow-lg shadow-gray-400 pt-12 space-y-6 items-center px-8">
          <div class="w-32 h-32 bg-[#EB5523] rounded-full justify-center items-center flex">
            <svg xmlns="http://www.w3.org/2000/svg" height="72px" viewBox="0 -960 960 960" width="72px" fill="#e3e3e3">
              <path
                d="M760-400v-260L560-800 360-660v60h-80v-100l280-200 280 200v300h-80ZM560-800Zm20 160h40v-40h-40v40Zm-80 0h40v-40h-40v40Zm80 80h40v-40h-40v40Zm-80 0h40v-40h-40v40ZM280-220l278 76 238-74q-5-9-14.5-15.5T760-240H558q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T578-354l-234-86h-64v220ZM40-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L560-60l-280-78v58H40Zm80-80h80v-280h-80v280Z"
              />
            </svg>
          </div>
          <p class="text-center font-semibold">Memberikan layanan perencanaan dan supervisi terbaik untuk proyek gedung, jalan, jembatan, dan sumber daya air.</p>
        </div>
        <div class="flex flex-col w-72 h-96 bg-gray-300 mb-4 rounded-2xl shadow-lg shadow-gray-400 pt-12 space-y-6 items-center px-8 px-8">
          <div class="w-32 h-32 bg-[#EB5523] rounded-full justify-center items-center flex">
            <svg xmlns="http://www.w3.org/2000/svg" height="72px" viewBox="0 -960 960 960" width="72px" fill="#e3e3e3">
              <path
                d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm40-120q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z"
              />
            </svg>
          </div>
          <p class="text-center font-semibold">Memastikan manajemen konstruksi yang efisien dan memenuhi ekspektasi klien.</p>
        </div>
        <div class="flex flex-col w-72 h-96 bg-gray-300 mb-4 rounded-2xl shadow-lg shadow-gray-400 pt-12 space-y-6 items-center px-8 px-8">
          <div class="w-32 h-32 bg-[#EB5523] rounded-full justify-center items-center flex">
            <svg xmlns="http://www.w3.org/2000/svg" height="72px" viewBox="0 -960 960 960" width="72px" fill="#e3e3e3">
              <path
                d="M323-160q-11 0-20.5-5.5T288-181l-78-139h58l40 80h92v-40h-68l-40-80H188l-57-100q-2-5-3.5-10t-1.5-10q0-4 5-20l57-100h104l40-80h68v-40h-92l-40 80h-58l78-139q5-10 14.5-15.5T323-800h97q17 0 28.5 11.5T460-760v160h-60l-40 40h100v120h-88l-40-80h-92l-40 40h108l40 80h112v200q0 17-11.5 28.5T420-160h-97Zm237 0q-33 0-56.5-23.5T480-240q0-23 11-40.5t29-28.5v-342q-18-11-29-28.5T480-720q0-33 23.5-56.5T560-800q33 0 56.5 23.5T640-720q0 23-11 40.5T600-651v101l80-48q0-34 23.5-58t56.5-24q33 0 56.5 23.5T840-600q0 33-23.5 56.5T760-520q-11 0-20.5-2.5T721-530l-91 55 101 80q7-3 14-4t15-1q33 0 56.5 23.5T840-320q0 33-23.5 56.5T760-240q-37 0-60.5-28T681-332l-81-65v89q18 11 28.5 28.5T639-240q0 33-23 56.5T560-160Z"
              />
            </svg>
          </div>
          <p class="text-center font-semibold">Mengadopsi teknologi dan praktik inovatif yang memprioritaskan kualitas, keselamatan, dan keberlanjutan lingkungan.</p>
        </div>
        <div class="flex flex-col w-72 h-96 bg-gray-300 mb-4 rounded-2xl shadow-lg shadow-gray-400 pt-12 space-y-6 items-center px-8">
          <div class="w-32 h-32 bg-[#EB5523] rounded-full justify-center items-center flex">
            <svg xmlns="http://www.w3.org/2000/svg" height="72px" viewBox="0 -960 960 960" width="72px" fill="#e3e3e3">
              <path
                d="M475-160q4 0 8-2t6-4l328-328q12-12 17.5-27t5.5-30q0-16-5.5-30.5T817-607L647-777q-11-12-25.5-17.5T591-800q-15 0-30 5.5T534-777l-11 11 74 75q15 14 22 32t7 38q0 42-28.5 70.5T527-522q-20 0-38.5-7T456-550l-75-74-175 175q-3 3-4.5 6.5T200-435q0 8 6 14.5t14 6.5q4 0 8-2t6-4l136-136 56 56-135 136q-3 3-4.5 6.5T285-350q0 8 6 14t14 6q4 0 8-2t6-4l136-135 56 56-135 136q-3 2-4.5 6t-1.5 8q0 8 6 14t14 6q4 0 7.5-1.5t6.5-4.5l136-135 56 56-136 136q-3 3-4.5 6.5T454-180q0 8 6.5 14t14.5 6Zm-1 80q-37 0-65.5-24.5T375-166q-34-5-57-28t-28-57q-34-5-56.5-28.5T206-336q-38-5-62-33t-24-66q0-20 7.5-38.5T149-506l232-231 131 131q2 3 6 4.5t8 1.5q9 0 15-5.5t6-14.5q0-4-1.5-8t-4.5-6L398-777q-11-12-25.5-17.5T342-800q-15 0-30 5.5T285-777L144-635q-9 9-15 21t-8 24q-2 12 0 24.5t8 23.5l-58 58q-17-23-25-50.5T40-590q2-28 14-54.5T87-692l141-141q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l11 11 11-11q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l169 169q23 23 35 53t12 61q0 31-12 60.5T873-437L545-110q-14 14-32.5 22T474-80Zm-99-560Z"
              />
            </svg>
          </div>
          <p class="text-center font-semibold">Membangun kemitraan jangka panjang yang didasarkan pada kepercayaan dan profesionalisme.</p>
        </div>
      </div>
      <ol class="list-decimal pl-6 text-lg">
        <!-- <li>Memberikan layanan perencanaan dan supervisi terbaik untuk proyek gedung, jalan, jembatan, dan sumber daya air.</li>
        <li>Memastikan manajemen konstruksi yang efisien dan memenuhi ekspektasi klien.</li>
        <li>Mengadopsi teknologi dan praktik inovatif yang memprioritaskan kualitas, keselamatan, dan keberlanjutan lingkungan.</li>
        <li>Membangun kemitraan jangka panjang yang didasarkan pada kepercayaan dan profesionalisme.</li> -->
      </ol>
    </div>
  </div>
  <div ref="managementSection" class="flex flex-col px-4 max-w-sm lg:max-w-screen min-h-screen bg-gray-200 justify-center items-center py-16 sm:py-24">
    <h1 class="text-3xl text-[#EB5523] font-bold mb-8">Struktur Manajemen</h1>
    <!-- <h2 class="text-2xl text-[#EB5523] font-semibold mb-8">Direktur Utama</h2> -->
    <directure-card class="hidden lg:flex"/>
    <directure-card-small class="lg:hidden"/>
    <div class="grid grid-cols-1 lg:grid-cols-3 items-center gap-4 lg:gap-12 mt-12">
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

  </div>
</template>

<script>
import { h } from "vue";
import BioCard from "~/components/bio-card.vue";
export default {
  components: {
    BioCard,
  },
  data() {
    return {
      managementTeam: [
        {
          level: 1,
          name: "John Doe",
          title: "Direktur Utama",
          image: "/img/bioprofile.png",
        },
        {
          level: 2,
          name: "Jane Smith",
          title: "Direktur Operasional",
          image: "/img/bioprofile.png",
        },
        {
          level: 2,
          name: "Peter Jones",
          title: "Direktur Keuangan",
          image: "/img/bioprofile.png",
        },
        {
          level: 2,
          name: "Alice Brown",
          title: "Kepala Divisi Teknis",
          image: "/img/bioprofile.png",
        },
        {
          level: 3,
          name: "Rizky Pratama",
          title: "Manajer Pemasaran",
          image: "/img/bioprofile.png",
        },
        {
          level: 3,
          name: "Maya Indah Sari",
          title: "Manajer SDM",
          image: "/img/bioprofile.png",
        },
        {
          level: 3,
          name: "Joko Susilo",
          title: "Kepala Proyek Senior",
          image: "/img/bioprofile.png",
        },
        {
          level: 3,
          name: "Citra Kirana",
          title: "Spesialis Desain Grafis",
          image: "/img/bioprofile.png",
        },
      ],
    };
  },
  mounted() {
    this.initAnimations();
  },
  methods: {
    initAnimations() {
      const gsap = this.$gsap;

      const animateOnScroll = (elem, vars) => {
        if (!elem) return;
        gsap.from(elem, {
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
      gsap.from(this.$refs.heroSection.children, {
        duration: 1,
        autoAlpha: 0,
        y: 30,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.2,
      });

      // Vision Section
      animateOnScroll(this.$refs.visionSection);

      // Mission Section
      const missionSection = this.$refs.missionSection;
      if (missionSection) {
        animateOnScroll(missionSection.querySelector("h1"));
        const missionCards = missionSection.querySelectorAll(".grid > div");
        missionCards.forEach((card, index) => {
          animateOnScroll(card, { delay: index * 0.15 });
        });
      }

      // Management Section
      const managementSection = this.$refs.managementSection;
      if (managementSection) {
        animateOnScroll(managementSection.querySelector("h1"));
        animateOnScroll(managementSection.querySelector("h2"));
        animateOnScroll(managementSection.children[2], { delay: 0.2 }); // Director's bio
        const bioCards = managementSection.querySelectorAll(".grid > div");
        bioCards.forEach((card, index) => {
          animateOnScroll(card, { delay: index * 0.15 });
        });
      }
    },
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
