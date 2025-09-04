<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-row w-full justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">Messages</h1>
      <logout-component />
    </div>
    <hr class="border-gray-200" />

    <!-- Table Container -->
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50">
              <th class="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">From</th>
              <th class="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th class="p-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Message</th>
            </tr>
          </thead>
          <tbody v-if="!messages" class="bg-white">
            <tr>
              <td colspan="3" class="p-4 text-center text-gray-500">Loading data...</td>
            </tr>
          </tbody>
          <tbody v-else class="bg-white divide-y divide-gray-200">
            <tr v-if="messages.length === 0">
              <td colspan="3" class="p-4 text-center text-gray-500">No messages found.</td>
            </tr>
            <tr v-for="(message, index) in messages" :key="index" class="hover:bg-gray-50">
              <td class="p-4 whitespace-nowrap">{{ message.name }}</td>
              <td class="p-4 whitespace-nowrap">{{ message.email }}</td>
              <td class="p-4 text-gray-700">{{ message.message }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: null,
    };
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      try {
        const response = await this.$api.get("/api/contact-form/");
        this.messages = response.data;
      } catch (error) {
        console.error("Gagal mengambil data message:", error);
        this.messages = []; // Set to empty array on error
      }
    },
  },
};

definePageMeta({
  layout: "admin",
});
</script>
