<template>
  <div class="flex flex-col bg-white space-y-8">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Manage Employees</h1>
        <p class="text-gray-600">Control and manage company employees</p>
      </div>
      <button
        @click="openCreateModal"
        class="btn btn-primary rounded-lg"
      >
        + Add Employee
      </button>
    </div>

    <hr class="border-gray-200" />

    <!-- Employees Table -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <table class="w-full">
        <thead class="bg-gray-100 border-b border-gray-200">
          <tr>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Photo</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Name</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Position</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Email</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Phone</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Short Description</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="7" class="px-6 py-8 text-center text-gray-500">Loading employees...</td>
          </tr>
          <tr v-else-if="!employees.length && !loadError">
            <td colspan="7" class="px-6 py-8 text-center text-gray-500">No employees found.</td>
          </tr>
          <tr v-else-if="loadError">
            <td colspan="7" class="px-6 py-8 text-center text-red-600">{{ loadError }}</td>
          </tr>
          <tr
            v-else
            v-for="emp in employees"
            :key="emp.id"
            class="border-b border-gray-200 hover:bg-gray-50"
          >
            <td class="px-6 py-4">
              <img 
                v-if="emp.photo" 
                :src="emp.photo" 
                :alt="emp.name"
                class="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              />
              <div 
                v-else 
                class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold"
              >
                {{ emp.name.charAt(0).toUpperCase() }}
              </div>
            </td>
            <td class="px-6 py-4 text-gray-800 font-medium">{{ emp.name }}</td>
            <td class="px-6 py-4 text-gray-600">{{ emp.position }}</td>
            <td class="px-6 py-4 text-gray-600">{{ emp.email || '-' }}</td>
            <td class="px-6 py-4 text-gray-600">{{ emp.phone || '-' }}</td>
            <td class="px-6 py-4 text-gray-600 max-w-xs">
              <div class="line-clamp-2">{{ emp.bio || '-' }}</div>
            </td>
            <td class="px-6 py-4">
              <button class="text-blue-500 hover:text-blue-700 mr-3">Edit</button>
              <button class="text-red-500 hover:text-red-700">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create Employee Modal (Full-screen content area, sidebar stays visible) -->
    <div
      v-if="showCreateModal"
      class="fixed inset-y-0 right-0 left-64 bg-black bg-opacity-40 z-50"
      @click.self="closeCreateModal"
    >
      <div class="flex flex-col h-full bg-white shadow-xl">
        <!-- Sticky Header -->
        <div class="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-white">
          <h2 class="text-2xl font-bold text-[#EB5523]">Add Employee</h2>
          <button
            @click="closeCreateModal"
            class="text-gray-500 hover:text-gray-800 text-3xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="submitEmployee" class="flex-1 overflow-y-auto px-6 py-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Full Name (Required) -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Full Name <span class="text-red-500">*</span>
              </label>
              <input v-model="newEmployee.name" type="text" class="input input-bordered w-full rounded-lg mt-1" required />
            </div>

            <!-- Position (Required) -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Position <span class="text-red-500">*</span>
              </label>
              <input v-model="newEmployee.position" type="text" class="input input-bordered w-full rounded-lg mt-1" required />
            </div>

            <!-- Photo (Required) -->
            <div class="sm:col-span-2">
              <label for="photo-upload" class="block text-sm font-medium text-gray-700 mb-2">
                Photo <span class="text-red-500">*</span>
              </label>
              <div v-if="photoPreview" class="mb-4">
                <p class="text-sm text-gray-500 mb-2">Preview:</p>
                <img :src="photoPreview" alt="Photo Preview" class="w-32 h-32 rounded object-cover border" />
              </div>
              <label
                for="photo-upload"
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
                    <span class="font-semibold">{{ newEmployee.photo ? newEmployee.photo.name : 'Upload a photo' }}</span>
                  </p>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input @change="handlePhotoUpload" id="photo-upload" type="file" class="hidden" accept="image/*" required />
              </label>
            </div>

            <!-- Short Description (Required) -->
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700">
                Short Description <span class="text-red-500">*</span>
              </label>
              <textarea 
                v-model="newEmployee.short_description" 
                rows="4" 
                class="textarea textarea-bordered w-full rounded-lg mt-1" 
                placeholder="Brief description about the employee..." 
                required
              ></textarea>
            </div>

            <!-- Social Media (Optional - Array format) -->
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-3">Social Media (Optional)</label>
              <div class="space-y-3">
                <div 
                  v-for="(social, index) in newEmployee.socialMedia" 
                  :key="index"
                  class="flex gap-3 items-start"
                >
                  <div class="flex-1">
                    <select 
                      v-model="social.platform" 
                      class="select select-bordered w-full rounded-lg"
                    >
                      <option value="">Select Platform</option>
                      <option value="facebook">Facebook</option>
                      <option value="twitter">Twitter</option>
                      <option value="instagram">Instagram</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="youtube">YouTube</option>
                      <option value="tiktok">TikTok</option>
                    </select>
                  </div>
                  <div class="grow-2">
                    <input 
                      v-model="social.url" 
                      type="url" 
                      class="input input-bordered w-full rounded-lg" 
                      placeholder="https://example.com/profile"
                    />
                  </div>
                  <button 
                    type="button"
                    @click="removeSocialMedia(index)"
                    class="btn btn-error btn-sm rounded-lg"
                  >
                    ✕
                  </button>
                </div>
                <button 
                  type="button"
                  @click="addSocialMedia"
                  class="btn btn-outline btn-sm rounded-lg"
                >
                  + Add Social Media
                </button>
              </div>
            </div>
          </div>
        </form>

        <!-- Footer Actions -->
        <div class="sticky bottom-0 z-10 flex justify-end gap-3 px-6 py-4 border-t bg-white">
          <button type="button" class="btn btn-ghost rounded-lg" @click="closeCreateModal">Cancel</button>
          <button type="button" class="btn btn-primary rounded-lg" @click="submitEmployee">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

