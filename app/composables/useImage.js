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

  // Jika sudah full URL (http/https), return as-is
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // Jika relative path, gabungkan dengan base URL
  // Backend masih serve dari /uploads untuk backward compatibility
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl || "http://localhost:5000";

  // Pastikan tidak double slash
  const cleanPath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
  return `${baseUrl}${cleanPath}`;
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
