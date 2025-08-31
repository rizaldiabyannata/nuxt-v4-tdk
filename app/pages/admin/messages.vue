<template>
  <div class="flex flex-col min-h-screen bg-white py-4">
    <div class="flex flex-row w-full justify-between px-6 items-center">
      <h1 class="text-3xl font-bold text-[#EB5523]">Messages</h1>
      <logout-component />
    </div>
    <hr class="border-0.5 border-black mt-4" />
    <div class="flex flex-col w-full h-full p-12">
      <div class="rounded-box border border-gray-300 text-black">
        <table class="table">
          <thead>
            <tr class="text-center text-black border-b border-black">
              <th>From</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody v-if="!messages">
            <tr class="text-center">
              <td colspan="3">Loading data...</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr class="border-b border-gray-200" v-for="(message, index) in messages" :key="index">
              <td class="text-center">{{ message.name }}</td>
              <td class="text-center">{{ message.email }}</td>
              <td class="text-center">{{ message.message }}</td>
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
        // API URL dasar
        let apiUrl = "/contact-form/";
        const response = await this.$api.get(apiUrl);
        console.log("Data message berhasil diambil:", response.data);
        this.messages = response.data;
      } catch (error) {
        console.error("Gagal mengambil data message:", error);
      }
    },
  },
};

definePageMeta({
  layout: "admin",
});
</script>
