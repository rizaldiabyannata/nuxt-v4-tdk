<template>
  <div class="relative min-h-dvh flex flex-col">
    <div
      class="absolute inset-0 bg-[url('/img/sample/sample-1.jpeg')] bg-cover bg-center brightness-50 -z-10"
    ></div>
    <div class="flex flex-col flex-grow w-full justify-center items-center p-4">
      <div
        v-if="highlightedPortfolios.length > 0"
        ref="heroContent"
        class="flex flex-col w-full max-w-xl sm:w-4/5 md:w-3/5 lg:w-2/5 justify-center items-center text-center"
      >
        <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl text-white">
          {{ highlightedPortfolios[0]?.title }}
        </h1>
        <p class="mt-2 text-base lg:text-lg text-white">
          {{
            highlightedPortfolios[0]?.shortDescription.length > 100
              ? highlightedPortfolios[0]?.shortDescription.substring(0, 200) +
                "..."
              : highlightedPortfolios[0]?.shortDescription
          }}
        </p>
        <NuxtLink
          ref="heroButton"
          :to="
            highlightedPortfolios[0]?.link ||
            '/portfolio/' + highlightedPortfolios[0]?.slug
          "
          class="flex flex-row shadow-xl backdrop-blur-lg border border-white rounded-full px-4 py-2 mt-6 text-sm items-center space-x-2 hover:bg-white hover:text-black group transition-colors"
        >
          <svg
            width="13"
            height="14"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.62842 14.4654V1.89356C7.62842 1.57481 7.73642 1.30781 7.95242 1.09256C8.16842 0.877309 8.43542 0.769309 8.75342 0.768559C9.07142 0.767809 9.33842 0.875809 9.55442 1.09256C9.77042 1.30931 9.87842 1.57631 9.87842 1.89356V14.4654L15.3909 8.95293C15.6159 8.72793 15.8784 8.61993 16.1784 8.62893C16.4784 8.63793 16.7409 8.75531 16.9659 8.98106C17.1722 9.20606 17.2802 9.46855 17.2899 9.76855C17.2997 10.0686 17.1917 10.3311 16.9659 10.5561L9.54092 17.9811C9.42842 18.0936 9.30654 18.1734 9.17529 18.2207C9.04404 18.2679 8.90342 18.2912 8.75342 18.2904C8.60342 18.2897 8.46279 18.2664 8.33154 18.2207C8.20029 18.1749 8.07842 18.0951 7.96592 17.9811L0.540918 10.5561C0.334668 10.3498 0.231543 10.0922 0.231543 9.78318C0.231543 9.47418 0.334668 9.20681 0.540918 8.98106C0.765918 8.75606 1.03292 8.64356 1.34192 8.64356C1.65092 8.64356 1.91829 8.75606 2.14404 8.98106L7.62842 14.4654Z"
              fill="#EB5523"
            />
          </svg>
          <p class="font-semibold text-white group-hover:text-black">
            Learn More
          </p>
        </NuxtLink>
      </div>
      <div
        v-else
        class="flex flex-col w-full max-w-xl sm:w-4/5 md:w-3/5 lg:w-2/5 justify-center items-center text-center py-16"
      >
        <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
          Temukan Solusi Proyek Terbaik Bersama Kami
        </h1>
        <p class="mt-2 text-base lg:text-lg text-white mb-6">
          Kami siap membantu Anda mewujudkan proyek impian. Hubungi tim kami
          untuk konsultasi gratis dan penawaran terbaik!
        </p>
        <NuxtLink
          to="/contact"
          class="flex flex-row items-center space-x-2 px-6 py-3 rounded-full border border-white bg-white/20 backdrop-blur-lg shadow-lg text-white hover:bg-white/40 group transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.62842 14.4654V1.89356C7.62842 1.57481 7.73642 1.30781 7.95242 1.09256C8.16842 0.877309 8.43542 0.769309 8.75342 0.768559C9.07142 0.767809 9.33842 0.875809 9.55442 1.09256C9.77042 1.30931 9.87842 1.57631 9.87842 1.89356V14.4654L15.3909 8.95293C15.6159 8.72793 15.8784 8.61993 16.1784 8.62893C16.4784 8.63793 16.7409 8.75531 16.9659 8.98106C17.1722 9.20606 17.2802 9.46855 17.2899 9.76855C17.2997 10.0686 17.1917 10.3311 16.9659 10.5561L9.54092 17.9811C9.42842 18.0936 9.30654 18.1734 9.17529 18.2207C9.04404 18.2679 8.90342 18.2912 8.75342 18.2904C8.60342 18.2897 8.46279 18.2664 8.33154 18.2207C8.20029 18.1749 8.07842 18.0951 7.96592 17.9811L0.540918 10.5561C0.334668 10.3498 0.231543 10.0922 0.231543 9.78318C0.231543 9.47418 0.334668 9.20681 0.540918 8.98106C0.765918 8.75606 1.03292 8.64356 1.34192 8.64356C1.65092 8.64356 1.91829 8.75606 2.14404 8.98106L7.62842 14.4654Z"
              fill="white"
            />
          </svg>
          <p class="font-semibold drop-shadow">Hubungi Kami</p>
        </NuxtLink>
      </div>
    </div>
  </div>

  <div
    class="flex min-h-screen bg-white justify-center items-center px-4 py-16 sm:px-8 sm:py-24"
  >
    <div
      class="flex flex-col bg-[url(/img/grafisbg.png)] bg-cover bg-no-repeat w-full max-w-3xl lg:max-w-4xl aspect-video sm:aspect-auto sm:min-h-[400px] md:min-h-[500px] rounded-2xl lg:rounded-3xl text-white p-8 sm:p-12 space-y-3 sm:space-y-4 justify-center"
    >
      <p class="font-bold text-3xl md:text-4xl">Visi Kami</p>
      <p class="mt-4 text-lg md:text-xl">
        Menjadi pemimpin terpercaya dalam perencanaan dan supervisi proyek,
        menciptakan solusi berkelanjutan dan inovatif yang berkontribusi pada
        pembangunan infrastruktur dan kemajuan masyarakat.
      </p>
      <NuxtLink
        to="about-us"
        class="flex flex-row items-center border-white border w-fit rounded-full px-4 py-2 space-x-2 mt-8 hover:bg-white/20 transition-colors"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.1969 10.625H1.625C1.30625 10.625 1.03925 10.517 0.824004 10.301C0.608754 10.085 0.500754 9.818 0.500004 9.5C0.499254 9.182 0.607254 8.915 0.824004 8.699C1.04075 8.483 1.30775 8.375 1.625 8.375H14.1969L8.68437 2.8625C8.45937 2.6375 8.35138 2.375 8.36038 2.075C8.36938 1.775 8.48675 1.5125 8.7125 1.2875C8.9375 1.08125 9.2 0.973246 9.5 0.963496C9.8 0.953746 10.0625 1.06175 10.2875 1.2875L17.7125 8.7125C17.825 8.825 17.9049 8.94687 17.9521 9.07812C17.9994 9.20937 18.0226 9.35 18.0219 9.5C18.0211 9.65 17.9979 9.79062 17.9521 9.92187C17.9064 10.0531 17.8265 10.175 17.7125 10.2875L10.2875 17.7125C10.0813 17.9187 9.82362 18.0219 9.51462 18.0219C9.20563 18.0219 8.93825 17.9187 8.7125 17.7125C8.4875 17.4875 8.375 17.2205 8.375 16.9115C8.375 16.6025 8.4875 16.3351 8.7125 16.1094L14.1969 10.625Z"
            fill="#EB5523"
          />
        </svg>
        <p class="text-white">About Us</p>
      </NuxtLink>
    </div>
  </div>

  <div
    class="flex flex-col min-h-screen bg-[#DDDDDD] justify-start items-center px-4 py-16 sm:px-8 sm:py-24"
  >
    <div class="flex flex-col w-full max-w-6xl justify-center items-center">
      <div class="flex flex-col w-full items-start">
        <div>
          <h1 class="text-black text-2xl md:text-3xl font-semibold">
            Our Portfolio
          </h1>
          <p class="w-full font-bold text-[#EB5523] text-4xl md:text-5xl mt-2">
            Lorem Ipsum
          </p>
        </div>
        <div class="flex w-full items-end justify-end">
          <NuxtLink
            to="/portfolio"
            class="flex flex-row text-black items-center mt-4 hover:text-opacity-75 hover:text-orange-400"
          >
            <p class="font-semibold mr-1">More</p>
            <svg
              width="32"
              height="18"
              viewBox="0 0 44 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-auto sm:w-8 md:w-11"
            >
              <path
                d="M14.475 12.5L7.125 5.15C6.875 4.9 6.754 4.604 6.762 4.262C6.77 3.92 6.89933 3.62434 7.15 3.375C7.40067 3.12567 7.69667 3.00067 8.038 3C8.37933 2.99934 8.675 3.12434 8.925 3.375L16.6 11.075C16.8 11.275 16.95 11.5 17.05 11.75C17.15 12 17.2 12.25 17.2 12.5C17.2 12.75 17.15 13 17.05 13.25C16.95 13.5 16.8 13.725 16.6 13.925L8.9 21.625C8.65 21.875 8.35833 21.996 8.025 21.988C7.69167 21.98 7.4 21.8507 7.15 21.6C6.9 21.3493 6.775 21.0533 6.775 20.712C6.775 20.3707 6.9 20.075 7.15 19.825L14.475 12.5Z"
                fill="currentColor"
              />
              <path
                d="M24.475 12.5L17.125 5.15C16.875 4.9 16.754 4.604 16.762 4.262C16.77 3.92 16.8993 3.62434 17.15 3.375C17.4007 3.12567 17.6967 3.00067 18.038 3C18.3793 2.99934 18.675 3.12434 18.925 3.375L26.6 11.075C26.8 11.275 26.95 11.5 27.05 11.75C27.15 12 27.2 12.25 27.2 12.5C27.2 12.75 27.15 13 27.05 13.25C26.95 13.5 26.8 13.725 26.6 13.925L18.9 21.625C18.65 21.875 18.3583 21.996 18.025 21.988C17.6917 21.98 17.4 21.8507 17.15 21.6C16.9 21.3493 16.775 21.0533 16.775 20.712C16.775 20.3707 16.9 20.075 17.15 19.825L24.475 12.5Z"
                fill="currentColor"
              />
              <path
                d="M34.475 12.5L27.125 5.15C26.875 4.9 26.754 4.604 26.762 4.262C26.77 3.92 26.8993 3.62434 27.15 3.375C27.4007 3.12567 27.6967 3.00067 28.038 3C28.3793 2.99934 28.675 3.12434 28.925 3.375L36.6 11.075C36.8 11.275 36.95 11.5 37.05 11.75C37.15 12 37.2 12.25 37.2 12.5C37.2 12.75 37.15 13 37.05 13.25C36.95 13.5 36.8 13.725 36.6 13.925L28.9 21.625C28.65 21.875 28.3583 21.996 28.025 21.988C27.6917 21.98 27.4 21.8507 27.15 21.6C26.9 21.3493 26.775 21.0533 26.775 20.712C26.775 20.3707 26.9 20.075 27.15 19.825L34.475 12.5Z"
                fill="currentColor"
              />
            </svg>
          </NuxtLink>
        </div>
      </div>
      <div v-if="pending" class="w-full mt-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="lg:col-span-2 lg:row-span-2">
            <SkeletonHomepageCardSkeleton />
          </div>
          <SkeletonHomepageCardSmallSkeleton />
          <SkeletonHomepageCardSmallSkeleton />
          <SkeletonHomepageCardSmallSkeleton />
          <SkeletonHomepageCardSmallSkeleton />
        </div>
      </div>
      <div v-else-if="highlightedPortfolios.length > 0" class="w-full mt-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="(portfolio, index) in highlightedPortfolios.slice(0, 5)"
            :key="portfolio._id"
            :class="{
              'lg:col-span-2 lg:row-span-2': index === 0,
            }"
          >
            <component
              :is="index === 0 ? 'HomepageCard' : 'HomepageCardSmall'"
              :title="portfolio.title"
              :shortDescription="portfolio.shortDescription"
              :imageUrl="portfolio.coverImage"
              :slug="portfolio.slug"
              :navigateTO="`/portfolio/${portfolio.slug}`"
              class="h-full"
            />
          </div>
        </div>
      </div>
      <div v-else class="text-center py-16">
        <p class="text-gray-500 text-lg">No portfolios to show.</p>
      </div>
    </div>
  </div>

  <div
    class="flex flex-col min-h-screen bg-white justify-start items-center px-4 py-16 sm:px-8 sm:py-24"
  >
    <div class="flex flex-col w-full max-w-7xl justify-center items-center">
      <div
        class="flex flex-col w-full justify-start items-start sm:items-center text-start sm:text-center mb-12"
      >
        <h1 class="text-black text-2xl md:text-3xl font-semibold">
          News & Report
        </h1>
        <p class="font-bold text-[#EB5523] text-4xl md:text-5xl">
          Popular News
        </p>
      </div>
      <div
        v-if="pending"
        class="carousel carousel-center bg-transparent rounded-2xl lg:rounded-3xl w-full max-w-7xl space-x-4 sm:space-x-8 p-4"
      >
        <div class="carousel-item" v-for="i in 3" :key="i">
          <SkeletonCarouselCardSkeleton />
        </div>
      </div>
      <div
        v-else-if="featuredBlogs.length > 0"
        ref="newsCarousel"
        class="carousel carousel-center bg-transparent rounded-2xl lg:rounded-3xl w-full max-w-7xl space-x-4 sm:space-x-8 p-4"
      >
        <div
          v-for="blog in featuredBlogs"
          :key="blog._id"
          class="carousel-item"
        >
          <carousel-card
            :title="blog.title"
            :shortDescription="blog.summary"
            :imageUrl="blog.coverImage"
            :createdAt="blog.createdAt"
            :slug="blog.slug"
          />
        </div>
      </div>
      <div v-else class="text-center py-16">
        <p class="text-gray-500 text-lg">No article to show.</p>
      </div>
    </div>
  </div>

  <div
    class="logos group bg-white relative overflow-hidden whitespace-nowrap py-12"
  >
    <div
      class="animate-marquee group-hover:[animation-play-state:paused] inline-block w-max"
    >
      <NuxtImg
        class="mx-8 sm:mx-12 md:mx-16 inline h-12 sm:h-16"
        src="/img/tesla.png"
        alt="Tesla"
        loading="lazy"
      />
      <NuxtImg
        class="mx-8 sm:mx-12 md:mx-16 inline h-12 sm:h-16"
        src="/img/porsche.png"
        alt="Porsche"
        loading="lazy"
      />
      <NuxtImg
        class="mx-8 sm:mx-12 md:mx-16 inline h-12 sm:h-16"
        src="/img/aston-martin.png"
        alt="Aston Martin"
        loading="lazy"
      />
      <NuxtImg
        class="mx-8 sm:mx-12 md:mx-16 inline h-12 sm:h-16"
        src="/img/nike.png"
        alt="Nike"
        loading="lazy"
      />
      <NuxtImg
        class="mx-8 sm:mx-12 md:mx-16 inline h-12 sm:h-16"
        src="/img/jordan.png"
        alt="Jordan"
        loading="lazy"
      />
      <NuxtImg
        class="mx-8 sm:mx-12 md:mx-16 inline h-12 sm:h-16"
        src="/img/adidas.png"
        alt="Adidas"
        loading="lazy"
      />
      <NuxtImg
        class="mx-8 sm:mx-12 md:mx-16 inline h-12 sm:h-16"
        src="/img/bmw.png"
        alt="BMW"
        loading="lazy"
      />
    </div>
    <div
      class="animate-marquee group-hover:[animation-play-state:paused] inline-block w-max"
      aria-hidden="true"
    >
      <NuxtImg
        class="mx-8 sm:mx-12 md:mx-16 inline h-12 sm:h-16"
        src="/img/tesla.png"
        alt="Tesla"
        loading="lazy"
      />
      <NuxtImg
        class="mx-8 sm:mx-12 md:mx-16 inline h-12 sm:h-16"
        src="/img/porsche.png"
        alt="Porsche"
        loading="lazy"
      />
      <NuxtImg
        class="mx-8 sm:mx-12 md:mx-16 inline h-12 sm:h-16"
        src="/img/aston-martin.png"
        alt="Aston Martin"
        loading="lazy"
      />
      <NuxtImg
        class="mx-8 sm:mx-12 md:mx-16 inline h-12 sm:h-16"
        src="/img/nike.png"
        alt="Nike"
        loading="lazy"
      />
      <NuxtImg
        class="mx-8 sm:mx-12 md:mx-16 inline h-12 sm:h-16"
        src="/img/jordan.png"
        alt="Jordan"
        loading="lazy"
      />
      <Nuxt_img
        class="mx-8 sm:mx-12 md:mx-16 inline h-12 sm:h-16"
        src="/img/adidas.png"
        alt="Adidas"
        loading="lazy"
      />
      <NuxtImg
        class="mx-8 sm:mx-12 md:mx-16 inline h-12 sm:h-16"
        src="/img/bmw.png"
        alt="BMW"
        loading="lazy"
      />
    </div>
  </div>

  <div
    class="flex flex-col md:flex-row min-h-screen bg-[#DDDDDD] justify-center items-stretch"
  >
    <div
      class="flex flex-col w-full md:w-3/5 lg:w-1/2 justify-center p-8 md:p-16"
    >
      <h1 class="text-4xl font-bold text-black">Contact Us</h1>
      <p class="text-black mt-4 text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
        perferendis eos necessitatibus, totam earum quasi a.
      </p>
      <form class="mt-8 space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-900"
            >Name</label
          >
          <div class="mt-2">
            <input
              type="text"
              name="name"
              id="name"
              class="block w-full rounded-xl py-2 sm:py-2.5 px-3 bg-white text-base text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm leading-6"
            />
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-900"
            >Email</label
          >
          <div class="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              class="block w-full rounded-xl py-2 sm:py-2.5 px-3 bg-white text-base text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm leading-6"
            />
          </div>
        </div>
        <div>
          <label for="message" class="block text-sm font-medium text-gray-900"
            >Message</label
          >
          <div class="mt-2">
            <textarea
              name="message"
              id="message"
              rows="5"
              class="block w-full rounded-xl bg-white px-3 py-2 sm:py-2.5 text-base text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm leading-6"
            ></textarea>
          </div>
        </div>
        <a
          href="#"
          class="inline-flex flex-row items-center justify-center border-black border w-fit rounded-full px-5 py-2 sm:px-6 sm:py-2.5 space-x-2 mt-6 sm:mt-8 text-sm sm:text-base hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 19 19"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.1969 10.625H1.625C1.30625 10.625 1.03925 10.517 0.824004 10.301C0.608754 10.085 0.500754 9.818 0.500004 9.5C0.499254 9.182 0.607254 8.915 0.824004 8.699C1.04075 8.483 1.30775 8.375 1.625 8.375H14.1969L8.68437 2.8625C8.45937 2.6375 8.35138 2.375 8.36038 2.075C8.36938 1.775 8.48675 1.5125 8.7125 1.2875C8.9375 1.08125 9.2 0.973246 9.5 0.963496C9.8 0.953746 10.0625 1.06175 10.2875 1.2875L17.7125 8.7125C17.825 8.825 17.9049 8.94687 17.9521 9.07812C17.9994 9.20937 18.0226 9.35 18.0219 9.5C18.0211 9.65 17.9979 9.79062 17.9521 9.92187C17.9064 10.0531 17.8265 10.175 17.7125 10.2875L10.2875 17.7125C10.0813 17.9187 9.82362 18.0219 9.51462 18.0219C9.20563 18.0219 8.93825 17.9187 8.7125 17.7125C8.4875 17.4875 8.375 17.2205 8.375 16.9115C8.375 16.6025 8.4875 16.3351 8.7125 16.1094L14.1969 10.625Z"
            />
          </svg>
          <p class="font-semibold text-black">Send</p>
        </a>
      </form>
    </div>
    <div
      class="hidden md:flex h-auto md:h-full w-full md:w-2/5 lg:w-1/2 bg-[url(/img/form-pict.jpg)] bg-cover bg-center"
    ></div>
  </div>
