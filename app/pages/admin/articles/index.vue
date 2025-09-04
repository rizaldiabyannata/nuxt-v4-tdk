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
        <button @click="tampilanAktif = 'buat'" class="btn btn-primary rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Create Article
        </button>
        <!-- Search and Filter can be added here if needed -->
      </div>

      <!-- Highlighted Articles -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-800">Highlighted Articles</h2>
        <div v-if="articleHighlightList && articleHighlightList.length > 0" class="grid gap-6 w-full bg-gray-50 rounded-lg border border-gray-200 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <carousel-admin
            v-for="article in articleHighlightList"
            :key="article.slug"
            :id="article._id"
            :slug="article.slug"
            :title="article.title"
            :content="article.content"
            :isHighlighted="true"
            :loading-highlight="loadingHighlights"
            :imageUrl="`http://localhost:5000${article.coverImage}`"
            @unhighlight="deleteArticleHighlight"
            @highlight="sendHighlight"
            @delete="deleteCard"
            @edit="handleEdit"
          />
        </div>
        <div v-else class="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl">
          <p class="text-gray-500">No highlighted articles.</p>
        </div>
      </div>

      <!-- All Articles -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-800">All Articles</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
        <carousel-admin
          v-for="article in articleList"
          :key="article.slug"
          :id="article._id"
          :slug="article.slug"
          :title="article.title"
          :content="article.content"
          :isHighlighted="false"
          :loading-highlight="loadingHighlights"
          :imageUrl="`http://localhost:5000${article.coverImage}`"
          :author="article.author"
          @highlight="sendHighlight"
          @unhighlight="deleteArticleHighlight"
          @delete="deleteCard"
          @edit="handleEdit"
        />
      </div>
    </div>

    <!-- Form View (Create/Edit) -->
    <div v-else class="bg-white border border-gray-200 p-8 rounded-lg shadow-sm">
      <form @submit.prevent="isEditing ? updateArticle() : submitArticles()" class="space-y-6">
        <div>
          <label for="title" class="block text-lg font-medium text-gray-700">Article Title</label>
          <input v-model="article.title" type="text" id="title" class="mt-1 input input-bordered w-full" required />
        </div>

        <div>
          <label for="cover-image-upload" class="block text-lg font-medium text-gray-700 mb-2">Cover Image</label>
          <div v-if="existingImageUrl && isEditing" class="mb-4">
            <p class="text-sm text-gray-500 mb-2">Current Image:</p>
            <img crossorigin="anonymous" :src="existingImageUrl" alt="Image Preview" class="w-full max-w-sm h-auto rounded-lg object-cover border" />
          </div>
          <label for="cover-image-upload" class="relative flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
              <p class="mt-2 text-sm text-gray-600">
                <span class="font-semibold">{{ article.coverImage ? article.coverImage.name : (isEditing ? 'Choose new image (optional)' : 'Upload a file') }}</span>
              </p>
              <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input @change="handleFileUpload" id="cover-image-upload" type="file" class="hidden" accept="image/*" />
          </label>
        </div>

        <div>
          <label for="content" class="block text-lg font-medium text-gray-700">Content</label>
          <div class="mt-1 border border-gray-300 rounded-lg">
            <TiptapEditor v-model="article.content" />
          </div>
        </div>

        <div class="flex justify-end pt-4 space-x-4">
          <button @click="resetForm" type="button" class="btn btn-ghost rounded-lg">Cancel</button>
          <button @click="togglePreview" type="button" class="btn rounded-lg">Preview</button>
          <button type="submit" class="btn btn-primary rounded-lg">
            {{ isEditing ? 'Update Article' : 'Submit Article' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Preview Modal -->
    <div v-if="isPreviewing" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-2xl font-bold text-[#EB5523]">Article Preview</h2>
          <button @click="togglePreview" class="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
        </div>
        <div class="p-6 overflow-y-auto">
          <h1 class="text-3xl font-bold mb-4">{{ article.title }}</h1>
          <div class="prose max-w-none" v-html="article.content"></div>
        </div>
        <div class="p-4 border-t flex justify-end">
          <button @click="togglePreview" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import CarouselAdmin from "../../components/carousel-admin.vue";
// import TiptapEditor from "../../components/TiptapEditor.vue";

definePageMeta({
  layout: "admin",
});

export default {
  components: {
    // CarouselAdmin,
    // TiptapEditor,
  },
  data() {
    return {
      tampilanAktif: "daftar",
      articleList: [],
      articleHighlightList: [],
      article: {
        title: "",
        content: "",
        coverImage: null,
      },
      existingImageUrl: null,
      value: "",
      searchTimeout: null,
      isPreviewing: false,
    };
  },
  created() {
    this.fetchArticles();
    this.fetchHighlighted();
  },
  watch: {
    value(newSearchTerm) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.fetchArticles(newSearchTerm);
      }, 500);
    },
  },
  methods: {
    async fetchArticles(searchTerm = "") {
      console.log(`FETCH_ARTICLES: Mencari dengan term: "${searchTerm}"`);
      try {
        let apiUrl = "/api/blogs?limit=10&page=1";

        // [FIX] Menggunakan '&' untuk parameter tambahan, bukan '?'
        if (searchTerm) {
          apiUrl += `&search=${encodeURIComponent(searchTerm)}`;
        }

        const response = await this.$api.get(apiUrl);
        console.log("FETCH_ARTICLES: Response dari API:", response.data);

        this.articleList = response.data.data;
        console.log("FETCH_ARTICLES: Isi `this.articleList` setelah di-set:", this.articleList);
      } catch (error) {
        console.error("FETCH_ARTICLES: Gagal mengambil data article:", error);
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.article.coverImage = file;
      }
    },
    async submitArticles() {
      const formData = new FormData();
      formData.append("title", this.article.title);
      formData.append("content", this.article.content);
      if (this.article.coverImage) {
        formData.append("coverImage", this.article.coverImage);
      }

      try {
        const response = await this.$api.post("/api/blogs/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Article berhasil dibuat:", response.data);
        this.tampilanAktif = "daftar";
        await this.fetchArticles();
      } catch (error) {
        console.error("Gagal membuat article:", error);
      }
    },
    togglePreview() {
      const slug = this.article.slug || "new";
      const path = `/admin/articles/preview-${slug}`;

      const coverImageUrl = this.article.coverImage instanceof File ? URL.createObjectURL(this.article.coverImage) : this.existingImageUrl || "";

      navigateTo({
        path: path,
        query: {
          title: this.article.title,
          content: this.article.content,
          coverImage: coverImageUrl,
        },
      });
    },

    async handleEdit(slug) {
      try {
        // 1. Panggil API untuk mendapatkan detail portofolio
        const response = await this.$api.get(`/api/blogs/${slug}`);
        console.log(`Ini adalah isi dari get by ${slug}`, response.data);
        const dataToEdit = response.data;
        console.log("data To Edit: ", dataToEdit);

        // 2. Isi object 'portfolio' dengan data yang didapat
        this.article = {
          // _id: dataToEdit._id,
          slug: dataToEdit.data.slug,
          title: dataToEdit.data.title,
          content: dataToEdit.data.content,
          coverImage: null // Reset gambar, biarkan user upload baru jika ingin ganti
        };
        this.existingImageUrl = `http://localhost:5000${dataToEdit.data.coverImage}`;
        console.log("image to edit: ", this.article.coverImage);
        console.log("data terkini: ", this.article);
        // 3. Ubah tampilan ke form edit
        this.tampilanAktif = "edit";

        // console.log("Siap untuk mengedit:", this.article.shortDescription);
      } catch (error) {
        console.error("Gagal mengambil data untuk diedit:", error);
      }
    },

    async updateArticle() {
      const formData = new FormData();
      formData.append("title", this.article.title);
      formData.append("description", this.article.content);
      if (this.article.coverImage) {
        formData.append("coverImage", this.article.coverImage);
      }

      try {
        // Gunakan method PUT/PATCH dan kirim ke endpoint yang sesuai dengan slug/id
        const response = await this.$api.put(`/api/blogs/${this.article.slug}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Article berhasil diupdate:", response.data);
        this.tampilanAktif = "daftar"; // Kembali ke daftar

        // ✨ REFRESH DATA TANPA RELOAD HALAMAN (Best Practice)
        await this.fetchArticles();
        await this.fetchHighlighted();
      } catch (error) {
        console.error("Gagal mengupdate portfolio:", error);
      }
    },

    async sendHighlight(articleId) {
      // Debugging sebelum kirim
      console.log("Debug: articleId =", articleId);

      if (!articleId) {
        console.error("Error: articleId kosong atau undefined");
        this.$toast?.error?.("ID article tidak ditemukan");
        return;
      }

      try {
        const res = await this.$api.post(
          "/api/content-tracking/featured-blogs",
          { blogId: articleId }, // pastikan format sesuai API
          {
            headers: {
              "Content-Type": "application/json", // ubah kalau memang JSON
            },
          }
        );

        console.log("Highlight berhasil:", res.data);
        this.$toast?.success?.("Article berhasil di-highlight");
        window.location.reload(true);
      } catch (err) {
        console.error("Gagal mengirim highlight:", err.response?.data || err);
        this.$toast?.error?.("Gagal highlight article");
      }
    },

    async fetchHighlighted() {
      try {
        let apiUrl = "/api/content-tracking/";
        const response = await this.$api.get(apiUrl);
        console.log("Data highlited article berhasil diambil:", response.data.featuredBlogs);
        this.articleHighlightList = response.data.featuredBlogs || [];
      } catch (error) {
        console.error("Gagal mengambil data highlited article:", error);
        this.articleHighlightList = []; // Default to empty array on error
      }
    },

    async deleteCard(articleSlug) {
      try {
        let apiUrl = `/api/blogs/${articleSlug}`;
        console.log(`slug berisi = ${articleSlug}`);
        const response = await this.$api.delete(apiUrl);
        console.log(`Card dengan slug ${articleSlug} berhasil dihapus`);
      } catch (error) {
        console.error("Gagal menghapus card:", error);
      }
    },

    // Di dalam methods di articles.vue

    async deleteArticleHighlight(articleId) {
      // 1. Minta konfirmasi dari pengguna
      if (!window.confirm(`Yakin ingin menghapus artikel ini dari highlight?`)) {
        return; // Hentikan jika pengguna membatalkan
      }

      try {
        let apiUrl = `/api/content-tracking/featured-blogs/${articleId}`;
        await this.$api.delete(apiUrl);

        console.log(`Highlight dengan id ${articleId} berhasil dihapus.`);
        // 2. Beri notifikasi sukses ke pengguna
        this.$toast?.success?.("Artikel berhasil dihapus dari highlight.");

        // 3. ✨ PENTING: Panggil kembali fungsi fetchHighlighted untuk update UI
        await this.fetchHighlighted();
        window.location.reload(true);
      } catch (error) {
        console.error("Gagal menghapus highlight:", error);
        // 4. Beri notifikasi error ke pengguna
        this.$toast?.error?.("Gagal menghapus highlight.");
      }
    },
  },

  computed: {
    judulHalaman() {
      if (this.tampilanAktif === "buat") {
        return "Create Articles";
      } else if (this.tampilanAktif === "edit") {
        return "Edit Articles";
      }
      return "Articles";
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



<!-- Test -->