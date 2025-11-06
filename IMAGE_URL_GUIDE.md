# Image URL Configuration Guide

## Overview
Semua gambar yang ditampilkan di aplikasi Nuxt akan menggunakan `MINIO_PUBLIC_URL` dari `.env` sebagai base URL.

## Configuration

### `.env` File
```env
MINIO_PUBLIC_URL=http://10.80.2.195:9004
MINIO_PROXY_MODE=direct
```

### `nuxt.config.ts`
```typescript
runtimeConfig: {
  public: {
    minioPublicUrl: process.env.MINIO_PUBLIC_URL || "http://localhost:9004",
    minioProxyMode: process.env.MINIO_PROXY_MODE || "backend",
  },
}
```

## Usage

### 1. **Components yang Menggunakan MinioImage** (Recommended untuk gambar dari Database/Minio)

#### `MinioImage` Component
```vue
<template>
  <MinioImage
    :src="imageUrl"
    alt="Description"
    img-class="w-full h-full object-cover"
    fallback="/img/placeholder.png"
  />
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "uploads/portfolio/project-1.jpg" // Relative path atau full URL
    }
  }
}
</script>
```

**Cara Kerja:**
- Jika `imageUrl` adalah relative path: `uploads/portfolio/project-1.jpg`
- MinioImage akan mengkonversinya menjadi: `http://10.80.2.195:9004/uploads/portfolio/project-1.jpg`
- Jika `imageUrl` sudah full URL, akan digunakan as-is

### 2. **Gunakan Plugin Helper `$getImageUrl`**

```vue
<template>
  <img :src="$getImageUrl(imageUrl)" :alt="alt" />
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "uploads/profile/avatar.jpg"
    }
  }
}
</script>
```

### 3. **Gunakan Composable `getImageUrl`** (di Composition API)

```vue
<template>
  <img :src="normalizedImageUrl" :alt="alt" />
</template>

<script setup>
import { getImageUrl } from '~/composables/useImage.js'

const props = defineProps({
  imageUrl: String
})

const normalizedImageUrl = computed(() => getImageUrl(props.imageUrl))
</script>
```

## File Structure

### Modified Files:
1. **`app/composables/useImage.js`**
   - Updated `getImageUrl()` untuk menggunakan `minioPublicUrl` instead of `apiBaseUrl`
   - Function tetap support relative paths dan full URLs

2. **`app/components/MinioImage.vue`**
   - Updated untuk prioritize `minioPublicUrl`
   - Support untuk relative paths dengan base sebagai `minioPublicUrl`

3. **`app/plugins/imageUrl.js`** (NEW)
   - Global plugin untuk provide `$getImageUrl` helper
   - Accessible di template dengan `$getImageUrl(imagePath)`

4. **`nuxt.config.ts`**
   - Added `'~/plugins/imageUrl'` ke plugins array
   - Runtime config sudah include `minioPublicUrl`

## Image URL Transformation Examples

### Example 1: Relative Path
```
Input:  "uploads/portfolio/bridge-project.jpg"
Output: "http://10.80.2.195:9004/uploads/portfolio/bridge-project.jpg"
```

### Example 2: Absolute Path
```
Input:  "/uploads/blog/article-cover.png"
Output: "http://10.80.2.195:9004/uploads/blog/article-cover.png"
```

### Example 3: Full URL (Pass-through)
```
Input:  "http://10.80.2.195:9004/uploads/image.jpg"
Output: "http://10.80.2.195:9004/uploads/image.jpg"
```

### Example 4: External URL (Pass-through)
```
Input:  "https://example.com/image.jpg"
Output: "https://example.com/image.jpg"
```

## Components Using Image URLs

### 1. **homepage-card.vue**
- Uses `MinioImage` component
- Props: `imageUrl` (from portfolio.coverImage)

### 2. **carousel-card.vue**
- Uses `MinioImage` component
- Props: `imageUrl` (from blog.coverImage)

### 3. **bio-card.vue**
- Uses `NuxtImg` with local assets
- Static image: `/img/Alireza.jpg`

### 4. **MinioImage.vue** (Component)
- Central component untuk semua gambar dari database/Minio
- Auto-normalize image URLs
- Error handling dengan fallback image

## Flow Diagram

```
Backend Return Image Path
        ↓
[homepage-card / carousel-card]
        ↓
[MinioImage Component]
        ↓
[normalizedSrc computed property]
        ↓
Check if full URL? → Yes → Use as-is
        ↓ No
Use minioPublicUrl as base
        ↓
[Final URL] → <img src="...">
```

## Testing

### Checklist:
- [ ] Portfolio images load correctly
- [ ] Blog/Article images load correctly
- [ ] Team member bio images load correctly (jika dari Minio)
- [ ] Fallback images show when image fails to load
- [ ] Console logs show correct transformation
- [ ] Works on localhost dan production environment

## Troubleshooting

### Issue: Images not loading
- **Check:** `MINIO_PUBLIC_URL` di `.env` benar
- **Check:** MinIO server running dan accessible
- **Check:** Image path di database benar (relative paths)
- **Check:** Browser console untuk error messages

### Issue: Mixed content warning (localhost https)
- **Solution:** Update `MINIO_PUBLIC_URL` ke `https://` version
- **Or:** Configure MinIO dengan SSL certificate

### Issue: CORS errors
- **Solution:** Configure MinIO CORS settings
- **Or:** Use backend proxy mode (`MINIO_PROXY_MODE=backend`)

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MINIO_PUBLIC_URL` | `http://localhost:9004` | Public URL untuk akses Minio images |
| `MINIO_PROXY_MODE` | `direct` | `direct` atau `backend` untuk proxy through API |
| `API_BASE_URL` | `http://localhost:5000` | Backend API base URL (untuk fallback) |

## Migration Guide

Jika ada komponen yang masih menggunakan `apiBaseUrl` untuk image:

### Before:
```vue
<img :src="`${apiBaseUrl}${imagePath}`" />
```

### After:
```vue
<MinioImage :src="imagePath" />
<!-- atau -->
<img :src="$getImageUrl(imagePath)" />
```
