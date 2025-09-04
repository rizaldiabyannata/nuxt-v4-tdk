<template>
  <div class="w-full max-w-4xl mx-auto flex flex-col items-center space-y-8 text-justify">
    <p class="text-lg text-gray-600 ">
      {{ firstParagraph }}
    </p>
    <img
      crossorigin="anonymous"
      :src="image"
      alt=""
      class="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl rounded-lg shadow-md object-cover"
    />
    <div class="w-full">
      <div v-html="secondParagraph" class="prose lg:prose-xl max-w-none break-words tiptap-content-view"></div>
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
