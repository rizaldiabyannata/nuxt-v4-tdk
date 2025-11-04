<template>
  <img
    :src="normalizedSrc"
    :alt="alt"
    :class="imgClass"
    v-bind="$attrs"
    @error="handleError"
    @load="handleLoad"
  />
</template>

<script setup>
console.log("🚀 MinioImage component loaded!");

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "Image",
  },
  imgClass: {
    type: String,
    default: "",
  },
  fallback: {
    type: String,
    default: "/img/placeholder.png",
  },
});

const emit = defineEmits(["load", "error"]);

// Get runtime config in component context
const config = useRuntimeConfig();
const baseUrl = config.public.apiBaseUrl || "http://localhost:5000";
const minioProxyMode = config.public.minioProxyMode || "backend"; // 'backend' or 'direct'
const minioPublicUrl = config.public.minioPublicUrl || "http://localhost:9004";

console.log("⚙️ MinIO Config:", {
  mode: minioProxyMode,
  publicUrl: minioPublicUrl,
  baseUrl,
});

// Normalize image URL with proper context
const normalizedSrc = computed(() => {
  const imageUrl = props.src;

  console.log("🖼️ MinioImage received src:", imageUrl);

  if (!imageUrl) {
    console.log("❌ No image URL, using fallback");
    return props.fallback;
  }

  // Jika sudah full URL (http/https)
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    // Check if it's internal MinIO hostname that needs URL transformation
    if (imageUrl.includes("minio:9000") || imageUrl.includes("minio:")) {
      if (minioProxyMode === "backend") {
        // Option 1: Proxy through backend API (requires backend endpoint)
        const minioPath = imageUrl.replace(/https?:\/\/minio:\d+\//, "");
        const proxyUrl = `${baseUrl}/api/minio-proxy/${minioPath}`;
        console.log("🔄 MinIO proxied through backend:", proxyUrl);
        return proxyUrl;
      } else {
        // Option 2: Direct access via hostname replacement (MinIO port forwarded)
        const publicUrl = imageUrl.replace(
          /https?:\/\/minio:\d+/,
          minioPublicUrl
        );
        console.log("🔄 MinIO hostname replaced:", publicUrl);
        return publicUrl;
      }
    }

    console.log("✅ Full URL detected:", imageUrl);
    return imageUrl;
  }

  // Jika relative path, gabungkan dengan base URL
  const cleanPath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
  const fullUrl = `${baseUrl}${cleanPath}`;
  console.log("🔗 Relative path converted to:", fullUrl);
  return fullUrl;
});

// State for error handling
const hasError = ref(false);

const handleError = (event) => {
  hasError.value = true;
  event.target.src = props.fallback;
  emit("error", event);
};

const handleLoad = (event) => {
  hasError.value = false;
  emit("load", event);
};
</script>
