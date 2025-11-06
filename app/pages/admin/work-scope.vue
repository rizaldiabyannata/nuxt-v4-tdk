<template>
  <div class="flex flex-col bg-white space-y-8">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Work Scope Management</h1>
        <p class="text-gray-600">Control and manage work scope that can be handled</p>
      </div>
      <button
        class="bg-[#EB5523] text-white px-6 py-3 rounded-lg hover:bg-[#d94415] transition-colors font-medium"
      >
        + Add Work Scope
      </button>
    </div>

    <hr class="border-gray-200" />

    <!-- Work Scope Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Work Scope Card - Perencanaan Proyek -->
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Perencanaan Proyek</h3>
            <p class="text-sm text-gray-500">Project Planning</p>
          </div>
          <button class="text-gray-400 hover:text-gray-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14M12 5v14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div class="mb-4">
          <p class="text-gray-600 text-sm mb-2 font-medium">Scope:</p>
          <ul class="text-gray-600 text-xs space-y-1 mb-3 list-disc list-inside">
            <li>Perencanaan konstruksi gedung</li>
            <li>Desain jalan dan jembatan</li>
            <li>Proyek irigasi dan sumber daya air</li>
          </ul>
          <p class="text-gray-600 text-sm mb-3 font-medium">Handled by:</p>
          <div class="flex flex-wrap gap-2">
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">John Doe</span>
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Jane Smith</span>
          </div>
        </div>
        <div class="flex gap-2 pt-4 border-t border-gray-200">
          <button class="flex-1 text-blue-500 hover:text-blue-700 text-sm font-medium">Edit</button>
          <button class="flex-1 text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
        </div>
      </div>

      <!-- Work Scope Card - Supervisi Proyek -->
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Supervisi Proyek</h3>
            <p class="text-sm text-gray-500">Project Supervision</p>
          </div>
          <button class="text-gray-400 hover:text-gray-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14M12 5v14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div class="mb-4">
          <p class="text-gray-600 text-sm mb-2 font-medium">Scope:</p>
          <ul class="text-gray-600 text-xs space-y-1 mb-3 list-disc list-inside">
            <li>Jaminan kualitas di lokasi</li>
            <li>Kepatuhan terhadap protokol keselamatan</li>
            <li>Penyelesaian proyek tepat waktu</li>
          </ul>
          <p class="text-gray-600 text-sm mb-3 font-medium">Handled by:</p>
          <div class="flex flex-wrap gap-2">
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Peter Jones</span>
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Alice Brown</span>
          </div>
        </div>
        <div class="flex gap-2 pt-4 border-t border-gray-200">
          <button class="flex-1 text-blue-500 hover:text-blue-700 text-sm font-medium">Edit</button>
          <button class="flex-1 text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
        </div>
      </div>

      <!-- Work Scope Card - Manajemen Konstruksi -->
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Manajemen Konstruksi</h3>
            <p class="text-sm text-gray-500">Construction Management</p>
          </div>
          <button class="text-gray-400 hover:text-gray-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14M12 5v14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div class="mb-4">
          <p class="text-gray-600 text-sm mb-2 font-medium">Scope:</p>
          <ul class="text-gray-600 text-xs space-y-1 mb-3 list-disc list-inside">
            <li>Manajemen biaya dan anggaran</li>
            <li>Penjadwalan dan koordinasi</li>
            <li>Manajemen risiko dan mitigasi</li>
          </ul>
          <p class="text-gray-600 text-sm mb-3 font-medium">Handled by:</p>
          <div class="flex flex-wrap gap-2">
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Bob Wilson</span>
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Rizky Pratama</span>
          </div>
        </div>
        <div class="flex gap-2 pt-4 border-t border-gray-200">
          <button class="flex-1 text-blue-500 hover:text-blue-700 text-sm font-medium">Edit</button>
          <button class="flex-1 text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
</script>

<style scoped></style>
