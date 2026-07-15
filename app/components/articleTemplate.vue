<template>
  <div
    class="w-full max-w-4xl min-w-0 mx-auto flex flex-col items-center space-y-8 overflow-x-hidden text-justify"
  >
    <MinioImage
      :src="image"
      alt="Article image"
      img-class="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl rounded-lg shadow-md object-cover"
      fallback="/img/placeholder.png"
    />
    <div class="w-full min-w-0 overflow-x-hidden">
      <div
        v-html="secondParagraph"
        class="prose lg:prose-xl max-w-none min-w-0 overflow-x-hidden break-words tiptap-content-view"
      ></div>
    </div>
  </div>
</template>

<script>
import MinioImage from "./MinioImage.vue";

export default {
  components: {
    MinioImage,
  },
  props: {
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
