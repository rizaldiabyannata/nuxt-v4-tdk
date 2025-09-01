<template>
  <div class="flex flex-col min-h-screen bg-white py-4">
    <div class="flex flex-row w-full justify-between px-6 items-center">
      <h1 class="text-3xl font-bold text-[#EB5523]">{{ judulHalaman }}</h1>
      <logout-component />
    </div>
    <hr class="border-0.5 border-black mt-4" />

    <div v-if="tampilanAktif === 'daftar'" class="px-6 mt-12">
      <div class="flex flex-row justify-between items-center w-full">
        <button @click="tampilanAktif = 'buat'" class="btn shadow-none border-0 flex flex-row justify-center items-center space-x-2 px-4 py-3 rounded-xl bg-[#EB5523] text-white">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.857 3.56689C11.3367 3.56689 11.7255 3.95575 11.7255 4.43543V10.5151H17.8053C18.2849 10.5151 18.6738 10.904 18.6738 11.3837C18.6738 11.8634 18.2849 12.2522 17.8053 12.2522H11.7255V18.3319C11.7255 18.8116 11.3367 19.2005 10.857 19.2005C10.3773 19.2005 9.98847 18.8116 9.98847 18.3319V12.2522H3.90875C3.42908 12.2522 3.04022 11.8634 3.04022 11.3837C3.04022 10.904 3.42908 10.5151 3.90875 10.5151H9.98847V4.43543C9.98847 3.95575 10.3773 3.56689 10.857 3.56689Z"
              fill="#F1F1F1"
            />
          </svg>
          <p>Create Portfolio</p>
        </button>
        <div class="flex flex-row items-center space-x-3">
          <label class="input">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" class="grow" placeholder="Search" v-model="filter.search" @input="onFilterChange" />
          </label>

          <label class="select">
            <span class="label">Filter</span>
            <select v-model="filter.status" @change="onFilterChange">
              <option value="all">All</option>
              <option value="unarchive">Unarchive</option>
              <option value="archive">Archive</option>
            </select>
          </label>
        </div>
      </div>

      <div class="flex flex-col w-full mt-6 space-y-4">
        <h1 class="text-2xl font-bold text-[#EB5523]">Highlight Portfolio</h1>

        <div class="grid gap-4 w-full border border-black rounded-4xl p-4 space-x-2 items-center grid-cols-4">
          <!-- dummy -->

          <PortoCardAdmin />

          <PortoCardAdmin />

          <PortoCardAdmin />

          <PortoCardAdmin />

          <PortoCardAdmin
            v-for="portfolio in portoHighlightList"
            :key="portfolio._id"
            :id="portfolio._id"
            :slug="portfolio.slug"
            :title="portfolio.title"
            :shortDescription="portfolio.shortDescription"
            :imageUrl="`http://localhost:5000${portfolio.coverImage}`"
            @highlight="sendHighlight"
            @deleteHighlight="deletePortHighlight"
            @edit="handleEdit"
          />
        </div>
      </div>

      <div class="grid grid-cols-4 gap-12 w-full pt-6">
        <PortoCardAdmin
          v-for="portfolio in portfoliosList"
          :key="portfolio._id"
          :id="portfolio._id"
          :slug="portfolio.slug"
          :title="portfolio.title"
          :shortDescription="portfolio.shortDescription"
          :imageUrl="`http://localhost:5000${portfolio.coverImage}`"
          @highlight="sendHighlight"
          @delete="deleteCard"
          @edit="handleEdit"
        />
      </div>
    </div>

    <div v-else-if="tampilanAktif === 'buat'" class="px-6">
      <div class="bg-gray-50 p-8 rounded-lg">
        <form @submit.prevent="submitPortfolio" class="space-y-4">
          <div>
            <label for="title" class="block text-2xl font-bold text-[#EB5523]">Portfolio Title</label>
            <input v-model="portfolio.title" type="text" id="title" class="mt-1 block w-full shadow-sm p-2 text-black border border-gray-700 rounded-2xl" required />
          </div>
          <div>
            <label for="cover-image-upload" class="block text-2xl font-bold text-[#EB5523] mb-2">Cover Image</label>
            <label
              for="cover-image-upload"
              class="relative flex flex-col items-center justify-center w-full h-32 border-2 border-gray-400 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center justify-center bg-[#EB5523] text-white p-2 rounded-box">
                <span v-if="portfolio.coverImage">{{ portfolio.coverImage.name }}</span>
                <svg v-else class="w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.75V14.25M5.75 10H14.25" />
                </svg>
              </div>
              <input @change="handleFileUpload" id="cover-image-upload" type="file" class="hidden" accept="image/*" />
            </label>
          </div>
          <div>
            <label for="shortDescription" class="block text-2xl font-bold text-[#EB5523]">Short Description</label>
            <textarea
              v-model="portfolio.shortDescription"
              id="shortDescription"
              rows="4"
              class="mt-1 block w-full shadow-sm p-2 text-black border border-gray-700 rounded-2xl"
              required
            ></textarea>
          </div>
          <div>
            <label for="description" class="block text-2xl font-bold text-[#EB5523]">Description</label>
            <TiptapEditor v-model="portfolio.description" class="mt-1" />
          </div>
          <div class="flex justify-end pt-4 space-x-3">
            <button @click="tampilanAktif = 'daftar'" type="button" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
            <button @click="togglePreview" type="button" class="flex flex-row items-center space-x-2 px-4 py-2 bg-[#2949BE] text-white rounded-lg">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 20H5C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18V6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4H15C15.5304 4 16.0391 4.21071 16.4142 4.58579C16.7893 4.96086 17 5.46957 17 6V7M19 20C18.4696 20 17.9609 19.7893 17.5858 19.4142C17.2107 19.0391 17 18.5304 17 18V7M19 20C19.5304 20 20.0391 19.7893 20.4142 19.4142C20.7893 19.0391 21 18.5304 21 18V9C21 8.46957 20.7893 7.96086 20.4142 7.58579C20.0391 7.21071 19.5304 7 19 7H17M13 4H9M7 16H13M7 8H13V12H7V8Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>Preview</p>
            </button>
            <button type="submit" class="flex flex-row items-center space-x-2 px-4 py-2 bg-[#EB5523] text-white rounded-lg hover:bg-orange-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.4549 5.41583C21.5499 5.56004 21.5922 5.73261 21.5747 5.90442C21.5573 6.07622 21.481 6.23673 21.3589 6.35883L12.1659 15.5508C12.0718 15.6448 11.9545 15.7121 11.8259 15.7458L7.99689 16.7458C7.87032 16.7788 7.73732 16.7782 7.61109 16.7439C7.48485 16.7096 7.36978 16.6429 7.27729 16.5504C7.18479 16.4579 7.1181 16.3429 7.08382 16.2166C7.04955 16.0904 7.04888 15.9574 7.08189 15.8308L8.08189 12.0028C8.1118 11.8882 8.16679 11.7816 8.24289 11.6908L17.4699 2.46983C17.6105 2.32938 17.8011 2.25049 17.9999 2.25049C18.1986 2.25049 18.3893 2.32938 18.5299 2.46983L21.3589 5.29783C21.3938 5.33467 21.4259 5.37411 21.4549 5.41583ZM19.7679 5.82783L17.9999 4.06083L9.48189 12.5788L8.85689 14.9718L11.2499 14.3468L19.7679 5.82783Z"
                  fill="white"
                />
                <path
                  d="M19.641 17.1601C19.9143 14.824 20.0016 12.47 19.902 10.1201C19.8997 10.0647 19.9088 10.0094 19.929 9.95778C19.9491 9.90614 19.9798 9.85925 20.019 9.82008L21.003 8.83608C21.0299 8.80904 21.064 8.79033 21.1013 8.78222C21.1385 8.77411 21.1774 8.77693 21.2131 8.79034C21.2488 8.80375 21.2798 8.82719 21.3025 8.85783C21.3252 8.88847 21.3386 8.92502 21.341 8.96308C21.5257 11.7543 21.4554 14.5566 21.131 17.3351C20.895 19.3571 19.271 20.9421 17.258 21.1671C13.7633 21.5538 10.2367 21.5538 6.74201 21.1671C4.73001 20.9421 3.10501 19.3571 2.86901 17.3351C2.45512 13.7905 2.45512 10.2097 2.86901 6.66508C3.10501 4.64308 4.72901 3.05808 6.74201 2.83308C9.39446 2.54012 12.0667 2.46888 14.731 2.62008C14.7691 2.62281 14.8057 2.63642 14.8363 2.65929C14.867 2.68215 14.8904 2.71332 14.9039 2.7491C14.9173 2.78487 14.9203 2.82376 14.9123 2.86115C14.9044 2.89854 14.8859 2.93287 14.859 2.96008L13.866 3.95208C13.8272 3.99092 13.7808 4.02136 13.7297 4.04149C13.6786 4.06162 13.6239 4.07101 13.569 4.06908C11.3458 3.99293 9.11993 4.07815 6.90901 4.32408C6.26295 4.39558 5.65986 4.6828 5.19717 5.13933C4.73447 5.59586 4.43919 6.19504 4.35901 6.84008C3.95787 10.2684 3.95787 13.7318 4.35901 17.1601C4.43919 17.8051 4.73447 18.4043 5.19717 18.8608C5.65986 19.3174 6.26295 19.6046 6.90901 19.6761C10.264 20.0511 13.736 20.0511 17.092 19.6761C17.7381 19.6046 18.3412 19.3174 18.8039 18.8608C19.2666 18.4043 19.5608 17.8051 19.641 17.1601Z"
                  fill="white"
                />
              </svg>
              <p>Submit</p>
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-else-if="tampilanAktif === 'edit'" class="px-6">
      <div class="p-8">
        <form @submit.prevent="updatePortfolio" class="space-y-4">
          <div>
            <label for="title" class="block text-2xl font-bold text-[#EB5523] mb-1">Portfolio Title</label>
            <textarea class="textarea w-full" v-model="portfolio.title" type="text" id="title" required placeholder="Bio"></textarea>
          </div>

          <div>
            <label class="block text-2xl font-bold text-[#EB5523] mb-2">Cover Image</label>

            <div v-if="existingImageUrl" class="mb-4">
              <p class="text-sm text-gray-600 mb-2">Gambar saat ini:</p>
              <img crossorigin="anonymous" :src="existingImageUrl" alt="Pratinjau Gambar" class="w-full max-w-xs h-auto rounded-lg object-cover border" />
            </div>

            <label
              for="cover-image-upload"
              class="relative flex flex-col items-center justify-center w-full h-32 border-2 border-gray-400 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center justify-center bg-[#EB5523] text-white p-2 rounded-box text-center">
                <span v-if="portfolio.coverImage">{{ portfolio.coverImage.name }}</span>
                <span v-else>Pilih gambar baru (jika ingin mengganti)</span>
              </div>
              <input @change="handleFileUpload" id="cover-image-upload" type="file" class="hidden" accept="image/*" />
            </label>
          </div>

          <div>
            <label for="shortDescription" class="block text-2xl font-bold text-[#EB5523] mb-1">Short Description</label>
            <textarea v-model="portfolio.shortDescription" id="shortDescription" rows="4" class="textarea w-full" required></textarea>
          </div>

          <div>
            <label for="description" class="block text-2xl font-bold text-[#EB5523]">Description</label>
            <client-only>
              <TiptapEditor v-model="portfolio.description" class="mt-1" />
            </client-only>
          </div>

          <div class="flex justify-end pt-4 space-x-3">
            <button @click="tampilanAktif = 'daftar'" type="button" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
            <button @click="togglePreview" type="button" class="flex flex-row items-center space-x-2 px-4 py-2 bg-[#2949BE] text-white rounded-lg">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 20H5C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18V6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4H15C15.5304 4 16.0391 4.21071 16.4142 4.58579C16.7893 4.96086 17 5.46957 17 6V7M19 20C18.4696 20 17.9609 19.7893 17.5858 19.4142C17.2107 19.0391 17 18.5304 17 18V7M19 20C19.5304 20 20.0391 19.7893 20.4142 19.4142C20.7893 19.0391 21 18.5304 21 18V9C21 8.46957 20.7893 7.96086 20.4142 7.58579C20.0391 7.21071 19.5304 7 19 7H17M13 4H9M7 16H13M7 8H13V12H7V8Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>Preview</p>
            </button>
            <button type="submit" class="flex flex-row items-center space-x-2 px-4 py-2 bg-[#EB5523] text-white rounded-lg hover:bg-orange-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.4549 5.41583C21.5499 5.56004 21.5922 5.73261 21.5747 5.90442C21.5573 6.07622 21.481 6.23673 21.3589 6.35883L12.1659 15.5508C12.0718 15.6448 11.9545 15.7121 11.8259 15.7458L7.99689 16.7458C7.87032 16.7788 7.73732 16.7782 7.61109 16.7439C7.48485 16.7096 7.36978 16.6429 7.27729 16.5504C7.18479 16.4579 7.1181 16.3429 7.08382 16.2166C7.04955 16.0904 7.04888 15.9574 7.08189 15.8308L8.08189 12.0028C8.1118 11.8882 8.16679 11.7816 8.24289 11.6908L17.4699 2.46983C17.6105 2.32938 17.8011 2.25049 17.9999 2.25049C18.1986 2.25049 18.3893 2.32938 18.5299 2.46983L21.3589 5.29783C21.3938 5.33467 21.4259 5.37411 21.4549 5.41583ZM19.7679 5.82783L17.9999 4.06083L9.48189 12.5788L8.85689 14.9718L11.2499 14.3468L19.7679 5.82783Z"
                  fill="white"
                />
                <path
                  d="M19.641 17.1601C19.9143 14.824 20.0016 12.47 19.902 10.1201C19.8997 10.0647 19.9088 10.0094 19.929 9.95778C19.9491 9.90614 19.9798 9.85925 20.019 9.82008L21.003 8.83608C21.0299 8.80904 21.064 8.79033 21.1013 8.78222C21.1385 8.77411 21.1774 8.77693 21.2131 8.79034C21.2488 8.80375 21.2798 8.82719 21.3025 8.85783C21.3252 8.88847 21.3386 8.92502 21.341 8.96308C21.5257 11.7543 21.4554 14.5566 21.131 17.3351C20.895 19.3571 19.271 20.9421 17.258 21.1671C13.7633 21.5538 10.2367 21.5538 6.74201 21.1671C4.73001 20.9421 3.10501 19.3571 2.86901 17.3351C2.45512 13.7905 2.45512 10.2097 2.86901 6.66508C3.10501 4.64308 4.72901 3.05808 6.74201 2.83308C9.39446 2.54012 12.0667 2.46888 14.731 2.62008C14.7691 2.62281 14.8057 2.63642 14.8363 2.65929C14.867 2.68215 14.8904 2.71332 14.9039 2.7491C14.9173 2.78487 14.9203 2.82376 14.9123 2.86115C14.9044 2.89854 14.8859 2.93287 14.859 2.96008L13.866 3.95208C13.8272 3.99092 13.7808 4.02136 13.7297 4.04149C13.6786 4.06162 13.6239 4.07101 13.569 4.06908C11.3458 3.99293 9.11993 4.07815 6.90901 4.32408C6.26295 4.39558 5.65986 4.6828 5.19717 5.13933C4.73447 5.59586 4.43919 6.19504 4.35901 6.84008C3.95787 10.2684 3.95787 13.7318 4.35901 17.1601C4.43919 17.8051 4.73447 18.4043 5.19717 18.8608C5.65986 19.3174 6.26295 19.6046 6.90901 19.6761C10.264 20.0511 13.736 20.0511 17.092 19.6761C17.7381 19.6046 18.3412 19.3174 18.8039 18.8608C19.2666 18.4043 19.5608 17.8051 19.641 17.1601Z"
                  fill="white"
                />
              </svg>
              <p>Update Portfolio</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TiptapEditor from "~/components/TiptapEditor.vue";

