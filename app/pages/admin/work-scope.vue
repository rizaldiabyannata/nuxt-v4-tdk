<template>
  <div class="flex flex-col bg-white space-y-8">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Work Scope Management</h1>
        <p class="text-gray-600">Control and manage work scope that can be handled</p>
      </div>
      <button
        @click="openCreateModal"
        class="bg-[#EB5523] text-white px-6 py-3 rounded-lg hover:bg-[#d94415] transition-colors font-medium"
      >
        + Add Work Scope
      </button>
    </div>

    <hr class="border-gray-200" />

    <!-- Work Scope Grid -->
    <div v-if="isLoading" class="text-center py-12">
      <p class="text-gray-500">Loading work scopes...</p>
    </div>
    
    <div v-else-if="loadError" class="text-center py-12">
      <p class="text-red-600">{{ loadError }}</p>
    </div>
    
    <div v-else-if="!services.length" class="text-center py-12">
      <p class="text-gray-500">No work scopes found. Add your first work scope!</p>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Work Scope Card -->
      <div 
        v-for="service in services" 
        :key="service.id"
        class="flex flex-col rounded-4xl p-8 bg-white border border-gray-300 hover:shadow-lg transition-shadow h-full"
      >
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
          <button class="flex-1 text-blue-500 hover:text-blue-700 text-sm font-semibold py-2 px-4 rounded-lg border border-blue-500 hover:bg-blue-50 transition-colors">
            Edit
          </button>
          <button 
            @click="deleteService(service.id)" 
            class="flex-1 text-red-500 hover:text-red-700 text-sm font-semibold py-2 px-4 rounded-lg border border-red-500 hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Create Work Scope Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-y-0 right-0 left-64 bg-black bg-opacity-40 z-50"
      @click.self="closeCreateModal"
    >
      <div class="flex flex-col h-full bg-white shadow-xl">
        <!-- Sticky Header -->
        <div class="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-white">
          <h2 class="text-2xl font-bold text-[#EB5523]">Add Work Scope</h2>
          <button
            @click="closeCreateModal"
            class="text-gray-500 hover:text-gray-800 text-3xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="submitService" class="flex-1 overflow-y-auto px-6 py-6">
          <div class="grid grid-cols-1 gap-6">
            <!-- Title (Required) -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Title <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="newService.title" 
                type="text" 
                class="input input-bordered w-full rounded-lg mt-1" 
                placeholder="e.g., Web Development"
                required 
              />
            </div>

            <!-- Image (Required) -->
            <div>
              <label for="image-upload" class="block text-sm font-medium text-gray-700 mb-2">
                Image <span class="text-red-500">*</span>
              </label>
              <div v-if="imagePreview" class="mb-4">
                <p class="text-sm text-gray-500 mb-2">Preview:</p>
                <img :src="imagePreview" alt="Image Preview" class="w-full h-48 rounded object-cover border" />
              </div>
              <label
                for="image-upload"
                class="relative flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div class="text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p class="mt-2 text-sm text-gray-600">
                    <span class="font-semibold">{{ newService.image ? newService.image.name : 'Upload an image' }}</span>
                  </p>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
                <input @change="handleImageUpload" id="image-upload" type="file" class="hidden" accept="image/*" required />
              </label>
            </div>

            <!-- List (Required - Array) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                Scope List <span class="text-red-500">*</span>
              </label>
              <div class="space-y-3">
                <div 
                  v-for="(item, index) in newService.list" 
                  :key="index"
                  class="flex gap-3 items-center"
                >
                  <input 
                    v-model="newService.list[index]" 
                    type="text" 
                    class="input input-bordered w-full rounded-lg" 
                    placeholder="Scope item description"
                    required
                  />
                  <button 
                    type="button"
                    @click="removeListItem(index)"
                    class="btn btn-error btn-sm rounded-lg"
                  >
                    ✕
                  </button>
                </div>
                <button 
                  type="button"
                  @click="addListItem"
                  class="btn btn-outline btn-sm rounded-lg"
                >
                  + Add Scope Item
                </button>
              </div>
            </div>
         
          </div>
        </form>

        <!-- Footer Actions -->
        <div class="sticky bottom-0 z-10 flex justify-end gap-3 px-6 py-4 border-t bg-white">
          <button type="button" class="btn btn-ghost rounded-lg" @click="closeCreateModal">Cancel</button>
          <button type="button" class="btn btn-primary rounded-lg" @click="submitService">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

