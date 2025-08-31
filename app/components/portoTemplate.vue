<template>
  <div class="w-full flex flex-col px-24 text-justify py-12 space-y-15 text-black text-2xl items-center">
    <p>
      {{ firstParagraph }}
    </p>
    <img crossorigin="anonymous" :src="image" alt="" class="w-[500px] rounded-lg shadow-md" />
    <div class="w-full px-4">
      <div v-html="secondParagraph" class="prose prose-lg max-w-none break-words"></div>
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
