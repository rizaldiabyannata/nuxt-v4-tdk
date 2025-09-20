<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-row w-full justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">User Profile</h1>
      <logout-component />
    </div>
    <hr class="border-gray-200" />

    <!-- Profile Form Card -->
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
      <form @submit.prevent="updateProfile" class="space-y-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Avatar Section -->
          <div class="lg:col-span-1 space-y-2">
            <h2 class="text-lg font-medium text-gray-700">Profile Picture</h2>
            <div class="flex flex-col items-center space-y-4 mt-24">
              <div class="relative w-40 h-40">
                <img class="w-full h-full rounded-full object-contain" :src="previewImageUrl || '/img/logotdk.png'" alt="User Avatar" />
              </div>
            </div>
          </div>

          <!-- Form Fields Section -->
          <div class="lg:col-span-2 space-y-6">
            <div>
              <label for="name" class="label">
                <span class="label-text text-base font-medium">Name</span>
              </label>
              <input v-model="user.name" type="text" id="name" class="input input-bordered w-full" placeholder="Enter your name" />
            </div>
            <div>
              <label for="email" class="label">
                <span class="label-text text-base font-medium">Recovery Email</span>
              </label>
              <input v-model="user.email" type="email" id="email" class="input input-bordered w-full" placeholder="Enter recovery email" required />
            </div>
            <div>
              <label for="password" class="label">
                <span class="label-text text-base font-medium">New Password</span>
              </label>
              <input v-model="user.password" type="password" id="password" class="input input-bordered w-full" placeholder="Enter new password" />
              <label class="label">
                <span class="label-text-alt">Leave blank to keep current password</span>
              </label>
            </div>
            <div>
              <label for="confirm_password" class="label">
                <span class="label-text text-base font-medium">Confirm Password</span>
              </label>
              <input v-model="user.confirmPassword" type="password" id="confirm_password" class="input input-bordered w-full" placeholder="Confirm new password" />
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end pt-4 border-t border-gray-200">
          <button type="submit" class="btn btn-primary rounded-lg">Update Profile</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      previewImageUrl: "",
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.user.avatar = file;
        this.previewImageUrl = URL.createObjectURL(file);
      }
    },
    async updateProfile() {
      if (this.user.password && this.user.password !== this.user.confirmPassword) {
        this.$toast?.error?.("Passwords do not match.");
        return;
      }

      const payload = {
        name: this.user.name,
        email: this.user.email,
      };
      if (this.user.password) {
        payload.password = this.user.password;
      }

      try {
        await this.$api.put("/api/user/update", payload);
        this.$toast?.success?.("Profile updated successfully.");
      } catch (error) {
        console.error("Failed to update profile:", error);
        this.$toast?.error?.(error.response?.data?.message || "Failed to update profile.");
      }
    },
    async fetchProfile() {
      try {
        const response = await this.$api.get("/api/users/profile");
        const profile = response.data.data;
        this.user.name = profile.name;
        this.user.email = profile.email;
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    },
  },
  created() {
    this.fetchProfile();
  },
};

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
</script>
