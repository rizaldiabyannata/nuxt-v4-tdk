<template>
  <div class="w-full h-screen bg-white flex justify-center items-center">
    <div class="w-[900px] h-[550px] bg-[url(/img/grafisbg.png)] bg-cover bg-no-repeat rounded-2xl justify-center items-center flex flex-col shadow-lg shadow-gray-400">
      <h1 class="text-white text-3xl font-semibold">Recovery Admin Account</h1>
      <h2 class="text-white text-xl">Admin Access Only</h2>
      <div class="w-full flex flex-col px-50 mt-6">
        <label for="otp" class="mb-3 text-xl font-medium text-gray-300">OTP Code</label>
        <div class="flex justify-center w-full gap-8" id="otp">
          <input
            v-for="i in 6"
            :key="i"
            :ref="(el) => setInputRef(el, i - 1)"
            v-model="otp[i - 1]"
            @input="handleInput($event, i - 1)"
            @keydown="handleKeydown($event, i - 1)"
            @paste="handlePaste"
            type="text"
            maxlength="1"
            pattern="[0-9]"
            class="w-14 h-14 border border-white text-white text-center text-2xl sm:text-3xl font-bold rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>
        <p v-if="fullOtp.length === 6" class="mt-4 text-sm text-gray-300">Kode OTP Anda: {{ fullOtp }}</p>
        <label for="password" class="mb-2 text-xl font-medium text-gray-300 pt-4">Password</label>
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
          class="p-3 w-full border border-white text-white rounded-2xl focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="New Password"
          required
        />

        <label for="confirm_password" class="mb-2 text-xl font-medium text-gray-300 pt-4">Confirm Password</label>
        <input
          v-model="confirmPassword"
          type="password"
          name="confirm_password"
          id="confirm_password"
          class="p-3 w-full border border-white text-white rounded-2xl focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Confirm Password"
          required
        />

        <div class="h-5 mt-1">
          <p v-if="validationMessage" :class="messageClass" class="text-md pt-2 font-medium text-white">
            {{ validationMessage }}
          </p>
        </div>

        <div class="flex w-full justify-end mt-6">
          <button
            :disabled="isRecoveryDisabled"
            @click="changePassword"
            class="flex flex-row space-x-4 text-white border border-white p-2 w-fit rounded-3xl px-4 justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <p>Recovery</p>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.25 22.75V20.5833H5.41667V5.41667C5.41667 4.82083 5.629 4.31094 6.05367 3.887C6.47833 3.46306 6.98822 3.5072 7.58333 3.25H18.4167C19.0125 3.25 19.5228 3.46233 19.9474 3.887C20.3721 4.31167 20.5841 4.82156 20.5833 5.41667V20.5833H22.75V22.75H3.25ZM18.4167 20.5833V5.41667H7.58333V20.5833H18.4167ZM15.1667 14.0833C15.4736 14.0833 15.7311 13.9793 15.9391 13.7713C16.1471 13.5633 16.2507 13.3062 16.25 13C16.2493 12.6938 16.1453 12.4367 15.938 12.2287C15.7307 12.0207 15.4736 11.9167 15.1667 11.9167C14.8597 11.9167 14.6026 12.0207 14.3953 12.2287C14.1881 12.4367 14.0841 12.6938 14.0833 13C14.0826 13.3062 14.1866 13.5637 14.3953 13.7724C14.6041 13.9811 14.8612 14.0848 15.1667 14.0833Z"
                fill="#FFFBFC"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      otp: ["", "", "", "", "", ""],
      inputRefs: [],
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    setInputRef(el, index) {
      if (el) {
        this.inputRefs[index] = el;
      }
    },
    handleInput(event, index) {
      const input = event.target;
      if (input.value.match(/^[0-9]$/)) {
        if (index < 5) {
          this.inputRefs[index + 1]?.focus();
        }
      } else {
        input.value = "";
      }
    },
    handleKeydown(event, index) {
      if (event.key === "Backspace") {
        if (this.otp[index] === "" && index > 0) {
          this.inputRefs[index - 1]?.focus();
        }
      }
    },
    handlePaste(event) {
      event.preventDefault();
      const pastedData = event.clipboardData.getData("text").slice(0, 6);
      if (pastedData.match(/^[0-9]+$/)) {
        for (let i = 0; i < pastedData.length; i++) {
          this.otp[i] = pastedData[i];
        }
        const lastFilledIndex = Math.min(pastedData.length - 1, 5);
        this.inputRefs[lastFilledIndex]?.focus();
      }
    },
    async changePassword() {
      try {
        const otp = this.fullOtp;
        const newPassword = this.password;
        await this.$api.post("/api/user/reset-password", {
          otp: otp,
          newPassword: newPassword,
        });
        this.$toast?.success?.("Password berhasil diubah.");
        console.log("Change password success");
        this.$router.push("/login");
      } catch (error) {
        this.$toast?.error?.(error.response?.data?.message || "Gagal mengubah password.");
        console.log("Change password failed", error);
      }
    },
  },
  computed: {
    validationMessage() {
      if (this.confirmPassword === "" && this.password === "") {
        return "";
      }
      if (this.password !== this.confirmPassword && this.confirmPassword !== "") {
        return "Passwords dont match!";
      }
      if (this.password === this.confirmPassword && this.password !== "") {
        return "Passwords match!";
      }
      return "";
    },
    messageClass() {
      return this.password !== this.confirmPassword ? "text-red-500" : "text-green-400";
    },
    isRecoveryDisabled() {
      return this.password === "" || this.confirmPassword === "" || this.password !== this.confirmPassword;
    },
    fullOtp() {
      return this.otp.join("");
    },
  },
};
</script>
