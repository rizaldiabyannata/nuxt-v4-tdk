<template>
  <div class="flex flex-col rounded-4xl p-8 bg-white border border-gray-300 hover:shadow-lg transition-shadow h-full">
    <!-- Image and Title -->
    <div class="flex flex-col w-full items-center justify-center mb-4">
      <img 
        v-if="service.image"
        :src="service.image" 
        :alt="service.title"
        class="border border-black aspect-5/3 w-full object-cover mb-4"
      />
      <p class="font-extrabold text-black text-xl lg:text-2xl text-center">{{ service.title }}</p>
    </div>
    
    <!-- List with Dividers -->
    <div class="flex flex-col w-full space-y-2 flex-1">
      <div v-for="(item, idx) in service.list" :key="idx" class="flex flex-col w-full">
        <hr class="border-t border-gray-400 mb-2" />
        <p class="text-black">{{ item }}</p>
      </div>
    </div>
    
    <!-- Actions -->
    <div class="flex gap-2 pt-6 mt-4 border-t border-gray-300">
      <button 
        @click="handleEdit"
        class="flex-1 text-blue-500 hover:text-blue-700 text-sm font-semibold py-2 px-4 rounded-lg border border-blue-500 hover:bg-blue-50 transition-colors"
      >
        Edit
      </button>
      <button 
        @click="handleDelete" 
        class="flex-1 text-red-500 hover:text-red-700 text-sm font-semibold py-2 px-4 rounded-lg border border-red-500 hover:bg-red-50 transition-colors"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  service: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['edit', 'delete'])

function handleEdit() {
  console.log('🔵 Edit clicked for:', props.service)
  emit('edit', props.service)
}

function handleDelete() {
  console.log('🔴 Delete clicked for:', props.service.id)
  emit('delete', props.service.id)
}
</script>

<style scoped></style>