</template>

<script>
import { nextTick } from "vue";
import SkeletonHomepageCardSkeleton from "~/components/skeleton/HomepageCardSkeleton.vue";
import SkeletonHomepageCardSmallSkeleton from "~/components/skeleton/HomepageCardSmallSkeleton.vue";
import SkeletonCarouselCardSkeleton from "~/components/skeleton/CarouselCardSkeleton.vue";
import HomepageCard from "~/components/homepage-card.vue";
import HomepageCardSmall from "~/components/homepage-card-small.vue";
import CarouselCard from "~/components/carousel-card.vue";

export default {
  name: "HomePage",
  components: {
    SkeletonHomepageCardSkeleton,
    SkeletonHomepageCardSmallSkeleton,
    SkeletonCarouselCardSkeleton,
    HomepageCard,
    HomepageCardSmall,
    CarouselCard,
  },
  data() {
    return {
      highlightedPortfolios: [],
      featuredBlogs: [],
    };
  },
  setup() {
    const { $api } = useNuxtApp();
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBaseUrl;

    const { data: contentData, pending } = useAsyncData(
      "content-tracking",
      async () => {
        try {
          const response = await $api.get(`/api/content-tracking/`);
          console.log("API Response:", response.data);
          return response.data;
        } catch (error) {
          console.error("Gagal mengambil data:", error);
          return { highlightedPortfolios: [], featuredBlogs: [] };
        }
      }
    );

    return {
      contentData,
      pending,
      baseUrl,
    };
  },
  mounted() {
    if (this.contentData) {
      this.highlightedPortfolios = this.contentData.highlightedPortfolios.map(
        (portfolio) => ({
          ...portfolio,
          coverImage: this.baseUrl + portfolio.coverImage,
        })
      );
      this.featuredBlogs = this.contentData.featuredBlogs.map((blog) => ({
        ...blog,
        coverImage: this.baseUrl + blog.coverImage,
      }));
    }
  },
  watch: {
    contentData: {
      handler(newData) {
        if (newData) {
          console.log("Watcher triggered with new data:", newData);
          this.highlightedPortfolios = newData.highlightedPortfolios.map(
            (portfolio) => ({
              ...portfolio,
              coverImage: this.baseUrl + portfolio.coverImage,
            })
          );
          this.featuredBlogs = newData.featuredBlogs.map((blog) => ({
            ...blog,
            coverImage: this.baseUrl + blog.coverImage,
          }));

          nextTick(() => {
            this.initAnimations();
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    initAnimations() {
      const { $gsap } = useNuxtApp();

      const animateOnScroll = (elem, vars) => {
        if (!elem) return;
        $gsap.from(elem, {
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

      if (this.$refs.heroContent) {
        $gsap.from(this.$refs.heroContent.children, {
          duration: 1,
          autoAlpha: 0,
          y: 30,
          ease: "power3.out",
          stagger: 0.2,
          delay: 0.2,
        });
      }
      if (this.$refs.heroButton) {
        $gsap.from(this.$refs.heroButton, {
          duration: 1,
          autoAlpha: 0,
          y: 30,
          ease: "power3.out",
          delay: 0.4,
        });
      }

      if (this.$refs.newsCarousel) {
        const carouselItems =
          this.$refs.newsCarousel.querySelectorAll(".carousel-item");
        carouselItems.forEach((item, index) => {
          animateOnScroll(item, { delay: index * 0.1 });
        });
      }
    },
  },
};
</script>

<style>
.animate-marquee {
  animation: marquee 25s linear infinite;
  /* Durasi bisa disesuaikan */
}
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
