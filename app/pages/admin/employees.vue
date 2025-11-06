<template>
  <div class="flex flex-col bg-white space-y-8">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Manage Employees</h1>
        <p class="text-gray-600">Control and manage company employees</p>
      </div>
      <button
        class="bg-[#EB5523] text-white px-6 py-3 rounded-lg hover:bg-[#d94415] transition-colors font-medium"
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
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Name</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Position</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Email</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Phone</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Status</th>
            <th class="px-6 py-4 text-left text-gray-700 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200 hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-800">Andi Firman, ST.</td>
            <td class="px-6 py-4 text-gray-600">Direktur Utama</td>
            <td class="px-6 py-4 text-gray-600">andi.firman@ptdk.com</td>
            <td class="px-6 py-4 text-gray-600">+62812345670</td>
            <td class="px-6 py-4">
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
            </td>
            <td class="px-6 py-4">
              <button class="text-blue-500 hover:text-blue-700 mr-3">Edit</button>
              <button class="text-red-500 hover:text-red-700">Delete</button>
            </td>
          </tr>
          <tr class="border-b border-gray-200 hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-800">Farida, AMd.</td>
            <td class="px-6 py-4 text-gray-600">Direktur Keuangan</td>
            <td class="px-6 py-4 text-gray-600">farida@ptdk.com</td>
            <td class="px-6 py-4 text-gray-600">+62812345671</td>
            <td class="px-6 py-4">
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
            </td>
            <td class="px-6 py-4">
              <button class="text-blue-500 hover:text-blue-700 mr-3">Edit</button>
              <button class="text-red-500 hover:text-red-700">Delete</button>
            </td>
          </tr>
          <tr class="border-b border-gray-200 hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-800">Ahmad Mujahid, ST.</td>
            <td class="px-6 py-4 text-gray-600">Direktur Teknik</td>
            <td class="px-6 py-4 text-gray-600">ahmad.mujahid@ptdk.com</td>
            <td class="px-6 py-4 text-gray-600">+62812345672</td>
            <td class="px-6 py-4">
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
            </td>
            <td class="px-6 py-4">
              <button class="text-blue-500 hover:text-blue-700 mr-3">Edit</button>
              <button class="text-red-500 hover:text-red-700">Delete</button>
            </td>
          </tr>
          <tr class="border-b border-gray-200 hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-800">Mujiburrahman, ST.</td>
            <td class="px-6 py-4 text-gray-600">Direktur Marketing</td>
            <td class="px-6 py-4 text-gray-600">mujiburrahman@ptdk.com</td>
            <td class="px-6 py-4 text-gray-600">+62812345673</td>
            <td class="px-6 py-4">
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
            </td>
            <td class="px-6 py-4">
              <button class="text-blue-500 hover:text-blue-700 mr-3">Edit</button>
              <button class="text-red-500 hover:text-red-700">Delete</button>
            </td>
          </tr>
          <tr class="border-b border-gray-200 hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-800">Tim Bendahara & Administrasi</td>
            <td class="px-6 py-4 text-gray-600">Finance & Admin Staff</td>
            <td class="px-6 py-4 text-gray-600">bendahara@ptdk.com</td>
            <td class="px-6 py-4 text-gray-600">+62812345674</td>
            <td class="px-6 py-4">
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
            </td>
            <td class="px-6 py-4">
              <button class="text-blue-500 hover:text-blue-700 mr-3">Edit</button>
              <button class="text-red-500 hover:text-red-700">Delete</button>
            </td>
          </tr>
          <tr class="border-b border-gray-200 hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-800">Devisi Perencanaan</td>
            <td class="px-6 py-4 text-gray-600">Planning Division</td>
            <td class="px-6 py-4 text-gray-600">perencanaan@ptdk.com</td>
            <td class="px-6 py-4 text-gray-600">+62812345675</td>
            <td class="px-6 py-4">
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
            </td>
            <td class="px-6 py-4">
              <button class="text-blue-500 hover:text-blue-700 mr-3">Edit</button>
              <button class="text-red-500 hover:text-red-700">Delete</button>
            </td>
          </tr>
          <tr class="border-b border-gray-200 hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-800">Devisi Pengawasan</td>
            <td class="px-6 py-4 text-gray-600">Supervision Division</td>
            <td class="px-6 py-4 text-gray-600">pengawasan@ptdk.com</td>
            <td class="px-6 py-4 text-gray-600">+62812345676</td>
            <td class="px-6 py-4">
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
            </td>
            <td class="px-6 py-4">
              <button class="text-blue-500 hover:text-blue-700 mr-3">Edit</button>
              <button class="text-red-500 hover:text-red-700">Delete</button>
            </td>
          </tr>
          <tr class="border-b border-gray-200 hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-800">Devisi Non Jasa Konstruksi</td>
            <td class="px-6 py-4 text-gray-600">Non Construction Services</td>
            <td class="px-6 py-4 text-gray-600">non-konstruksi@ptdk.com</td>
            <td class="px-6 py-4 text-gray-600">+62812345677</td>
            <td class="px-6 py-4">
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
            </td>
            <td class="px-6 py-4">
              <button class="text-blue-500 hover:text-blue-700 mr-3">Edit</button>
              <button class="text-red-500 hover:text-red-700">Delete</button>
            </td>
          </tr>
          <tr class="border-b border-gray-200 hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-800">Staf Marketing</td>
            <td class="px-6 py-4 text-gray-600">Marketing Staff</td>
            <td class="px-6 py-4 text-gray-600">marketing@ptdk.com</td>
            <td class="px-6 py-4 text-gray-600">+62812345678</td>
            <td class="px-6 py-4">
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
            </td>
            <td class="px-6 py-4">
              <button class="text-blue-500 hover:text-blue-700 mr-3">Edit</button>
              <button class="text-red-500 hover:text-red-700">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
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
