/**
 * Image URL Helper untuk MinIO Integration
 *
 * Backend bisa return 3 format:
 * 1. Relative path: "/uploads/images/file.webp" (old system)
 * 2. Full MinIO URL: "http://minio:9000/bucket/file.webp"
 * 3. Pre-signed MinIO URL: "http://minio:9000/bucket/file.webp?X-Amz-..."
 */

/**
 * Normalize image URL untuk MinIO
 * @param {string} imageUrl - URL dari backend API
 * @returns {string} - Full URL yang siap digunakan
 */
export function getImageUrl(imageUrl) {
  if (!imageUrl) {
    return "/img/placeholder.png"; // Fallback placeholder
  }

  const config = useRuntimeConfig();
  const minioPublicUrl = config.public.minioPublicUrl || "http://localhost:9004";

  // Jika sudah full URL (http/https)
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    // Jika URL berisi localhost:9004, replace dengan MINIO_PUBLIC_URL dari env
    if (imageUrl.includes("localhost:9004")) {
      const path = imageUrl.replace(/https?:\/\/localhost:9004/, "");
      return `${minioPublicUrl}${path}`;
    }
    
    // Jika URL berisi 127.0.0.1:9004, replace dengan MINIO_PUBLIC_URL dari env
    if (imageUrl.includes("127.0.0.1:9004")) {
      const path = imageUrl.replace(/https?:\/\/127\.0\.0\.1:9004/, "");
      return `${minioPublicUrl}${path}`;
    }
    
    // Jika URL sudah menggunakan domain/IP yang benar, return as-is
    return imageUrl;
  }

  // Jika relative path, gunakan MINIO_PUBLIC_URL
  const cleanPath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
  return `${minioPublicUrl}${cleanPath}`;
}

/**
 * Check if image URL is valid MinIO URL
 * @param {string} imageUrl
 * @returns {boolean}
 */
export function isMinIOUrl(imageUrl) {
  if (!imageUrl) return false;

  // MinIO URL patterns
  const minioPatterns = [
    /^https?:\/\/.*minio/i, // http(s)://minio...
    /^https?:\/\/.*:9000/, // http(s)://...9000 (default MinIO port)
    /\?X-Amz-Algorithm=/, // Pre-signed URL marker
  ];

  return minioPatterns.some((pattern) => pattern.test(imageUrl));
}

/**
 * Extract filename from MinIO URL or path
 * @param {string} imageUrl
 * @returns {string}
 */
export function getImageFilename(imageUrl) {
  if (!imageUrl) return "";

  try {
    // Remove query params first (for pre-signed URLs)
    const cleanUrl = imageUrl.split("?")[0];
    const parts = cleanUrl.split("/");
    return parts[parts.length - 1];
  } catch {
    return "";
  }
}

/**
 * Composable untuk reactive image URL handling
 * @param {Ref<string>} imageUrl - Reactive image URL
 * @returns {ComputedRef<string>}
 */
export function useImageUrl(imageUrl) {
  return computed(() => getImageUrl(unref(imageUrl)));
}
