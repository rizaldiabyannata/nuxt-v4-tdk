<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-row w-full justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-800">{{ judulHalaman }}</h1>
      <logout-component v-if="tampilanAktif === 'daftar'" />
    </div>
    <hr class="border-gray-200" />

    <!-- List View -->
    <div v-if="tampilanAktif === 'daftar'" class="space-y-8">
      <div class="flex flex-row justify-between items-center w-full">
        <button
          @click="tampilanAktif = 'buat'"
          class="btn btn-primary rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Create Portfolio
        </button>
        <div class="flex flex-row items-center space-x-4">
          <label
            class="input input-bordered flex items-center gap-2 rounded-lg"
          >
            <input
              type="text"
              class="grow"
              placeholder="Search"
              v-model="filter.search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="w-4 h-4 opacity-70"
            >
              <path
                fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
          <select
            class="select select-bordered rounded-lg"
            v-model="filter.status"
            @change="onFilterChange"
          >
            <option value="unarchive">Unarchive</option>
            <option value="archive">Archive</option>
          </select>
        </div>
      </div>

      <!-- Highlighted Portfolios -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-800">Highlighted Portfolios</h2>
        <div
          v-if="portoHighlightList && portoHighlightList.length > 0"
          class="grid gap-6 w-full bg-gray-50 rounded-lg border border-gray-200 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <PortoCardAdmin
            v-for="portfolio in portoHighlightList"
            :key="portfolio._id"
            :id="portfolio._id"
            :slug="portfolio.slug"
            :title="portfolio.title"
            :shortDescription="portfolio.shortDescription"
            :isArchived="portfolio.isArchived"
            :isHighlighted="true"
            :loading-highlight="loadingHighlights"
            :imageUrl="baseUrl + portfolio.coverImage"
            @unhighlight="deletePortHighlight"
            @edit="handleEdit"
            @archive="updatePortfolioStatus(portfolio.slug, 'archive')"
            @unarchive="updatePortfolioStatus(portfolio.slug, 'unarchive')"
          />
        </div>
        <div
          v-else
          class="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50"
        >
          <p class="text-gray-500">No highlighted portfolios.</p>
        </div>
      </div>

      <!-- All Portfolios -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-800">All Portfolios</h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full"
        >
          <PortoCardAdmin
            v-for="portfolio in portfoliosList"
            :key="portfolio._id"
            :id="portfolio._id"
            :slug="portfolio.slug"
            :title="portfolio.title"
            :shortDescription="portfolio.shortDescription"
            :isArchived="portfolio.isArchived"
            :isHighlighted="false"
            :loading-highlight="loadingHighlights"
            :imageUrl="baseUrl + portfolio.coverImage"
            @highlight="sendHighlight"
            @delete="deleteCard"
            @edit="handleEdit"
            @archive="updatePortfolioStatus(portfolio.slug, 'archive')"
            @unarchive="updatePortfolioStatus(portfolio.slug, 'unarchive')"
          />
        </div>
      </div>
    </div>

    <!-- Form View (Create/Edit) -->
    <div
      v-else
      class="bg-white border border-gray-200 p-8 rounded-lg shadow-sm"
    >
      <form
        @submit.prevent="isEditing ? updatePortfolio() : submitPortfolio()"
        class="space-y-6"
      >
        <div>
          <label for="title" class="block text-lg font-medium text-gray-700"
            >Portfolio Title</label
          >
          <input
            v-model="portfolio.title"
            type="text"
            id="title"
            class="mt-1 input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label
            for="cover-image-upload"
            class="block text-lg font-medium text-gray-700 mb-2"
            >Cover Image</label
          >
          <div v-if="existingImageUrl && isEditing" class="mb-4">
            <p class="text-sm text-gray-500 mb-2">Current Image:</p>
            <img
              crossorigin="anonymous"
              :src="existingImageUrl"
              alt="Image Preview"
              class="w-full max-w-sm h-auto rounded-lg object-cover border"
            />
          </div>
          <label
            for="cover-image-upload"
            class="relative flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div class="text-center">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p class="mt-2 text-sm text-gray-600">
                <span class="font-semibold">{{
                  portfolio.coverImage
                    ? portfolio.coverImage.name
                    : isEditing
                    ? "Choose new image (optional)"
                    : "Upload a file"
                }}</span>
              </p>
              <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input
              @change="handleFileUpload"
              id="cover-image-upload"
              type="file"
              class="hidden"
              accept="image/*"
            />
          </label>
        </div>

        <div>
          <label
            for="shortDescription"
            class="block text-lg font-medium text-gray-700"
            >Short Description</label
          >
          <textarea
            v-model="portfolio.shortDescription"
            id="shortDescription"
            rows="3"
            class="mt-1 textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        <div>
          <label
            for="description"
            class="block text-lg font-medium text-gray-700"
            >Description</label
          >
          <div class="mt-1 border border-gray-300 rounded-lg">
            <client-only>
              <TiptapEditor v-model="portfolio.description" />
            </client-only>
          </div>
        </div>

        <div class="flex justify-end pt-4 space-x-4">
          <button
            @click="resetForm"
            type="button"
            class="btn btn-ghost rounded-lg"
          >
            Cancel
          </button>
          <button @click="togglePreview" type="button" class="btn rounded-lg">
            Preview
          </button>
          <button type="submit" class="btn btn-primary rounded-lg">
            {{ isEditing ? "Update Portfolio" : "Submit Portfolio" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

export default {
  setup() {
    // Expose baseUrl for Options API methods via returned bindings
    const baseUrl = useRuntimeConfig().public.apiBaseUrl;
    return { baseUrl };
  },
  data() {
    return {
      tampilanAktif: "daftar", // 'daftar', 'buat', 'edit'
      portfoliosList: [],
      portoHighlightList: [],
      portfolio: {
        slug: null,
        title: "",
        shortDescription: "",
        description: "",
        coverImage: null,
      },
      existingImageUrl: null,
      loadingHighlights: null,
      searchTimeout: null,
      filter: {
        status: "unarchive",
        search: "",
      },
    };
  },
  computed: {
    isEditing() {
      return this.tampilanAktif === "edit";
    },
    judulHalaman() {
      if (this.tampilanAktif === "buat") return "Create Portfolio";
      if (this.tampilanAktif === "edit") return "Edit Portfolio";
      return "Portfolios";
    },
  },
  created() {
    this.fetchPortfolios();
    this.fetchHighlighted();
  },
  watch: {
    "filter.search"() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.fetchPortfolios();
      }, 500);
    },
  },
  methods: {
    resetForm() {
      this.tampilanAktif = "daftar";
      this.portfolio = {
        slug: null,
        title: "",
        shortDescription: "",
        description: "",
        coverImage: null,
      };
      this.existingImageUrl = null;
    },
    async fetchPortfolios() {
      const { search, status } = this.filter;
      let apiUrl = `/api/portfolios?limit=10&page=1`;
      if (status === "unarchive") {
        apiUrl += `&status=active`;
      } else if (status === "archive") {
        apiUrl += `&status=archived`;
      }
      if (search) {
        apiUrl += `&search=${encodeURIComponent(search)}`;
      }
      console.log("Fetching portfolios with url:", apiUrl);
      try {
        const response = await this.$api.get(apiUrl);
        this.portfoliosList = response.data.data || [];
      } catch (error) {
        console.error("Failed to fetch portfolios:", error);
        this.portfoliosList = [];
      }
    },
    onFilterChange() {
      this.fetchPortfolios();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.portfolio.coverImage = file;
        if (this.isEditing) {
          this.existingImageUrl = URL.createObjectURL(file);
        }
      }
    },
    async processEditorImages(htmlContent) {
      // Implementation from previous examples
      return htmlContent;
    },
    async submitPortfolio() {
      const processedDescription = await this.processEditorImages(
        this.portfolio.description
      );
      const formData = new FormData();
      formData.append("title", this.portfolio.title);
      formData.append("description", processedDescription);
      formData.append("shortDescription", this.portfolio.shortDescription);
      if (this.portfolio.coverImage) {
        formData.append("coverImage", this.portfolio.coverImage);
      }
      try {
        await this.$api.post("/api/portfolios/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        useToast().success?.({
          title: "Success",
          message: "Portfolio created successfully.",
        });
        this.resetForm();
        await this.fetchPortfolios();
        await this.fetchHighlighted();
      } catch (error) {
        console.error("Failed to create portfolio:", error);
        useToast().error?.({
          title: "Error",
          message: "Failed to create portfolio.",
        });
      }
    },
    async handleEdit(slug) {
      try {
        const response = await this.$api.get(`/api/portfolios/${slug}`);
        const dataToEdit = response.data.data;
        this.portfolio = {
          slug: dataToEdit.slug,
          title: dataToEdit.title,
          shortDescription: dataToEdit.shortDescription,
          description: dataToEdit.description,
          coverImage: null,
        };
        this.existingImageUrl = `${this.baseUrl}${dataToEdit.coverImage}`;
        this.tampilanAktif = "edit";
      } catch (error) {
        console.error("Failed to fetch portfolio for editing:", error);
      }
    },
    async updatePortfolio() {
      const processedDescription = await this.processEditorImages(
        this.portfolio.description
      );
      const formData = new FormData();
      formData.append("title", this.portfolio.title);
      formData.append("description", processedDescription);
      formData.append("shortDescription", this.portfolio.shortDescription);
      if (this.portfolio.coverImage instanceof File) {
        formData.append("coverImage", this.portfolio.coverImage);
      }
      try {
        await this.$api.put(
          `/api/portfolios/${this.portfolio.slug}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        useToast().success?.("Portfolio updated successfully.");
        this.resetForm();
        await this.fetchPortfolios();
        await this.fetchHighlighted();
      } catch (error) {
        console.error("Failed to update portfolio:", error);
        useToast().error?.({
          title: "Error",
          message: "Failed to update portfolio.",
        });
      }
    },
    async updatePortfolioStatus(slug, status) {
      try {
        const action = status === "archive" ? "archive" : "unarchive";
        await this.$api.patch(`/api/portfolios/${slug}/${action}`);
        useToast().success?.({
          title: "Success",
          message: `Portfolio successfully ${action}d.`,
        });
        await this.fetchPortfolios();
        await this.fetchHighlighted();
      } catch (error) {
        console.error(`Failed to ${status} portfolio:`, error);
        useToast().error?.({
          title: "Error",
          message: `Failed to ${status} portfolio.`,
        });
      }
    },
    async sendHighlight(portfolioId) {
      if (!portfolioId) return;
      // Batasi maksimal 5 highlighted
      if (this.portoHighlightList && this.portoHighlightList.length >= 5) {
        useToast().error({
          title: "Limit Reached",
          message:
            "Maksimal highlighted portfolio adalah 5. Silakan hapus salah satu sebelum menambah yang baru.",
        });
        return;
      }
      this.loadingHighlights = portfolioId;
      try {
        await this.$api.post(
          "/api/content-tracking/highlighted-portfolios",
          { portfolioId },
          { headers: { "Content-Type": "application/json" } }
        );
        useToast().success?.({
          title: "Success",
          message: "Portfolio highlighted successfully.",
        });
        await this.fetchPortfolios();
        await this.fetchHighlighted();
      } catch (err) {
        console.error("Failed to highlight portfolio:", err);
        useToast().error?.("Failed to highlight portfolio.");
      } finally {
        this.loadingHighlights = null;
      }
    },
    async fetchHighlighted() {
      try {
        const response = await this.$api.get("/api/content-tracking/");
        this.portoHighlightList = response.data.highlightedPortfolios || [];
      } catch (error) {
        console.error("Failed to fetch highlighted portfolios:", error);
        this.portoHighlightList = [];
      }
    },
    deleteCard(slug) {
      if (confirm("Are you sure you want to delete this portfolio?")) {
        this.confirmDelete(slug);
      }
    },
    async confirmDelete(slug) {
      try {
        await this.$api.delete(`/api/portfolios/${slug}`);
        useToast().success?.("Portfolio deleted successfully.");
        await this.fetchPortfolios();
        await this.fetchHighlighted();
      } catch (error) {
        console.error("Failed to delete portfolio:", error);
        useToast().error?.("Failed to delete portfolio.");
      }
    },
    async deletePortHighlight(portfolioId) {
      if (!confirm("Remove this portfolio from highlights?")) return;
      this.loadingHighlights = portfolioId;
      try {
        await this.$api.delete(
          `/api/content-tracking/highlighted-portfolios/${portfolioId}`
        );
        useToast().success?.({
          title: "Success",
          message: "Portfolio highlight removed.",
        });
        await this.fetchHighlighted();
      } catch (error) {
        console.error("Failed to remove highlight:", error);
        useToast().error?.("Failed to remove portfolio highlight.");
      } finally {
        this.loadingHighlights = null;
      }
    },
    togglePreview() {
      const slug = this.portfolio.slug || "new";
      const path = `/admin/portfolios/preview-${slug}`;

      const coverImageUrl =
        this.portfolio.coverImage instanceof File
          ? URL.createObjectURL(this.portfolio.coverImage)
          : this.existingImageUrl || "";

      navigateTo({
        path: path,
        query: {
          title: this.portfolio.title,
          shortDescription: this.portfolio.shortDescription,
          description: this.portfolio.description,
          coverImage: coverImageUrl,
        },
      });
    },
  },
};
</script>
