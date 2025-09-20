<template>
  <div class="w-full h-screen bg-white flex justify-center items-center">
    <div class="w-[900px] h-[500px] bg-[url(/img/grafisbg.png)] bg-cover bg-no-repeat rounded-2xl justify-center items-center flex flex-col shadow-lg shadow-gray-400">
      <h1 class="text-white text-3xl font-semibold">Recovery Admin Account</h1>
      <h2 class="text-white text-xl">Admin Access Only</h2>
      <div class="w-full flex flex-col px-50 mt-6">
        <label for="email" class="mb-2 text-xl font-medium text-gray-300">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model="email"
          class="p-3 w-full border border-white text-white rounded-2xl focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Your Email"
          required
        />
        <button
          class="flex w-full justify-end text-[#EB5523] pt-2 cursor-pointer hover:text-white"
          @click="requestOtp"
          :disabled="isLoading"
        >
          {{ isLoading ? "Sending..." : "Send OTP" }}
        </button>
        
        <div v-if="showOtpSentModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
            <svg class="mb-4" width="48" height="48" fill="none" viewBox="0 0 24 24">
              <path
                fill="#22c55e"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm-1.293-6.707 7-7-1.414-1.414-5.293 5.293-2.293-2.293-1.414 1.414 3.707 3.707Z"
              />
            </svg>
            <h3 class="text-lg font-semibold mb-2 text-gray-800">OTP Sent Successfully</h3>
            <p class="text-gray-600 mb-4">Please check your email for the OTP code.</p>
            <button @click="showOtpSentModal = false" class="bg-[#EB5523] text-white px-6 py-2 rounded-lg hover:bg-opacity-90">Close</button>
          </div>
        </div>

        <div class="flex w-full justify-end mt-6">
          <NuxtLink to="/change-password" class="flex flex-row space-x-4 text-white border border-white p-2 w-fit rounded-3xl px-4 justify-center items-center">
            <p>Recovery</p>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.25 22.75V20.5833H5.41667V5.41667C5.41667 4.82083 5.629 4.31094 6.05367 3.887C6.47833 3.46306 6.98822 3.25072 7.58333 3.25H18.4167C19.0125 3.25 19.5228 3.46233 19.9474 3.887C20.3721 4.31167 20.5841 4.82156 20.5833 5.41667V20.5833H22.75V22.75H3.25ZM18.4167 20.5833V5.41667H7.58333V20.5833H18.4167ZM15.1667 14.0833C15.4736 14.0833 15.7311 13.9793 15.9391 13.7713C16.1471 13.5633 16.2507 13.3062 16.25 13C16.2493 12.6938 16.1453 12.4367 15.938 12.2287C15.7307 12.0207 15.4736 11.9167 15.1667 11.9167C14.8597 11.9167 14.6026 12.0207 14.3953 12.2287C14.1881 12.4367 14.0841 12.6938 14.0833 13C14.0826 13.3062 14.1866 13.5637 14.3953 13.7724C14.6041 13.9811 14.8612 14.0848 15.1667 14.0833Z"
                fill="#FFFBFC"
              />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      showOtpSentModal: false, // State to control the modal's visibility
      isLoading: false, // State to handle loading feedback
    };
  },
  methods: {
    async requestOtp() {
      if (this.isLoading) return; // Prevent multiple clicks while sending

      this.isLoading = true;
      try {
        await this.$api.post("/api/user/request-password-reset", { email: this.email });
        this.showOtpSentModal = true; // Show the modal on success
        this.$toast?.success?.("OTP sent to your email.");
      } catch (error) {
        this.$toast?.error?.(error.response?.data?.message || "Failed to send OTP.");
      } finally {
        this.isLoading = false; // Reset loading state regardless of outcome
      }
    },
  },
};
</script>