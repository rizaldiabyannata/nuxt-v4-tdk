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
            <th class="px-10 py-4 text-left text-gray-700 font-semibold">Level</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Order</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Short Description</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Status</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="8" class="px-6 py-8 text-center text-gray-500">Loading employees...</td>
          </tr>
          <tr v-else-if="!employees.length && !loadError">
            <td colspan="8" class="px-6 py-8 text-center text-gray-500">No employees found.</td>
          </tr>
          <tr v-else-if="loadError">
            <td colspan="8" class="px-6 py-8 text-center text-red-600">{{ loadError }}</td>
          </tr>
          <tr
            v-else
            v-for="emp in employees"
            :key="emp.id"
            class="border-b border-gray-200 hover:bg-gray-50"
          >
            <td class="px-6 py-4">
              <img 
                v-if="emp.photoUrl" 
                :src="getImageUrl(emp.photoUrl)" 
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
            <td class="px-6 pl-8 py-4 text-gray-600">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Level {{ emp.level }}
              </span>
            </td>
            <td class="px-6 py-4 text-gray-600 text-center">{{ emp.order }}</td>
            <td class="px-6 py-4 text-gray-600 max-w-xs">
              <div class="line-clamp-2">{{ emp.short_description || '-' }}</div>
            </td>
            <td class="px-6 py-4">
              <button
                @click="toggleStatus(emp)"
                :class="emp.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80"
              >
                {{ emp.isActive ? 'Active' : 'Inactive' }}
              </button>
            </td>
            <td class="px-6 py-4">
              <button @click="openEditModal(emp)" class="text-blue-500 hover:text-blue-700 mr-3">Edit</button>
              <button @click="deleteEmployee(emp.id)" class="text-red-500 hover:text-red-700">Delete</button>
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

            <!-- Level (Required) -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Level <span class="text-red-500">*</span>
              </label>
              <input 
                v-model.number="newEmployee.level" 
                type="number" 
                min="1" 
                class="input input-bordered w-full rounded-lg mt-1" 
                required 
              />
              <p class="text-xs text-gray-500 mt-1">Level 1 = Highest (CEO), Level 2+ = Lower positions</p>
            </div>

            <!-- Order (Optional) -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Order
              </label>
              <input 
                v-model.number="newEmployee.order" 
                type="number" 
                min="0" 
                class="input input-bordered w-full rounded-lg mt-1" 
                placeholder="0"
              />
              <p class="text-xs text-gray-500 mt-1">Display order within the same level (lower = earlier)</p>
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

    <!-- Edit Employee Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-y-0 right-0 left-64 bg-black bg-opacity-40 z-50"
      @click.self="closeEditModal"
    >
      <div class="flex flex-col h-full bg-white shadow-xl">
        <!-- Sticky Header -->
        <div class="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-white">
          <h2 class="text-2xl font-bold text-[#EB5523]">Edit Employee</h2>
          <button
            @click="closeEditModal"
            class="text-gray-500 hover:text-gray-800 text-3xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="submitUpdateEmployee" class="flex-1 overflow-y-auto px-6 py-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Full Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input v-model="newEmployee.name" type="text" class="input input-bordered w-full rounded-lg mt-1" />
            </div>

            <!-- Position -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input v-model="newEmployee.position" type="text" class="input input-bordered w-full rounded-lg mt-1" />
            </div>

            <!-- Photo (Optional for update) -->
            <div class="sm:col-span-2">
              <label for="photo-upload-edit" class="block text-sm font-medium text-gray-700 mb-2">
                Photo (leave empty to keep current photo)
              </label>
              <div v-if="photoPreview" class="mb-4">
                <p class="text-sm text-gray-500 mb-2">Current/Preview:</p>
                <img :src="photoPreview" alt="Photo Preview" class="w-32 h-32 rounded object-cover border" />
              </div>
              <label
                for="photo-upload-edit"
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
                    <span class="font-semibold">{{ isPhotoFile ? newEmployee.photo.name : 'Upload new photo' }}</span>
                  </p>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input @change="handlePhotoUpload" id="photo-upload-edit" type="file" class="hidden" accept="image/*" />
              </label>
            </div>

            <!-- Level -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Level
              </label>
              <input 
                v-model.number="newEmployee.level" 
                type="number" 
                min="1" 
                class="input input-bordered w-full rounded-lg mt-1" 
              />
              <p class="text-xs text-gray-500 mt-1">Level 1 = Highest (CEO), Level 2+ = Lower positions</p>
            </div>

            <!-- Order -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Order
              </label>
              <input 
                v-model.number="newEmployee.order" 
                type="number" 
                min="0" 
                class="input input-bordered w-full rounded-lg mt-1" 
              />
              <p class="text-xs text-gray-500 mt-1">Display order within the same level</p>
            </div>

            <!-- Short Description -->
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700">
                Short Description
              </label>
              <textarea 
                v-model="newEmployee.short_description" 
                rows="4" 
                class="textarea textarea-bordered w-full rounded-lg mt-1" 
                placeholder="Brief description about the employee..."
              ></textarea>
            </div>

            <!-- Social Media -->
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
          <button type="button" class="btn btn-ghost rounded-lg" @click="closeEditModal">Cancel</button>
          <button type="button" class="btn btn-primary rounded-lg" @click="submitUpdateEmployee">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { getImageUrl } from '~/composables/useImage'

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
const showEditModal = ref(false)
const editingEmployeeId = ref(null)
const newEmployee = ref({
  name: '',
  position: '',
  photo: null,
  short_description: '',
  level: 1,
  order: 0,
  socialMedia: [],
})
const photoPreview = ref(null)