definePageMeta({
  layout: "admin",
  middleware: "auth",
})

// Services data
const services = ref([])
const isLoading = ref(false)
const loadError = ref('')

// Modal state
const showCreateModal = ref(false)
const newService = ref({
  title: '',
  list: [],
  image: null,
})
const imagePreview = ref(null)

function openCreateModal() {
  showCreateModal.value = true
}

function closeCreateModal() {
  showCreateModal.value = false
  // reset form
  newService.value = {
    title: '',
    list: [],
    image: null,
  }
  imagePreview.value = null
}

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    newService.value.image = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

function addListItem() {
  newService.value.list.push('')
}

function removeListItem(index) {
  newService.value.list.splice(index, 1)
}

async function submitService() {
  // Validation: title, list, and image are required
  if (!newService.value.title || !newService.value.list.length || !newService.value.image) {
    console.warn('⚠️ Validation failed: title, list, or image is missing')
    useToast?.().error?.({ title: 'Validation Error', message: 'Title, List items, and Image are required.' })
    return
  }

  console.log('📤 Starting service submission...')
  console.log('📋 Form data state:', {
    title: newService.value.title,
    list: newService.value.list,
    image: newService.value.image ? `File: ${newService.value.image.name} (${newService.value.image.size} bytes)` : 'No image',
  })

  try {
    const { $api } = useNuxtApp()
    const formData = new FormData()
    
    // Required fields
    formData.append('title', newService.value.title)
    formData.append('image', newService.value.image)
    console.log('📸 Image attached:', newService.value.image.name)
    
    // List as JSON array (required)
    const validList = newService.value.list.filter(item => item.trim())
    formData.append('list', JSON.stringify(validList))
    console.log('📝 List attached:', validList)

    console.log('🌐 Sending POST request to: /api/services')
    console.log('📦 FormData entries:', Array.from(formData.entries()).map(([key, val]) => 
      val instanceof File ? [key, `File: ${val.name}`] : [key, val]
    ))

    const response = await $api.post('/api/services', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    console.log('✅ Service created successfully!')
    console.log('📥 Server response:', response.data)

    useToast?.().success?.({ title: 'Success', message: 'Work scope created successfully.' })
    await fetchServices()
    closeCreateModal()
  } catch (error) {
    console.error('❌ Failed to create service')
    console.error('🔴 Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      statusText: error.response?.statusText,
    })
    
    // Log validation errors if present
    if (error.response?.data?.errors) {
      console.error('📋 Validation errors:', error.response.data.errors)
      error.response.data.errors.forEach((err, idx) => {
        console.error(`  Error ${idx + 1}:`, {
          field: err.path || err.field || err.param,
          message: err.msg || err.message,
          value: err.value,
        })
      })
    }
    if (error.response?.data?.message) {
      console.error('💬 Error message:', error.response.data.message)
    }
    
    // Log full response data
    console.error('📦 Full response data:', error.response?.data)
    
    const errorMsg = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Failed to create work scope.'
    useToast?.().error?.({ title: 'Error', message: errorMsg })
  }
}

async function deleteService(id) {
  if (!confirm('Are you sure you want to delete this work scope?')) {
    return
  }

  try {
    const { $api } = useNuxtApp()
    await $api.delete(`/api/services/${id}`)
    
    console.log('✅ Service deleted successfully!')
    useToast?.().success?.({ title: 'Success', message: 'Work scope deleted successfully.' })
    await fetchServices()
  } catch (error) {
    console.error('❌ Failed to delete service:', error)
    const errorMsg = error.response?.data?.message || 'Failed to delete work scope.'
    useToast?.().error?.({ title: 'Error', message: errorMsg })
  }
}