// Employees data
const employees = ref([])
const isLoading = ref(false)
const loadError = ref('')

// Modal state
const showCreateModal = ref(false)
const newEmployee = ref({
  name: '',
  position: '',
  photo: null,
  short_description: '',
  socialMedia: [],
})
const photoPreview = ref(null)

function openCreateModal() {
  showCreateModal.value = true
}

function closeCreateModal() {
  showCreateModal.value = false
  // reset form
  newEmployee.value = {
    name: '',
    position: '',
    photo: null,
    short_description: '',
    socialMedia: [],
  }
  photoPreview.value = null
}

function handlePhotoUpload(event) {
  const file = event.target.files[0]
  if (file) {
    newEmployee.value.photo = file
    photoPreview.value = URL.createObjectURL(file)
  }
}

function addSocialMedia() {
  newEmployee.value.socialMedia.push({ platform: '', url: '' })
}

function removeSocialMedia(index) {
  newEmployee.value.socialMedia.splice(index, 1)
}

async function submitEmployee() {
  // Validation: name, position, photo, and short_description are required
  if (!newEmployee.value.name || !newEmployee.value.position || !newEmployee.value.photo || !newEmployee.value.short_description) {
    console.warn('⚠️ Validation failed: name, position, photo, or short_description is missing')
    useToast?.().error?.({ title: 'Validation Error', message: 'Name, Position, Photo, and Short Description are required.' })
    return
  }

  console.log('📤 Starting employee submission...')
  console.log('📋 Form data state:', {
    name: newEmployee.value.name,
    position: newEmployee.value.position,
    photo: newEmployee.value.photo ? `File: ${newEmployee.value.photo.name} (${newEmployee.value.photo.size} bytes)` : 'No photo',
    short_description: newEmployee.value.short_description,
    socialMedia: newEmployee.value.socialMedia,
  })

  try {
    const { $api } = useNuxtApp()
    const formData = new FormData()
    
    // Required fields
    formData.append('name', newEmployee.value.name)
    formData.append('position', newEmployee.value.position)
    formData.append('photo', newEmployee.value.photo)
    formData.append('short_description', newEmployee.value.short_description)
    console.log('📸 Photo attached:', newEmployee.value.photo.name)
    
    // Social Media as array (optional)
    // Filter out empty entries before sending
    const validSocialMedia = newEmployee.value.socialMedia.filter(sm => sm.platform && sm.url)
    if (validSocialMedia.length > 0) {
      formData.append('socialMedia', JSON.stringify(validSocialMedia))
      console.log('🔗 Social media attached:', validSocialMedia)
    }

    console.log('🌐 Sending POST request to: /api/staff/')
    console.log('📦 FormData entries:', Array.from(formData.entries()).map(([key, val]) => 
      val instanceof File ? [key, `File: ${val.name}`] : [key, val]
    ))

    const response = await $api.post('/api/staff/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    console.log('✅ Employee created successfully!')
    console.log('📥 Server response:', response.data)

    useToast?.().success?.({ title: 'Success', message: 'Employee created successfully.' })
    await fetchEmployees()
    closeCreateModal()
  } catch (error) {
    console.error('❌ Failed to create employee')
    console.error('🔴 Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      statusText: error.response?.statusText,
    })
    
    // Log validation errors if present
    if (error.response?.data?.errors) {
      console.error('📋 Validation errors:', error.response.data.errors)
    }
    if (error.response?.data?.message) {
      console.error('💬 Error message:', error.response.data.message)
    }
    
    const errorMsg = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Failed to create employee.'
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
  // Fetch initial data
  fetchEmployees()
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

// Fetch employees from backend
async function fetchEmployees() {
  isLoading.value = true
  loadError.value = ''
  try {
    const { $api } = useNuxtApp()
    const res = await $api.get('/api/staff')
    
    // Response is directly an array according to documentation
    const list = Array.isArray(res.data) ? res.data : []
    
    console.log('📥 Fetched employees:', list)
    
    // Map to display format
    employees.value = list.map((item) => ({
      id: item._id || item.id,
      name: item.name || '-',
      position: item.position || '-',
      email: item.email || '-',
      phone: item.phone || '-',
      bio: item.bio || '-',
      photo: item.photo || '',
      socialMedia: item.socialMedia || {},
      status: item.isActive === false ? 'Inactive' : 'Active',
    }))
  } catch (err) {
    console.error('Failed to fetch employees:', err)
    loadError.value = 'Failed to load employees.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