definePageMeta({
  layout: "admin",
});

export default {
  components: {
    TiptapEditor,
  },
  data() {
    return {
      tampilanAktif: "daftar",
      portfoliosList: [],
      portoHighlightList: [],
      portfolio: {
        title: "",
        shortDescription: "",
        description: "",
        coverImage: null,
        slug: "",
      },
      existingImageUrl: null,
      value: "",
      searchTimeout: null,
      isPreviewing: false,
      filter: {
        status: "all",
        search: "",
      },
    };
  },

  created() {
    this.fetchPortfolios();
    this.fetchHighlighted();
  },

  // [NEW] Menambahkan watcher untuk fungsionalitas pencarian
  watch: {
    // Fungsi ini akan berjalan setiap kali 'value' (teks di search bar) berubah
    value(newSearchTerm) {
      // Hapus timer sebelumnya untuk me-reset hitungan
      clearTimeout(this.searchTimeout);

      // Atur timer baru. Method fetchPortfolios akan dipanggil 500ms setelah pengguna berhenti mengetik
      this.searchTimeout = setTimeout(() => {
        this.fetchPortfolios(newSearchTerm);
      }, 500);
    },
  },

  methods: {
    // [FIX] Mengubah method untuk menerima parameter pencarian dan filter
    async fetchPortfolios(searchTerm = this.filter.search, status = this.filter.status) {
      console.log(`Mencoba mengambil data portfolio. Term: "${searchTerm}", Status: "${status}"`);
      try {
        // API URL dasar
        let apiUrl = `/api/portfolios?limit=10&page=1&status=${status}`;

        // Jika ada teks pencarian, tambahkan sebagai parameter '&search'
        if (searchTerm) {
          apiUrl += `&search=${encodeURIComponent(searchTerm)}`;
        }

        const response = await this.$api.get(apiUrl);
        console.log("Data portfolio berhasil diambil:", response.data);
        this.portfoliosList = response.data.data || [];
      } catch (error) {
        console.error("Gagal mengambil data portfolio:", error);
        this.portfoliosList = []; // Default to empty array on error
      }
    },

    onFilterChange() {
      this.fetchPortfolios();
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.portfolio.coverImage = file;
      }
    },

    async processEditorImages(htmlContent) {
      if (!htmlContent) return "";
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      const images = doc.querySelectorAll('img[data-local-image="true"]');

      for (const img of images) {
        const base64Src = img.getAttribute("src");
        const file = this.dataURLtoFile(base64Src, `image-${Date.now()}.png`);

        const formData = new FormData();
        formData.append("image", file);

        try {
          const response = await this.$api.post("/api/images/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          const newUrl = response.data.url;
          img.setAttribute("src", newUrl);
          img.removeAttribute("data-local-image");
        } catch (error) {
          console.error("Gagal mengunggah gambar dari editor:", error);
          // Optionally, leave the base64 image or remove it
        }
      }
      return doc.body.innerHTML;
    },

    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },

    async submitPortfolio() {
      // First, process images in the description
      const processedDescription = await this.processEditorImages(this.portfolio.description);

      const formData = new FormData();
      formData.append("title", this.portfolio.title);
      formData.append("description", processedDescription);
      formData.append("shortDescription", this.portfolio.shortDescription);
      if (this.portfolio.coverImage) {
        formData.append("coverImage", this.portfolio.coverImage);
      }

      try {
        const response = await this.$api.post("/api/portfolios/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Portfolio berhasil dibuat:", response.data);
        this.tampilanAktif = "daftar";

        // Memuat ulang daftar setelah berhasil membuat
        await this.fetchPortfolios();
        // await navigateTo("/admin/portfolio");
        window.location.reload(true);
      } catch (error) {
        console.error("Gagal membuat portfolio:", error);
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
          coverImage: null, // Reset file input
        };
        this.existingImageUrl = `http://localhost:5000${dataToEdit.coverImage}`;

        this.tampilanAktif = "edit";
      } catch (error) {
        console.error("Gagal mengambil data untuk diedit:", error);
      }
    },

    async updatePortfolio() {
      const processedDescription = await this.processEditorImages(this.portfolio.description);

      const formData = new FormData();
      formData.append("title", this.portfolio.title);
      formData.append("description", processedDescription);
      formData.append("shortDescription", this.portfolio.shortDescription);

      // Only append coverImage if a new file has been selected
      if (this.portfolio.coverImage instanceof File) {
        formData.append("coverImage", this.portfolio.coverImage);
      }

      try {
        // Gunakan method PUT/PATCH dan kirim ke endpoint yang sesuai dengan slug/id
        const response = await this.$api.put(`/api/portfolios/${this.portfolio.slug}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Portfolio berhasil diupdate:", response.data);
        this.tampilanAktif = "daftar"; // Kembali ke daftar

        // ✨ REFRESH DATA TANPA RELOAD HALAMAN (Best Practice)
        await this.fetchPortfolios();
        await this.fetchHighlighted();
      } catch (error) {
        console.error("Gagal mengupdate portfolio:", error);
      }
    },

    async sendHighlight(portfolioId) {
      // Debugging sebelum kirim
      console.log("Debug: portfolioId =", portfolioId);

      if (!portfolioId) {
        console.error("Error: portfolioId kosong atau undefined");
        this.$toast?.error?.("ID portfolio tidak ditemukan");
        return;
      }

      try {
        const res = await this.$api.post(
          "/content-tracking/highlighted-portfolios",
          { portfolioId: portfolioId }, // pastikan format sesuai API
          {
            headers: {
              "Content-Type": "application/json", // ubah kalau memang JSON
            },
          }
        );

        console.log("Highlight berhasil:", res.data);
        this.$toast?.success?.("Portfolio berhasil di-highlight");
        window.location.reload(true);
      } catch (err) {
        console.error("Gagal mengirim highlight:", err.response?.data || err);
        this.$toast?.error?.("Gagal highlight portfolio");
      }
    },

    async fetchHighlighted() {
      try {
        let apiUrl = "/api/content-tracking/";
        const response = await this.$api.get(apiUrl);
        console.log("Data highlited portfolio berhasil diambil:", response.data.highlightedPortfolios);
        this.portoHighlightList = response.data.highlightedPortfolios || [];
      } catch (error) {
        console.error("Gagal mengambil data highlited portfolio:", error);
        this.portoHighlightList = []; // Default to empty array on error
      }
    },
    async deleteCard(portoSlug) {
      try {
        let apiUrl = `/api/portfolios/${portoSlug}`;
        console.log(`slug berisi = ${portoSlug}`);
        const response = await this.$api.delete(apiUrl);
        console.log(`Card dengan slug ${portoSlug} berhasil dihapus`);
      } catch (error) {
        console.error("Gagal menghapus card:", error);
      }
    },
    async deletePortHighlight(portoId) {
      try {
        let apiUrl = `/api/content-tracking/highlighted-portfolios/${portoId}`;
        console.log(`slug berisi = ${portoId}`);
        const response = await this.$api.delete(apiUrl);
        console.log(`Highlighted Portfolio dengan id ${portoId} berhasil dihapus`);
      } catch (error) {
        console.error("Gagal menghapus card:", error);
      }
    },
    togglePreview() {
      const slug = this.portfolio.slug || "new";
      const path = `/admin/portfolios/preview-${slug}`;

      const coverImageUrl = this.portfolio.coverImage instanceof File ? URL.createObjectURL(this.portfolio.coverImage) : this.existingImageUrl || "";

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

  computed: {
    judulHalaman() {
      if (this.tampilanAktif === "buat") {
        return "Create Portfolio";
      } else if (this.tampilanAktif === "edit") {
        return "Edit Portfolio";
      }
      return "Portfolio";
    },
  },
};
</script>

<style module>
.myinput {
  border-radius: 2rem;
  border-width: 1px;
  border-color: black;
  width: 300px;
}
</style>
