<template>
  <div class="card bg-base-100 w-full shadow-lg rounded-2xl overflow-hidden aspect-[3/4]">
    <div class="card-body bg-white rounded-t-2xl p-4 sm:p-6 h-[60%]">
      <h2 id="title" class="card-title text-black text-xl sm:text-2xl">{{ title }}</h2>
      <p id="shortDescription" class="text-black text-sm sm:text-base mt-1">{{ shortDescription }}</p>
      <div class="card-actions justify-start mt-4 flex flex-row space-x-1">
        <!-- edit -->
        <button @click="edit" class="bg-blue-700 p-1 rounded-lg cursor-pointer hover:opacity-50">
          <svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.53186 2.42927C8.56633 2.48159 8.58169 2.54421 8.57535 2.60654C8.569 2.66888 8.54134 2.72712 8.49703 2.77142L5.16146 6.10663C5.12734 6.14073 5.08476 6.16515 5.03809 6.17738L3.64879 6.54022C3.60286 6.5522 3.55461 6.55195 3.5088 6.53952C3.463 6.52708 3.42125 6.50288 3.38769 6.46932C3.35413 6.43576 3.32993 6.39401 3.31749 6.34821C3.30506 6.3024 3.30481 6.25415 3.31679 6.20822L3.67963 4.81928C3.69048 4.77768 3.71043 4.73902 3.73805 4.70607L7.08595 1.36035C7.13697 1.30939 7.20614 1.28076 7.27825 1.28076C7.35037 1.28076 7.41953 1.30939 7.47056 1.36035L8.49703 2.38645C8.50971 2.39982 8.52135 2.41413 8.53186 2.42927ZM7.91975 2.57876L7.27825 1.93762L4.1876 5.02827L3.96083 5.89654L4.8291 5.66977L7.91975 2.57876Z"
              fill="white"
            />
            <path
              d="M7.87374 6.69036C7.97292 5.84275 8.00458 4.9886 7.96844 4.13598C7.96759 4.11588 7.97093 4.09583 7.97823 4.07709C7.98554 4.05835 7.99666 4.04134 8.0109 4.02713L8.36793 3.6701C8.37769 3.66028 8.39007 3.6535 8.40359 3.65055C8.41711 3.64761 8.43119 3.64863 8.44414 3.6535C8.45709 3.65837 8.46836 3.66687 8.4766 3.67799C8.48484 3.68911 8.48969 3.70237 8.49057 3.71618C8.55759 4.72895 8.53208 5.74572 8.41437 6.75385C8.32874 7.48751 7.73949 8.06261 7.0091 8.14425C5.74111 8.28458 4.4615 8.28458 3.1935 8.14425C2.46347 8.06261 1.87386 7.48751 1.78823 6.75385C1.63805 5.46773 1.63805 4.1685 1.78823 2.88238C1.87386 2.14872 2.46311 1.57362 3.1935 1.49198C4.15591 1.38569 5.12551 1.35984 6.09221 1.4147C6.10605 1.41569 6.11931 1.42063 6.13042 1.42892C6.14154 1.43722 6.15004 1.44853 6.15493 1.46151C6.15981 1.47449 6.16088 1.4886 6.158 1.50217C6.15511 1.51573 6.1484 1.52819 6.13865 1.53806L5.77836 1.898C5.76427 1.91209 5.74743 1.92313 5.72889 1.93044C5.71035 1.93774 5.69051 1.94115 5.67059 1.94045C4.86392 1.91282 4.0563 1.94374 3.25409 2.03297C3.01968 2.05892 2.80086 2.16313 2.63297 2.32878C2.46509 2.49442 2.35795 2.71183 2.32886 2.94587C2.18331 4.18979 2.18331 5.44644 2.32886 6.69036C2.35795 6.9244 2.46509 7.14181 2.63297 7.30745C2.80086 7.4731 3.01968 7.57731 3.25409 7.60326C4.47141 7.73932 5.73119 7.73932 6.94887 7.60326C7.18329 7.57731 7.40211 7.4731 7.56999 7.30745C7.73788 7.14181 7.84465 6.9244 7.87374 6.69036Z"
              fill="white"
            />
          </svg>
        </button>
        <button @click="callDeleteFunc" class="bg-[#F43232] p-1 rounded-lg cursor-pointer hover:opacity-50">
          <svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.29974 3.72976L6.99495 6.77687C6.94887 7.23876 6.92601 7.46953 6.82079 7.64405C6.7285 7.79768 6.59278 7.92053 6.43074 7.99709C6.24678 8.08381 6.01529 8.08381 5.55086 8.08381H4.69456C4.23049 8.08381 3.99864 8.08381 3.81468 7.99673C3.65251 7.92023 3.51665 7.79737 3.42427 7.64369C3.31977 7.46953 3.29655 7.23876 3.25011 6.77687L2.94568 3.72976M5.66697 6.08821V4.27402M4.57845 6.08821V4.27402M2.40143 2.82267H4.07592M4.07592 2.82267L4.21598 1.85316C4.25662 1.67682 4.4032 1.55273 4.57156 1.55273H5.67386C5.84222 1.55273 5.98844 1.67682 6.02944 1.85316L6.1695 2.82267M4.07592 2.82267H6.1695M6.1695 2.82267H7.84399"
              stroke="white"
              stroke-width="0.544257"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button class="bg-[#797979] p-1 rounded-lg cursor-pointer hover:opacity-50">
          <svg width="20" height="19" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_383_536)">
              <path
                d="M8.22856 2.82293L7.86572 7.03185C7.86572 7.51442 7.47748 7.90266 6.99491 7.90266H2.93113C2.44855 7.90266 2.06031 7.51442 2.06031 7.03185L1.69748 2.82293M6.41437 2.82293V3.62118C6.41437 3.69816 6.38379 3.77199 6.32935 3.82643C6.27491 3.88086 6.20108 3.91145 6.1241 3.91145H3.80194C3.72495 3.91145 3.65112 3.88086 3.59668 3.82643C3.54225 3.77199 3.51167 3.69816 3.51167 3.62118V2.82293M1.55234 1.37158H8.37369C8.52766 1.37158 8.67532 1.43275 8.78419 1.54162C8.89307 1.65049 8.95423 1.79815 8.95423 1.95212V2.24239C8.95423 2.31863 8.93922 2.39412 8.91004 2.46456C8.88087 2.53499 8.8381 2.59899 8.78419 2.6529C8.73029 2.7068 8.66629 2.74957 8.59585 2.77874C8.52542 2.80792 8.44993 2.82293 8.37369 2.82293H1.55234C1.39837 2.82293 1.25071 2.76177 1.14184 2.6529C1.03297 2.54402 0.971802 2.39636 0.971802 2.24239V1.95212C0.971802 1.87588 0.986818 1.80039 1.01599 1.72996C1.04517 1.65952 1.08793 1.59553 1.14184 1.54162C1.25071 1.43275 1.39837 1.37158 1.55234 1.37158Z"
                stroke="white"
                stroke-width="0.544257"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_383_536">
                <rect width="8.70811" height="8.70811" fill="white" transform="translate(0.609009 0.283203)" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <button   @click="highlightThis" class="bg-[#FFCC00] p-1 rounded-lg cursor-pointer hover:opacity-50 items-center aspect-square">
          <svg width="19" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.99984 14.275L4.84984 16.775C4.66651 16.8917 4.47484 16.9417 4.27484 16.925C4.07484 16.9083 3.89984 16.8417 3.74984 16.725C3.59984 16.6083 3.48317 16.4627 3.39984 16.288C3.31651 16.1133 3.29984 15.9173 3.34984 15.7L4.44984 10.975L0.774841 7.8C0.608174 7.65 0.504174 7.479 0.462841 7.287C0.421507 7.095 0.433841 6.90767 0.499841 6.725C0.565841 6.54233 0.665841 6.39233 0.799841 6.275C0.933841 6.15767 1.11717 6.08267 1.34984 6.05L6.19984 5.625L8.07484 1.175C8.15817 0.975 8.28751 0.825 8.46284 0.725C8.63817 0.625 8.81717 0.575 8.99984 0.575C9.18251 0.575 9.36151 0.625 9.53684 0.725C9.71217 0.825 9.84151 0.975 9.92484 1.175L11.7998 5.625L16.6498 6.05C16.8832 6.08333 17.0665 6.15833 17.1998 6.275C17.3332 6.39167 17.4332 6.54167 17.4998 6.725C17.5665 6.90833 17.5792 7.096 17.5378 7.288C17.4965 7.48 17.3922 7.65067 17.2248 7.8L13.5498 10.975L14.6498 15.7C14.6998 15.9167 14.6832 16.1127 14.5998 16.288C14.5165 16.4633 14.3998 16.609 14.2498 16.725C14.0998 16.841 13.9248 16.9077 13.7248 16.925C13.5248 16.9423 13.3332 16.8923 13.1498 16.775L8.99984 14.275Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
    <figure class="h-[40%]">
      <img crossorigin="anonymous" id="image" :src="imageUrl" alt="Product Image" class="w-full h-auto object-cover" />
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true },
    slug: { type: String, required: true },
    title: {
      type: String,
      required: true,
      default: "title Default",
    },
    shortDescription: {
      type: String,
      required: true,
      default: "shortDescription Default",
    },
    imageUrl: {
      type: String,
      required: true,
      default:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
  },
  methods: {
    highlightThis() {
      console.log("✅ Debug: props.id =", this.id);
      if (!this.id) {
        console.error("❌ Portfolio ID kosong, tidak mengirim ke parent");
        return;
      }
      this.$emit("highlight", this.id);
    },
    deleteCard() {
      console.log("✅ Debug: props.slug =", this.slug);
      if (!this.slug) {
        console.error("❌ Portfolio SLUG kosong, tidak mengirim ke parent");
        return;
      }
      this.$emit("delete", this.slug);
    },
    deleteHighlightPort() {
      console.log("✅ Debug: props.id =", this.id);
      if (!this.slug) {
        console.error("❌ Portfolio Hightlight ID kosong, tidak mengirim ke parent");
        return;
      }
      this.$emit("deleteHighlight", this.id);
    },
    edit(){
      if (!this.slug) {
        console.error("❌ Portfolio Hightlight ID kosong, tidak mengirim ke parent");
        return;
      }
      this.$emit("edit", this.slug)
    },
    callDeleteFunc(){
      this.deleteCard();
      this.deleteHighlightPort();
    }
  },
};
</script>
