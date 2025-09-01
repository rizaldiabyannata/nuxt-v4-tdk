<template>
  <div
    class="w-full flex flex-col px-4 sm:px-8 text-justify py-6 sm:py-10 md:py-12 space-y-10 text-black text-base sm:text-lg md:text-xl lg:text-2xl items-center"
  >
    <p>
      {{ firstParagraph }}
    </p>
    <img
      crossorigin="anonymous"
      :src="image"
      alt=""
      class="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl rounded-lg shadow-md object-cover"
    />
    <div class="w-full px-2 sm:px-4 md:px-8">
      <div
        v-html="secondParagraph"
        class="prose prose-sm sm:prose lg:prose-lg max-w-none break-words tiptap-content-view"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    firstParagraph: {
      type: String,
      default:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque commodi iure quasi. Sapiente accusantium voluptates quis possimus aliquam. Eaque, quas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque commodi iure quasi. Sapiente accusantium voluptates quis possimus aliquam. Eaque, quas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque commodi iure quasi. Sapiente accusantium voluptates quis possimus aliquam. Eaque, quas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque commodi iure quasi. Sapiente accusantium voluptates quis possimus aliquam. Eaque, quas?",
    },
    image: {
      type: String,
      default: "/img/placeholder.png",
    },
    secondParagraph: {
      type: String,
      default:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque commodi iure quasi. Sapiente accusantium voluptates quis possimus aliquam. Eaque, quas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque commodi iure quasi. Sapiente accusantium voluptates quis possimus aliquam. Eaque, quas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque commodi iure quasi. Sapiente accusantium voluptates quis possimus aliquam. Eaque, quas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque commodi iure quasi. Sapiente accusantium voluptates quis possimus aliquam. Eaque, quas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque commodi iure quasi. Sapiente accusantium voluptates quis possimus aliquam. Eaque, quas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque commodi iure quasi. Sapiente accusantium voluptates quis possimus aliquam. Eaque, quas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque commodi iure quasi. Sapiente accusantium voluptates quis possimus aliquam. Eaque, quas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque commodi iure quasi. Sapiente accusantium voluptates quis possimus aliquam. Eaque, quas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque commodi iure quasi. Sapiente accusantium voluptates quis possimus aliquam. Eaque, quas?",
    },
  },
};
</script>
