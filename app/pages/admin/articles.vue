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
          <p>Create Articles</p>
        </button>
        <div class="flex flex-row items-center space-x-3">
          <FloatLabel variant="on">
            <InputText :class="$style.myinput" id="on_label" v-model="value" />
            <label for="on_label" class="flex felx-row items-center space-x-2">
              <svg width="16" height="16" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.61043 9.20962C3.36411 9.20962 2.30943 8.77787 1.44638 7.91437C0.583333 7.05086 0.151581 5.99618 0.151123 4.75032C0.150666 3.50446 0.582418 2.44978 1.44638 1.58627C2.31034 0.722768 3.36502 0.291016 4.61043 0.291016C5.85583 0.291016 6.91074 0.722768 7.77516 1.58627C8.63958 2.44978 9.0711 3.50446 9.06973 4.75032C9.06973 5.25342 8.98969 5.72793 8.82961 6.17386C8.66953 6.61979 8.45229 7.01427 8.17787 7.3573L12.0197 11.1992C12.1455 11.3249 12.2084 11.485 12.2084 11.6794C12.2084 11.8738 12.1455 12.0338 12.0197 12.1596C11.894 12.2854 11.7339 12.3483 11.5395 12.3483C11.3451 12.3483 11.185 12.2854 11.0593 12.1596L7.2174 8.31776C6.87438 8.59218 6.4799 8.80943 6.03397 8.9695C5.58804 9.12958 5.11353 9.20962 4.61043 9.20962ZM4.61043 7.83753C5.46798 7.83753 6.19702 7.5375 6.79754 6.93743C7.39806 6.33737 7.69809 5.60833 7.69764 4.75032C7.69718 3.8923 7.39715 3.16349 6.79754 2.56389C6.19794 1.96428 5.4689 1.66402 4.61043 1.66311C3.75195 1.66219 3.02314 1.96245 2.424 2.56389C1.82485 3.16532 1.52459 3.89413 1.52322 4.75032C1.52184 5.6065 1.8221 6.33554 2.424 6.93743C3.02589 7.53933 3.7547 7.83936 4.61043 7.83753Z"
                  fill="black"
                />
              </svg>
              <p>Search</p>
            </label>
          </FloatLabel>

          <div class="dropdown dropdown-hover dropdown-end w-full">
            <div tabindex="0" role="button" class="btn m-1 bg-white text-black rounded-4xl shadow-none flex flex-row space-x-2 w-fit">
              <p>Sort By</p>
              <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.33334 6.12106L12.6417 0.812728C12.8222 0.632173 13.036 0.544784 13.283 0.550562C13.53 0.556339 13.7435 0.649747 13.9236 0.830784C14.1037 1.01182 14.194 1.2256 14.1945 1.47212C14.1949 1.71864 14.1047 1.93217 13.9236 2.11273L8.36251 7.65578C8.21807 7.80023 8.05557 7.90856 7.87501 7.98078C7.69446 8.053 7.5139 8.08912 7.33334 8.08912C7.15279 8.08912 6.97223 8.053 6.79168 7.98078C6.61112 7.90856 6.44862 7.80023 6.30418 7.65578L0.743068 2.09467C0.562512 1.91412 0.475122 1.70347 0.480901 1.46273C0.486678 1.22199 0.580086 1.01134 0.761124 0.830783C0.942161 0.650228 1.15594 0.55995 1.40246 0.55995C1.64898 0.55995 1.86251 0.650228 2.04307 0.830783L7.33334 6.12106Z"
                  fill="black"
                />
              </svg>
            </div>
            <ul tabindex="0" class="dropdown-content menu bg-white text-black border border-black rounded-box z-1 w-52 p-2">
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex flex-col w-full mt-6 space-y-4">
        <h1 class="text-2xl font-bold text-[#EB5523]">Highlight Articles</h1>
        <div class="flex flex-row w-full border border-black rounded-4xl p-4 space-x-8 items-center">
          <carousel-admin /><carousel-admin /><carousel-admin /><carousel-admin />
          <button class="p-4 bg-[#F43232] h-fit rounded-xl ml-6">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.202 15.2891H6.48682V13.0507H13.202V6.33545H15.4404V13.0507H22.1557V15.2891H15.4404V22.0043H13.202V15.2891Z" fill="#FEF7FF" />
            </svg>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-16 w-full pt-6">
        <carousel-admin v-for="article in articleList" :key="article.slug" :title="article.title" :content="article.content" :imageUrl="`http://localhost:5000${article.coverImage}`" :author="article.author"/>
      </div>
    </div>

    <div v-else-if="tampilanAktif === 'buat'" class="px-6">
      <div class="bg-gray-50 p-8 rounded-lg border">
        <form @submit.prevent="submitArticles" class="space-y-4">
          <div>
            <label for="title" class="block text-2xl font-bold text-[#EB5523]">Portfolio Title</label>
            <input v-model="article.title" type="text" id="title" class="mt-1 block w-full shadow-sm p-2 text-black border border-gray-700 rounded-2xl" />
          </div>
          <div>
            <label for="cover-image-upload" class="block text-2xl font-bold text-[#EB5523] mb-2">Cover Image</label>
            <label
              for="cover-image-upload"
              class="relative flex flex-col items-center justify-center w-full h-32 border-2 border-gray-400 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center justify-center bg-[#EB5523] text-white p-2 rounded-box">
                <span v-if="article.coverImage">{{ article.coverImage.name }}</span>
                <svg v-else class="w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.75V14.25M5.75 10H14.25" />
                </svg>
              </div>
              <input @change="handleFileUpload" id="cover-image-upload" type="file" class="hidden" accept="image/*" />
            </label>
          </div>
          <div>
            <label for="content" class="block text-2xl font-bold text-[#EB5523]">Content</label>
            <Editor
              v-model="article.content"
              editorStyle="height: 320px"
              :pt="{
                toolbar: { style: { backgroundColor: 'white', borderColor: '#D1D5DB' } },
              }"
              class="mt-1 block w-full shadow-sm border border-gray-700 rounded-2xl bg-white overflow-hidden"
            />
          </div>
          <div class="flex justify-end pt-4 space-x-3">
             <button @click="tampilanAktif = 'daftar'" type="button" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
            <button type="button" class="flex flex-row items-center space-x-2 px-4 py-2 bg-[#2949BE] text-white rounded-lg">
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
            <button type="submit" class="flex flex-row items-center space-x-2 px-4 py-2 bg-[#EB5523] text-white rounded-lg hover:bg-orange-600 cursor-pointer">
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
      <div class="flex justify-between items-center mb-6">
      </div>
    </div>
  </div>
</template>

<script>
import CarouselAdmin from "../../components/carousel-admin.vue";

definePageMeta({
  layout: "admin",
});

export default {
  components: {
    CarouselAdmin,
  },
  data() {
    return {
      tampilanAktif: "daftar",
      articleList: [],
      article: {
        title: "",
        content: "",
        coverImage: null,
      },
      value: "",
      searchTimeout: null,
    };
  },
  created() {
    this.fetchArticles();
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
        let apiUrl = "/blogs?limit=10&page=1";
        
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
        const response = await this.$api.post("/blogs/", formData, {
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
  },
  computed: {
    judulHalaman() {
      if (this.tampilanAktif === "buat") {
        return "Create Articles";
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
```