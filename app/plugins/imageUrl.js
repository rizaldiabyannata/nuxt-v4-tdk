/**
 * Image URL Plugin
 * Provides global helper untuk mendapatkan URL gambar dengan MINIO_PUBLIC_URL
 */

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const minioPublicUrl = config.public.minioPublicUrl || "http://localhost:9004";

  /**
   * Helper function untuk mendapatkan image URL dari Minio
   * @param {string} imagePath - Path relatif atau full URL
   * @returns {string} - Full image URL
   */
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return "/img/placeholder.png";
    }

    // Jika sudah full URL (http/https)
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      // Handle localhost:9004 - replace dengan MINIO_PUBLIC_URL dari env
      if (imagePath.includes("localhost:9004")) {
        const path = imagePath.replace(/https?:\/\/localhost:9004/, "");
        return `${minioPublicUrl}${path}`;
      }

      // Handle 127.0.0.1:9004 - replace dengan MINIO_PUBLIC_URL dari env
      if (imagePath.includes("127.0.0.1:9004")) {
        const path = imagePath.replace(/https?:\/\/127\.0\.0\.1:9004/, "");
        return `${minioPublicUrl}${path}`;
      }

      // Jika URL sudah correct, return as-is
      return imagePath;
    }

    // Jika relative path, gabungkan dengan MINIO_PUBLIC_URL
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${minioPublicUrl}${cleanPath}`;
  };

  return {
    provide: {
      getImageUrl,
    },
  };
});