// Close on ESC key when modal is open
function handleKeydown(e) {
  if (e.key === 'Escape' && showCreateModal.value) {
    closeCreateModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  fetchServices()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// Lock body scroll when modal is open
const previousBodyOverflow = ref('')
watch(showCreateModal, (open) => {
  if (typeof window === 'undefined') return
  const html = document.documentElement
  const body = document.body
  if (open) {
    previousBodyOverflow.value = body.style.overflow
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
  } else {
    html.style.overflow = ''
    body.style.overflow = previousBodyOverflow.value || ''
  }
})

// Fetch services from backend
async function fetchServices() {
  isLoading.value = true
  loadError.value = ''
  try {
    const { $api } = useNuxtApp()
    const res = await $api.get('/api/services')
    
    // Response is directly an array according to documentation
    const list = Array.isArray(res.data) ? res.data : []
    
    console.log('📥 Fetched services:', list)
    
    // Map to display format with robust normalization
    services.value = list.map((item) => {
      // Normalize list: can be array or a JSON/string from backend
      let normalizedList = []
      const rawList = item?.list
      if (Array.isArray(rawList)) {
        // Handle cases where backend returns ["item1","item2"] correctly,
        // and also cases like ["[\"item1\",\"item2\"]"] (stringified inside array)
        normalizedList = rawList.flatMap((entry) => {
          if (typeof entry !== 'string') return []
          const e = entry.trim()
          // Try parse JSON array within string element
          if ((e.startsWith('[') && e.endsWith(']')) || (e.startsWith('"[') && e.endsWith(']"'))) {
            try {
              const parsedInner = JSON.parse(e.replace(/^\"|\"$/g, ''))
              if (Array.isArray(parsedInner)) {
                return parsedInner.filter(v => typeof v === 'string').map(v => v.trim()).filter(Boolean)
              }
            } catch (_) {
              // fallthrough to splitting
            }
          }
          // Fallback split by common separators/newlines
          return e
            .split(/\r?\n|\s*","\s*|\||,|;|·|•/)
            .map(v => v.replace(/^\s*"|"\s*$/g, '').trim())
            .filter(Boolean)
        })
      } else if (typeof rawList === 'string') {
        const s = rawList.trim()
        // Preferred: try JSON.parse directly
        let parsed = null
        try {
          parsed = JSON.parse(s)
        } catch (_) {
          parsed = null
        }
        if (Array.isArray(parsed)) {
          normalizedList = parsed.filter(v => typeof v === 'string').map(v => v.trim()).filter(Boolean)
        } else {
          // Fallback: remove wrapping brackets then split by common separators/newlines
          const noBrackets = s.replace(/^\[|\]$/g, '')
          normalizedList = noBrackets
            .split(/\r?\n|\s*","\s*|\||,|;|·|•/)
            .map(v => v.replace(/^\s*"|"\s*$/g, '').trim())
            .filter(Boolean)
        }
      }

      // Resolve image URL; prefer getImageUrl composable if available
      let resolvedImage = item?.image || ''
      try {
        // Nuxt auto-import should expose getImageUrl if defined
        if (resolvedImage && typeof getImageUrl === 'function') {
          resolvedImage = getImageUrl(resolvedImage)
        } else if (resolvedImage && !/^https?:\/\//.test(resolvedImage)) {
          const config = useRuntimeConfig()
          const base = config?.public?.minioPublicUrl || ''
          const clean = resolvedImage.startsWith('/') ? resolvedImage : `/${resolvedImage}`
          resolvedImage = base ? `${base}${clean}` : clean
        }
      } catch (_) {
        // Silent fallback: keep original or make relative path absolute if possible
        try {
          if (resolvedImage && !/^https?:\/\//.test(resolvedImage)) {
            const config = useRuntimeConfig()
            const base = config?.public?.minioPublicUrl || ''
            const clean = resolvedImage.startsWith('/') ? resolvedImage : `/${resolvedImage}`
            resolvedImage = base ? `${base}${clean}` : clean
          }
        } catch (_) {}
      }

      return {
        id: item._id || item.id,
        title: item.title || '-',
        list: normalizedList,
        image: resolvedImage,
      }
    })
  } catch (err) {
    console.error('Failed to fetch services:', err)
    loadError.value = 'Failed to load work scopes.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
