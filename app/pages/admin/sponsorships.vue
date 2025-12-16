<template>
  <div class="flex flex-col bg-white space-y-8">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Manage Sponsorships</h1>
        <p class="text-gray-600">Control and manage company sponsorships and partners</p>
      </div>
      <button
        @click="openCreateModal"
        class="btn btn-primary rounded-lg"
      >
        + Add Sponsorship
      </button>
    </div>

    <hr class="border-gray-200" />

    <!-- Sponsorships Table -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <table class="w-full">
        <thead class="bg-gray-100 border-b border-gray-200">
          <tr>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Logo</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Name</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Website Link</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="4" class="px-6 py-8 text-center text-gray-500">Loading sponsorships...</td>
          </tr>
          <tr v-else-if="!sponsorships.length && !loadError">
            <td colspan="4" class="px-6 py-8 text-center text-gray-500">No sponsorships found.</td>
          </tr>
          <tr v-else-if="loadError">
            <td colspan="4" class="px-6 py-8 text-center text-red-600">{{ loadError }}</td>
          </tr>
          <tr
            v-else
            v-for="item in sponsorships"
            :key="item.id"
            class="border-b border-gray-200 hover:bg-gray-50"
          >
            <td class="px-6 py-4">
              <img 
                v-if="item.logoUrl" 
                :src="getImageUrl(item.logoUrl)" 
                :alt="item.name"
                class="w-24 h-12 object-contain border border-gray-200 rounded bg-gray-50"
              />
              <div 
                v-else 
                class="w-24 h-12 rounded bg-gray-200 flex items-center justify-center text-gray-500 text-xs"
              >
                No Logo
              </div>
            </td>
            <td class="px-6 py-4 text-gray-800 font-medium">{{ item.name }}</td>
            <td class="px-6 py-4 text-blue-600 hover:underline">
              <a :href="item.websiteLink" target="_blank" rel="noopener noreferrer">{{ item.websiteLink }}</a>
            </td>
            <td class="px-6 py-4">
              <button @click="openEditModal(item)" class="text-blue-500 hover:text-blue-700 mr-3">Edit</button>
              <button @click="deleteSponsorship(item.id)" class="text-red-500 hover:text-red-700">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create Sponsorship Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-y-0 right-0 left-64 bg-black bg-opacity-40 z-50"
      @click.self="closeCreateModal"
    >
      <div class="flex flex-col h-full bg-white shadow-xl">
        <!-- Sticky Header -->
        <div class="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-white">
          <h2 class="text-2xl font-bold text-[#EB5523]">Add Sponsorship</h2>
          <button
            @click="closeCreateModal"
            class="text-gray-500 hover:text-gray-800 text-3xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="submitSponsorship" class="flex-1 overflow-y-auto px-6 py-6">
          <div class="grid grid-cols-1 gap-6">
            <!-- Name (Required) -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Name <span class="text-red-500">*</span>
              </label>
              <input v-model="newItem.name" type="text" class="input input-bordered w-full rounded-lg mt-1" required />
            </div>

            <!-- Website Link (Required) -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Website Link <span class="text-red-500">*</span>
              </label>
              <input v-model="newItem.websiteLink" type="url" class="input input-bordered w-full rounded-lg mt-1" placeholder="https://example.com" required />
            </div>

            <!-- Logo (Required) -->
            <div>
              <label for="logo-upload" class="block text-sm font-medium text-gray-700 mb-2">
                Logo <span class="text-red-500">*</span>
              </label>
              <div v-if="logoPreview" class="mb-4">
                <p class="text-sm text-gray-500 mb-2">Preview:</p>
                <img :src="logoPreview" alt="Logo Preview" class="w-48 h-24 object-contain border rounded bg-gray-50" />
              </div>
              <label
                for="logo-upload"
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
                    <span class="font-semibold">{{ newItem.logo ? newItem.logo.name : 'Upload a logo' }}</span>
                  </p>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input @change="handleLogoUpload" id="logo-upload" type="file" class="hidden" accept="image/*" required />
              </label>
            </div>
          </div>
        </form>

        <!-- Footer Actions -->
        <div class="sticky bottom-0 z-10 flex justify-end gap-3 px-6 py-4 border-t bg-white">
          <button type="button" class="btn btn-ghost rounded-lg" @click="closeCreateModal">Cancel</button>
          <button type="button" class="btn btn-primary rounded-lg" @click="submitSponsorship">Save</button>
        </div>
      </div>
    </div>

    <!-- Edit Sponsorship Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-y-0 right-0 left-64 bg-black bg-opacity-40 z-50"
      @click.self="closeEditModal"
    >
      <div class="flex flex-col h-full bg-white shadow-xl">
        <!-- Sticky Header -->
        <div class="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-white">
          <h2 class="text-2xl font-bold text-[#EB5523]">Edit Sponsorship</h2>
          <button
            @click="closeEditModal"
            class="text-gray-500 hover:text-gray-800 text-3xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="submitUpdateSponsorship" class="flex-1 overflow-y-auto px-6 py-6">
          <div class="grid grid-cols-1 gap-6">
            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input v-model="newItem.name" type="text" class="input input-bordered w-full rounded-lg mt-1" />
            </div>

            <!-- Website Link -->
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Website Link
              </label>
              <input v-model="newItem.websiteLink" type="url" class="input input-bordered w-full rounded-lg mt-1" />
            </div>

            <!-- Logo (Optional for update) -->
            <div>
              <label for="logo-upload-edit" class="block text-sm font-medium text-gray-700 mb-2">
                Logo (leave empty to keep current logo)
              </label>
              <div v-if="logoPreview" class="mb-4">
                <p class="text-sm text-gray-500 mb-2">Current/Preview:</p>
                <img :src="logoPreview" alt="Logo Preview" class="w-48 h-24 object-contain border rounded bg-gray-50" />
              </div>
              <label
                for="logo-upload-edit"
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
                    <span class="font-semibold">{{ isLogoFile ? newItem.logo.name : 'Upload new logo' }}</span>
                  </p>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input @change="handleLogoUpload" id="logo-upload-edit" type="file" class="hidden" accept="image/*" />
              </label>
            </div>
          </div>
        </form>

        <!-- Footer Actions -->
        <div class="sticky bottom-0 z-10 flex justify-end gap-3 px-6 py-4 border-t bg-white">
          <button type="button" class="btn btn-ghost rounded-lg" @click="closeEditModal">Cancel</button>
          <button type="button" class="btn btn-primary rounded-lg" @click="submitUpdateSponsorship">Update</button>
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

