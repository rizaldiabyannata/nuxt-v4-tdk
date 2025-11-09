<template>
  <div
    ref="heroSection"
    class="relative h-[50vh] lg:h-screen flex flex-col justify-center items-center"
  >
    <div
      class="absolute inset-0 bg-[url('/img/sample/aboutus.png')] bg-cover bg-center brightness-50 -z-10"
    ></div>

    <div class="relative space-y-2 lg:w-1/2 w-11/12 flex flex-col items-center p-4 sm:p-6">
      <h1 class="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-center text-white">
        Building Trust, Shaping the Future
      </h1>
      <p class="text-base sm:text-lg lg:text-xl text-center text-white">
        Our team of professionals brings vision and value to every project we undertake.
      </p>
      <NuxtLink
        to="/our-services"
        class="group flex flex-row w-fit border-white border rounded-full px-3 sm:px-4 py-2 mt-6 sm:mt-8 text-xs sm:text-sm items-center space-x-2 hover:bg-white transition-colors"
      >
        <svg
          width="16"
          height="16"
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
      </NuxtLink>
    </div>
  </div>

  <div
    class="max-w-screen min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 text-justify space-y-8 sm:space-y-12"
  >
    <div
      ref="visionSection"
      class="flex flex-col w-full justify-center items-center space-y-8 sm:space-y-12 lg:px-24"
    >
      <h1 class="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#EB5523]">Our Vision</h1>
      <p class="text-lg sm:text-xl lg:text-2xl text-center font-bold">
        Menjadi pemimpin terpercaya dalam perencanaan dan supervisi proyek,
        menciptakan solusi berkelanjutan dan inovatif yang berkontribusi pada
        pembangunan infrastruktur dan kemajuan masyarakat.
      </p>
    </div>
    <hr />
    <div
      ref="missionSection"
      class="flex flex-col w-full justify-center items-center space-y-8 sm:space-y-12"
    >
      <h1 class="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#EB5523]">Our Mission</h1>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 justify-center items-stretch mb-8"
      >
        <div
          class="flex flex-col w-full bg-gray-300 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 space-y-4 items-center"
        >
          <div
            class="w-20 h-20 bg-[#EB5523] rounded-full justify-center items-center flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48px"
              viewBox="0 -960 960 960"
              width="48px"
              fill="#e3e3e3"
            >
              <path
                d="M760-400v-260L560-800 360-660v60h-80v-100l280-200 280 200v300h-80ZM560-800Zm20 160h40v-40h-40v40Zm-80 0h40v-40h-40v40Zm80 80h40v-40h-40v40Zm-80 0h40v-40h-40v40ZM280-220l278 76 238-74q-5-9-14.5-15.5T760-240H558q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T578-354l-234-86h-64v220ZM40-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L560-60l-280-78v58H40Zm80-80h80v-280h-80v280Z"
              />
            </svg>
          </div>
          <p class="text-center text-sm sm:text-base font-semibold">
            Memberikan layanan perencanaan dan supervisi terbaik untuk proyek
            gedung, jalan, jembatan, dan sumber daya air.
          </p>
        </div>
        <div
          class="flex flex-col w-full bg-gray-300 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 space-y-4 items-center"
        >
          <div
            class="w-20 h-20 bg-[#EB5523] rounded-full justify-center items-center flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48px"
              viewBox="0 -960 960 960"
              width="48px"
              fill="#e3e3e3"
            >
              <path
                d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm40-120q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z"
              />
            </svg>
          </div>
          <p class="text-center text-sm sm:text-base font-semibold">
            Memastikan manajemen konstruksi yang efisien dan memenuhi ekspektasi
            klien.
          </p>
        </div>
        <div
          class="flex flex-col w-full bg-gray-300 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 space-y-4 items-center"
        >
          <div
            class="w-20 h-20 bg-[#EB5523] rounded-full justify-center items-center flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48px"
              viewBox="0 -960 960 960"
              width="48px"
              fill="#e3e3e3"
            >
              <path
                d="M323-160q-11 0-20.5-5.5T288-181l-78-139h58l40 80h92v-40h-68l-40-80H188l-57-100q-2-5-3.5-10t-1.5-10q0-4 5-20l57-100h104l40-80h68v-40h-92l-40 80h-58l78-139q5-10 14.5-15.5T323-800h97q17 0 28.5 11.5T460-760v160h-60l-40 40h100v120h-88l-40-80h-92l-40 40h108l40 80h112v200q0 17-11.5 28.5T420-160h-97Zm237 0q-33 0-56.5-23.5T480-240q0-23 11-40.5t29-28.5v-342q-18-11-29-28.5T480-720q0-33 23.5-56.5T560-800q33 0 56.5 23.5T640-720q0 23-11 40.5T600-651v101l80-48q0-34 23.5-58t56.5-24q33 0 56.5 23.5T840-600q0 33-23.5 56.5T760-520q-11 0-20.5-2.5T721-530l-91 55 101 80q7-3 14-4t15-1q33 0 56.5 23.5T840-320q0 33-23.5 56.5T760-240q-37 0-60.5-28T681-332l-81-65v89q18 11 28.5 28.5T639-240q0 33-23 56.5T560-160Z"
              />
            </svg>
          </div>
          <p class="text-center text-sm sm:text-base font-semibold">
            Mengadopsi teknologi dan praktik inovatif yang memprioritaskan
            kualitas, keselamatan, dan keberlanjutan lingkungan.
          </p>
        </div>
        <div
          class="flex flex-col w-full bg-gray-300 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 space-y-4 items-center"
        >
          <div
            class="w-20 h-20 bg-[#EB5523] rounded-full justify-center items-center flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48px"
              viewBox="0 -960 960 960"
              width="48px"
              fill="#e3e3e3"
            >
              <path
                d="M475-160q4 0 8-2t6-4l328-328q12-12 17.5-27t5.5-30q0-16-5.5-30.5T817-607L647-777q-11-12-25.5-17.5T591-800q-15 0-30 5.5T534-777l-11 11 74 75q15 14 22 32t7 38q0 42-28.5 70.5T527-522q-20 0-38.5-7T456-550l-75-74-175 175q-3 3-4.5 6.5T200-435q0 8 6 14.5t14 6.5q4 0 8-2t6-4l136-136 56 56-135 136q-3 3-4.5 6.5T285-350q0 8 6 14t14 6q4 0 8-2t6-4l136-135 56 56-135 136q-3 2-4.5 6t-1.5 8q0 8 6 14t14 6q4 0 7.5-1.5t6.5-4.5l136-135 56 56-136 136q-3 3-4.5 6.5T454-180q0 8 6.5 14t14.5 6Zm-1 80q-37 0-65.5-24.5T375-166q-34-5-57-28t-28-57q-34-5-56.5-28.5T206-336q-38-5-62-33t-24-66q0-20 7.5-38.5T149-506l232-231 131 131q2 3 6 4.5t8 1.5q9 0 15-5.5t6-14.5q0-4-1.5-8t-4.5-6L398-777q-11-12-25.5-17.5T342-800q-15 0-30 5.5T285-777L144-635q-9 9-15 21t-8 24q-2 12 0 24.5t8 23.5l-58 58q-17-23-25-50.5T40-590q2-28 14-54.5T87-692l141-141q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l11 11 11-11q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l169 169q23 23 35 53t12 61q0 31-12 60.5T873-437L545-110q-14 14-32.5 22T474-80Zm-99-560Z"
              />
            </svg>
          </div>
          <p class="text-center text-sm sm:text-base font-semibold">
            Membangun kemitraan jangka panjang yang didasarkan pada kepercayaan
            dan profesionalisme.
          </p>
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
  <div
    ref="managementSection"
    class="flex flex-col max-w-screen min-h-screen bg-gray-200 justify-center items-center py-16 sm:py-24"
  >
    <h1 class="text-3xl text-[#EB5523] font-bold">Struktur Manajemen</h1>
    <h2 class="text-2xl text-[#EB5523] font-semibold mb-8">Direktur Utama</h2>
    <div class="flex flex-col lg:flex-row w-full items-center px-6 lg:w-180 h-fit pt-6 gap-0">
      <!-- Image untuk Desktop (outside card) -->
      <img
        src="/img/Alireza.jpg"
        alt="Alireza"
        class="hidden lg:block lg:w-64 h-auto object-cover shadow-lg shadow-gray-400 rounded-lg"
        loading="lazy"
        placeholder
      />
      <div
        class="flex flex-col bg-white h-auto w-full my-2 lg:my-4 shadow-lg shadow-gray-400 p-8 justify-center space-y-4 rounded-xl lg:rounded-r-lg lg:rounded-l-none overflow-hidden"
      >
        <!-- Image untuk Mobile (inside card) -->
        <div class="flex justify-center lg:hidden -mx-8 -mt-8 mb-4 pt-4">
          <img
            src="/img/Alireza.jpg"
            alt="Alireza"
            class="w-full max-w-[240px] h-auto aspect-square object-cover rounded-lg"
            loading="lazy"
            placeholder
          />
        </div>
        <h1 class="text-black font-bold text-lg lg:text-2xl">Firman</h1>
        <h2 class="text-black font-semibold text-md lg:text-xl">Direktur Utama</h2>
        <p class="text-black text-xs lg:text-base text-justify lg:mt-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati,
          sapiente ea ab minima quae alias odio velit labore, mollitia
          cupiditate delectus, molestias nobis eius? Quis rem nobis,
          perferendis, sit fuga adipisci eum asperiores ad magni, id explicabo
          molestias minus quidem.
        </p>
        <div
          class="flex flex-row space-x-6 w-full justify-center items-center"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z"
              fill="#727B76"
            />
            <path
              d="M2 8V18"
              stroke="#727B76"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 8V18"
              stroke="#727B76"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 13C8 10.24 10.24 8 13 8C15.76 8 18 10.24 18 13V18"
              stroke="#727B76"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            width="11"
            height="20"
            viewBox="0 0 11 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 11.5H9.5L10.5 7.5H7V5.5C7 4.47 7 3.5 9 3.5H10.5V0.14C10.174 0.0970001 8.943 0 7.643 0C4.928 0 3 1.657 3 4.7V7.5H0V11.5H3V20H7V11.5Z"
              fill="#727B76"
            />
          </svg>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.028 0C12.153 0.003 12.724 0.009 13.217 0.023L13.411 0.03C13.635 0.038 13.856 0.0479999 14.123 0.0599999C15.187 0.11 15.913 0.278 16.55 0.525C17.21 0.779 17.766 1.123 18.322 1.678C18.8307 2.17773 19.2242 2.78247 19.475 3.45C19.722 4.087 19.89 4.813 19.94 5.878C19.952 6.144 19.962 6.365 19.97 6.59L19.976 6.784C19.991 7.276 19.997 7.847 19.999 8.972L20 9.718V11.028C20.0025 11.7574 19.9948 12.4868 19.977 13.216L19.971 13.41C19.963 13.635 19.953 13.856 19.941 14.122C19.891 15.187 19.721 15.912 19.475 16.55C19.2242 17.2175 18.8307 17.8223 18.322 18.322C17.8223 18.8307 17.2175 19.2242 16.55 19.475C15.913 19.722 15.187 19.89 14.123 19.94L13.411 19.97L13.217 19.976C12.724 19.99 12.153 19.997 11.028 19.999L10.282 20H8.97302C8.24328 20.0026 7.51354 19.9949 6.78402 19.977L6.59002 19.971C6.35263 19.962 6.11529 19.9517 5.87802 19.94C4.81402 19.89 4.08802 19.722 3.45002 19.475C2.78285 19.2241 2.17846 18.8306 1.67902 18.322C1.16996 17.8224 0.776128 17.2176 0.52502 16.55C0.27802 15.913 0.110019 15.187 0.0600194 14.122L0.0300195 13.41L0.0250196 13.216C0.00658562 12.4868 -0.00174861 11.7574 1.94806e-05 11.028V8.972C-0.00274841 8.2426 0.0045857 7.5132 0.0220196 6.784L0.0290195 6.59C0.0370195 6.365 0.0470195 6.144 0.0590195 5.878C0.109019 4.813 0.277019 4.088 0.524019 3.45C0.775714 2.7822 1.17024 2.17744 1.68002 1.678C2.17917 1.16955 2.78321 0.776074 3.45002 0.525C4.08802 0.278 4.81302 0.11 5.87802 0.0599999C6.14402 0.0479999 6.36602 0.038 6.59002 0.03L6.78402 0.0239999C7.51321 0.00623271 8.24261 -0.0014347 8.97202 0.000999928L11.028 0ZM10 5C8.67394 5 7.40217 5.52678 6.46449 6.46447C5.5268 7.40215 5.00002 8.67392 5.00002 10C5.00002 11.3261 5.5268 12.5979 6.46449 13.5355C7.40217 14.4732 8.67394 15 10 15C11.3261 15 12.5979 14.4732 13.5356 13.5355C14.4732 12.5979 15 11.3261 15 10C15 8.67392 14.4732 7.40215 13.5356 6.46447C12.5979 5.52678 11.3261 5 10 5ZM10 7C10.394 6.99993 10.7841 7.07747 11.1481 7.22817C11.5121 7.37887 11.8429 7.5998 12.1215 7.87833C12.4001 8.15686 12.6211 8.48754 12.772 8.85149C12.9228 9.21544 13.0005 9.60553 13.0005 9.9995C13.0006 10.3935 12.9231 10.7836 12.7723 11.1476C12.6216 11.5116 12.4007 11.8423 12.1222 12.121C11.8437 12.3996 11.513 12.6206 11.149 12.7714C10.7851 12.9223 10.395 12.9999 10.001 13C9.20537 13 8.44231 12.6839 7.8797 12.1213C7.31709 11.5587 7.00102 10.7956 7.00102 10C7.00102 9.20435 7.31709 8.44129 7.8797 7.87868C8.44231 7.31607 9.20537 7 10.001 7M15.251 3.5C14.9195 3.5 14.6016 3.6317 14.3671 3.86612C14.1327 4.10054 14.001 4.41848 14.001 4.75C14.001 5.08152 14.1327 5.39946 14.3671 5.63388C14.6016 5.8683 14.9195 6 15.251 6C15.5825 6 15.9005 5.8683 16.1349 5.63388C16.3693 5.39946 16.501 5.08152 16.501 4.75C16.501 4.41848 16.3693 4.10054 16.1349 3.86612C15.9005 3.6317 15.5825 3.5 15.251 3.5Z"
              fill="#727B76"
            />
          </svg>
          <svg
            width="20"
            height="20"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_439_869)">
              <mask
                id="mask0_439_869"
                style="mask-type: luminance"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="14"
                height="14"
              >
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
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full px-8 lg:px-8 mt-12">
      <bio-card
        v-for="director in otherDirectors"
        :key="director.name"
        :name="director.name"
        :title="director.title"
        :image="director.image"
      />
    </div>

  </div>
  <div
    ref="legalitySection"
    class="flex flex-col w-full min-h-screen bg-gray-50 justify-center items-center py-16 sm:py-24 px-4 sm:px-8"
  >
    <div class="flex flex-col w-full max-w-4xl space-y-12">
      <div class="flex flex-col space-y-2 justify-center items-center">
        <h1 class="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#EB5523]">
          Legalitas Perusahaan
        </h1>
        <p class="text-sm sm:text-base lg:text-lg text-center text-gray-600 mt-4">
          Dokumen resmi yang menandakan status dan kepercayaan perusahaan kami
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <!-- Card 1: SIUJK -->
        <div
          class="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 p-6 sm:p-8 space-y-4 border border-gray-200"
        >
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-[#EB5523] rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="white"
              >
                <path
                  d="M440-80q-17 0-28.5-11.5T400-120v-206q-37-7-61.5-32t-24.5-65q0-44 31-74t75-30q44 0 75 30t31 74q0 40-24.5 65T560-326v206q0 17-11.5 28.5T520-80h-80Zm40-280q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-120Z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-800">SIUJK</h3>
              <p class="text-sm text-gray-500">Surat Izin Usaha Jasa Konstruksi</p>
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-gray-700 font-semibold">No. SIUJK:</p>
            <p class="text-lg text-[#EB5523] font-bold">2020001-0115-0603-1055-358</p>
            <p class="text-sm text-gray-600 mt-2">
              Dikeluarkan oleh Lalu Sriwibawa, S.H.
            </p>
          </div>
          <div class="pt-4 border-t border-gray-200">
            <p class="text-xs text-gray-500">
              <span class="font-semibold">Tanggal Berlaku:</span> 24 Juli 1998
            </p>
          </div>
        </div>

        <!-- Card 2: No Surat Izin/SBU RK001 -->
        <div
          class="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 p-6 sm:p-8 space-y-4 border border-gray-200"
        >
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-[#EB5523] rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="white"
              >
                <path
                  d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80Z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-800">Surat Izin/SBU</h3>
              <p class="text-sm text-gray-500">RK001</p>
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-gray-700 font-semibold">No Surat Izin/SBU:</p>
            <p class="text-lg text-[#EB5523] font-bold">812011621170000002</p>
            <p class="text-sm text-gray-600 mt-2">
              Nomor registrasi untuk klasifikasi RK001
            </p>
          </div>
          <div class="pt-4 border-t border-gray-200">
            <p class="text-xs text-gray-500">
              <span class="font-semibold">Status:</span> Aktif dan Terdaftar
            </p>
          </div>
        </div>

        <!-- Card 3: No Surat Izin/SBU RK002 -->
        <div
          class="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 p-6 sm:p-8 space-y-4 border border-gray-200"
        >
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-[#EB5523] rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="white"
              >
                <path
                  d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm280-170q83 0 141.5-58.5T680-570q0-83-58.5-141.5T480-770q-83 0-141.5 58.5T280-570q0 83 58.5 141.5T480-370Zm0-60q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-800">Surat Izin/SBU</h3>
              <p class="text-sm text-gray-500">RK002</p>
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-gray-700 font-semibold">No Surat Izin/SBU:</p>
            <p class="text-lg text-[#EB5523] font-bold">812011621170000001</p>
            <p class="text-sm text-gray-600 mt-2">
              Nomor registrasi untuk klasifikasi RK002
            </p>
          </div>
          <div class="pt-4 border-t border-gray-200">
            <p class="text-xs text-gray-500">
              <span class="font-semibold">Status:</span> Aktif dan Terdaftar
            </p>
          </div>
        </div>

        <!-- Card 4: No Surat Izin/SBU RK003 -->
        <div
          class="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 p-6 sm:p-8 space-y-4 border border-gray-200"
        >
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-[#EB5523] rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="white"
              >
                <path
                  d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-800">Surat Izin/SBU</h3>
              <p class="text-sm text-gray-500">RK003</p>
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-gray-700 font-semibold">No Surat Izin/SBU:</p>
            <p class="text-lg text-[#EB5523] font-bold">812011621170010003</p>
            <p class="text-sm text-gray-600 mt-2">
              Nomor registrasi untuk klasifikasi RK003
            </p>
          </div>
          <div class="pt-4 border-t border-gray-200">
            <p class="text-xs text-gray-500">
              <span class="font-semibold">Status:</span> Aktif dan Terdaftar
            </p>
          </div>
        </div>
      </div>
    </div>
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
          name: "Andi Firman, ST.",
          title: "Direktur Utama",
          image: "/img/Alireza.jpg",
        },
        {
          level: 2,
          name: "Farida, AMd.",
          title: "Direktur Keuangan",
          image: "/img/Alireza.jpg",
        },
        {
          level: 2,
          name: "Ahmad Mujahid, ST.",
          title: "Direktur Teknik",
          image: "/img/Alireza.jpg",
        },
        {
          level: 2,
          name: "Mujiburrahman, ST.",
          title: "Direktur Marketing",
          image: "/img/Alireza.jpg",
        },
        {
          level: 3,
          name: "Tim Bendahara & Administrasi",
          title: "Finance & Admin Staff",
          image: "/img/Alireza.jpg",
        },
        {
          level: 3,
          name: "Devisi Perencanaan",
          title: "Planning Division",
          image: "/img/Alireza.jpg",
        },
        {
          level: 3,
          name: "Devisi Pengawasan",
          title: "Supervision Division",
          image: "/img/Alireza.jpg",
        },
        {
          level: 3,
          name: "Devisi Non Jasa Konstruksi",
          title: "Non Construction Services",
          image: "/img/Alireza.jpg",
        },
        {
          level: 3,
          name: "Staf Marketing",
          title: "Marketing Staff",
          image: "/img/Alireza.jpg",
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

      // Legality Section
      const legalitySection = this.$refs.legalitySection;
      if (legalitySection) {
        animateOnScroll(legalitySection.querySelector("h1"));
        animateOnScroll(legalitySection.querySelector("p"));
        const legalityCards = legalitySection.querySelectorAll(".grid > div");
        legalityCards.forEach((card, index) => {
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