// Computed property to check if photo is a File instance
const isPhotoFile = computed(() => {
  return newEmployee.value.photo instanceof File
})

function openCreateModal() {
  showCreateModal.value = true
}

function closeCreateModal() {
  showCreateModal.value = false
  resetForm()
}

function closeEditModal() {
  showEditModal.value = false
  editingEmployeeId.value = null
  resetForm()
}

function resetForm() {
  newEmployee.value = {
    name: '',
    position: '',
    photo: null,
    short_description: '',
    level: 1,
    order: 0,
    socialMedia: [],
  }
  photoPreview.value = null
}

function openEditModal(employee) {
  console.log('📝 Opening edit modal for employee:', employee)
  editingEmployeeId.value = employee.id
  
  newEmployee.value = {
    name: employee.name,
    position: employee.position,
    photo: employee.photoUrl, // Store URL for preview, will be replaced if new file uploaded
    short_description: employee.short_description,
    level: employee.level,
    order: employee.order,
    socialMedia: employee.socialMedia && employee.socialMedia.length > 0 
      ? [...employee.socialMedia] 
      : [],
  }
  
  // Set photo preview to existing photo
  photoPreview.value = employee.photoUrl
  showEditModal.value = true
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
  // Validation: name, position, photo, short_description, and level are required
  if (!newEmployee.value.name || !newEmployee.value.position || !newEmployee.value.photo || !newEmployee.value.short_description || !newEmployee.value.level) {
    console.warn('⚠️ Validation failed: required fields are missing')
    alert('Name, Position, Photo, Short Description, and Level are required.')
    return
  }

  console.log('📤 Starting employee submission...')
  console.log('📋 Form data state:', {
    name: newEmployee.value.name,
    position: newEmployee.value.position,
    photo: newEmployee.value.photo instanceof File ? `File: ${newEmployee.value.photo.name}` : 'Existing URL',
    short_description: newEmployee.value.short_description,
    level: newEmployee.value.level,
    order: newEmployee.value.order,
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
    formData.append('level', newEmployee.value.level.toString())
    
    // Optional order field
    if (newEmployee.value.order !== undefined && newEmployee.value.order !== null) {
      formData.append('order', newEmployee.value.order.toString())
    }
    
    console.log('📸 Photo attached:', newEmployee.value.photo instanceof File ? newEmployee.value.photo.name : 'URL')
    
    console.log('🔢 Level value type:', typeof newEmployee.value.level, 'Value:', newEmployee.value.level)
    console.log('🔢 Order value type:', typeof newEmployee.value.order, 'Value:', newEmployee.value.order)
    
    // Social Media as array items (optional)
    const validSocialMedia = newEmployee.value.socialMedia.filter(sm => sm.platform && sm.url)
    if (validSocialMedia.length > 0) {
      // Append each social media item as separate fields
      validSocialMedia.forEach((item, index) => {
        formData.append(`socialMedia[${index}][platform]`, item.platform)
        formData.append(`socialMedia[${index}][url]`, item.url)
      })
      console.log('🔗 Social media attached:', validSocialMedia)
    }

    console.log('🌐 Sending POST request to: /api/staff')
    console.log('📦 FormData entries:', Array.from(formData.entries()).map(([key, val]) => 
      val instanceof File ? [key, `File: ${val.name}`] : [key, val]
    ))

    const response = await $api.post('/api/staff', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    console.log('✅ Employee created successfully!')
    console.log('📥 Server response:', response.data)

    alert('Employee created successfully!')
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
    
    if (error.response?.data?.errors) {
      console.error('📋 Validation errors:', JSON.stringify(error.response.data.errors, null, 2))
    }
    
    const errorMsg = error.response?.data?.message || error.response?.data?.errors?.[0]?.message || 'Failed to create employee.'
    alert('Error: ' + errorMsg)
  }
}

async function submitUpdateEmployee() {
  // Validation: for update, at least one field should be provided
  if (!newEmployee.value.name && !newEmployee.value.position && !newEmployee.value.short_description && !newEmployee.value.level) {
    console.warn('⚠️ Validation failed: no fields to update')
    alert('Please fill at least one field to update.')
    return
  }

  console.log('📤 Starting employee update...')
  console.log('📋 Employee ID:', editingEmployeeId.value)

  try {
    const { $api } = useNuxtApp()
    const formData = new FormData()
    
    // Add fields only if they exist
    if (newEmployee.value.name) formData.append('name', newEmployee.value.name)
    if (newEmployee.value.position) formData.append('position', newEmployee.value.position)
    if (newEmployee.value.short_description) formData.append('short_description', newEmployee.value.short_description)
    if (newEmployee.value.level) formData.append('level', newEmployee.value.level.toString())
    if (newEmployee.value.order !== undefined && newEmployee.value.order !== null) {
      formData.append('order', newEmployee.value.order.toString())
    }
    
    // Only append photo if it's a new File
    if (newEmployee.value.photo instanceof File) {
      formData.append('photo', newEmployee.value.photo)
      console.log('📸 New photo attached:', newEmployee.value.photo.name)
    }
    
    // Social Media as array items
    const validSocialMedia = newEmployee.value.socialMedia.filter(sm => sm.platform && sm.url)
    if (validSocialMedia.length > 0) {
      // Append each social media item as separate fields
      validSocialMedia.forEach((item, index) => {
        formData.append(`socialMedia[${index}][platform]`, item.platform)
        formData.append(`socialMedia[${index}][url]`, item.url)
      })
      console.log('🔗 Social media attached:', validSocialMedia)
    }

    console.log('🌐 Sending PUT request to: /api/staff/' + editingEmployeeId.value)
    console.log('📦 FormData entries:', Array.from(formData.entries()).map(([key, val]) => 
      val instanceof File ? [key, `File: ${val.name}`] : [key, val]
    ))

    const response = await $api.put(`/api/staff/${editingEmployeeId.value}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    console.log('✅ Employee updated successfully!')
    console.log('📥 Server response:', response.data)

    alert('Employee updated successfully!')
    await fetchEmployees()
    closeEditModal()
  } catch (error) {
    console.error('❌ Failed to update employee')
    console.error('� Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    })
    
    if (error.response?.data?.errors) {
      console.error('📋 Validation errors:', JSON.stringify(error.response.data.errors, null, 2))
    }
    
    const errorMsg = error.response?.data?.message || 'Failed to update employee.'
    alert('Error: ' + errorMsg)
  }
}

async function deleteEmployee(id) {
  if (!confirm('Are you sure you want to delete this employee?')) {
    return
  }

  console.log('🗑️ Deleting employee:', id)

  try {
    const { $api } = useNuxtApp()
    await $api.delete(`/api/staff/${id}`)
    
    console.log('✅ Employee deleted successfully!')
    alert('Employee deleted successfully!')
    await fetchEmployees()
  } catch (error) {
    console.error('❌ Failed to delete employee:', error)
    const errorMsg = error.response?.data?.message || 'Failed to delete employee.'
    alert('Error: ' + errorMsg)
  }
}

async function toggleStatus(employee) {
  const newStatus = !employee.isActive
  console.log(`🔄 Toggling status for ${employee.name} to ${newStatus ? 'Active' : 'Inactive'}`)

  try {
    const { $api } = useNuxtApp()
    await $api.patch(`/api/staff/${employee.id}/status`, {
      isActive: newStatus
    })
    
    console.log('✅ Status updated successfully!')
    alert(`Employee ${newStatus ? 'activated' : 'deactivated'} successfully!`)
    await fetchEmployees()
  } catch (error) {
    console.error('❌ Failed to toggle status:', error)
    const errorMsg = error.response?.data?.message || 'Failed to update status.'
    alert('Error: ' + errorMsg)
  }
}

// Close on ESC key when modal is open
function handleKeydown(e) {
  if (e.key === 'Escape') {
    if (showCreateModal.value) closeCreateModal()
    if (showEditModal.value) closeEditModal()
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
watch([showCreateModal, showEditModal], ([create, edit]) => {
  if (typeof window === 'undefined') return
  const html = document.documentElement
  const body = document.body
  const anyOpen = create || edit
  if (anyOpen) {
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
    
    console.log('📥 Raw API response:', res)
    
    // Response format: { success: true, data: [...], count: number }
    let list = []
    if (res.data && res.data.success && Array.isArray(res.data.data)) {
      list = res.data.data
    } else if (Array.isArray(res.data)) {
      list = res.data
    }
    
    console.log('📥 Fetched employees:', list)
    
    // Map to display format according to API schema
    employees.value = list.map((item) => ({
      id: item._id || item.id,
      name: item.name || '-',
      position: item.position || '-',
      short_description: item.short_description || '-',
      photoUrl: item.photoUrl || '',
      level: item.level || 1,
      order: item.order || 0,
      socialMedia: Array.isArray(item.socialMedia) ? item.socialMedia : [],
      isActive: item.isActive !== false, // Default to true if not specified
    }))
    
    console.log('📊 Processed employees:', employees.value)
  } catch (err) {
    console.error('Failed to fetch employees:', err)
    loadError.value = 'Failed to load employees.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