// Sponsorships data
const sponsorships = ref([])
const isLoading = ref(false)
const loadError = ref('')

// Modal state
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingItemId = ref(null)
const newItem = ref({
  name: '',
  websiteLink: '',
  logo: null,
})
const logoPreview = ref(null)

// Computed property to check if logo is a File instance
const isLogoFile = computed(() => {
  return newItem.value.logo instanceof File
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
  editingItemId.value = null
  resetForm()
}

function resetForm() {
  newItem.value = {
    name: '',
    websiteLink: '',
    logo: null,
  }
  logoPreview.value = null
}

function openEditModal(item) {
  console.log('📝 Opening edit modal for sponsorship:', item)
  editingItemId.value = item.id
  
  newItem.value = {
    name: item.name,
    websiteLink: item.websiteLink,
    logo: item.logoUrl, // Store URL for preview
  }
  
  // Set logo preview to existing logo
  logoPreview.value = getImageUrl(item.logoUrl)
  showEditModal.value = true
}

function handleLogoUpload(event) {
  const file = event.target.files[0]
  if (file) {
    newItem.value.logo = file
    logoPreview.value = URL.createObjectURL(file)
  }
}

async function submitSponsorship() {
  if (!newItem.value.name || !newItem.value.websiteLink || !newItem.value.logo) {
    alert('Name, Website Link, and Logo are required.')
    return
  }

  try {
    const { $api } = useNuxtApp()
    const formData = new FormData()
    
    formData.append('name', newItem.value.name)
    formData.append('websiteLink', newItem.value.websiteLink)
    formData.append('logo', newItem.value.logo)

    await $api.post('/api/sponsorships', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    alert('Sponsorship created successfully!')
    await fetchSponsorships()
    closeCreateModal()
  } catch (error) {
    console.error('❌ Failed to create sponsorship:', error)
    const errorMsg = error.response?.data?.message || 'Failed to create sponsorship.'
    alert('Error: ' + errorMsg)
  }
}

async function submitUpdateSponsorship() {
  if (!newItem.value.name && !newItem.value.websiteLink && !(newItem.value.logo instanceof File)) {
    alert('Please fill at least one field to update.')
    return
  }

  try {
    const { $api } = useNuxtApp()
    const formData = new FormData()
    
    if (newItem.value.name) formData.append('name', newItem.value.name)
    if (newItem.value.websiteLink) formData.append('websiteLink', newItem.value.websiteLink)
    
    if (newItem.value.logo instanceof File) {
      formData.append('logo', newItem.value.logo)
    }

    await $api.put(`/api/sponsorships/${editingItemId.value}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    alert('Sponsorship updated successfully!')
    await fetchSponsorships()
    closeEditModal()
  } catch (error) {
    console.error('❌ Failed to update sponsorship:', error)
    const errorMsg = error.response?.data?.message || 'Failed to update sponsorship.'
    alert('Error: ' + errorMsg)
  }
}

async function deleteSponsorship(id) {
  if (!confirm('Are you sure you want to delete this sponsorship?')) {
    return
  }

  try {
    const { $api } = useNuxtApp()
    await $api.delete(`/api/sponsorships/${id}`)
    
    alert('Sponsorship deleted successfully!')
    await fetchSponsorships()
  } catch (error) {
    console.error('❌ Failed to delete sponsorship:', error)
    const errorMsg = error.response?.data?.message || 'Failed to delete sponsorship.'
    alert('Error: ' + errorMsg)
  }
}

// Close on ESC key
function handleKeydown(e) {
  if (e.key === 'Escape') {
    if (showCreateModal.value) closeCreateModal()
    if (showEditModal.value) closeEditModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  fetchSponsorships()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// Lock body scroll
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

async function fetchSponsorships() {
  isLoading.value = true
  loadError.value = ''
  try {
    const { $api } = useNuxtApp()
    const res = await $api.get('/api/sponsorships')
    
    let list = []
    if (res.data && Array.isArray(res.data)) {
      list = res.data
    } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
      list = res.data.data
    }
    
    sponsorships.value = list.map((item) => ({
      id: item._id || item.id,
      name: item.name || '-',
      websiteLink: item.websiteLink || '#',
      logoUrl: item.logoUrl || '',
    }))
  } catch (err) {
    console.error('Failed to fetch sponsorships:', err)
    loadError.value = 'Failed to load sponsorships.'
  } finally {
    isLoading.value = false
  }
}
</script>
