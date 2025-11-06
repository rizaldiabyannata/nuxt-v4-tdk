# Image URL Configuration - Implementation Summary

## 🎯 Objective
Configure semua image pada halaman localhost untuk menggunakan `MINIO_PUBLIC_URL` dari `.env` sebagai base URL, bukan dari `API_BASE_URL`.

## ✅ Changes Made

### 1. **Updated `app/composables/useImage.js`**
- **Change:** Modified `getImageUrl()` function untuk menggunakan `minioPublicUrl` sebagai base URL
- **Before:** 
  ```javascript
  const baseUrl = config.public.apiBaseUrl || "http://localhost:5000";
  ```
- **After:**
  ```javascript
  const minioPublicUrl = config.public.minioPublicUrl || "http://localhost:9004";
  ```
- **Impact:** Semua relative image paths akan ditranslate menggunakan `MINIO_PUBLIC_URL`

### 2. **Updated `app/components/MinioImage.vue`**
- **Change:** Prioritized `minioPublicUrl` untuk relative paths
- **Before:**
  ```javascript
  const fullUrl = `${baseUrl}${cleanPath}`;
  ```
- **After:**
  ```javascript
  const fullUrl = `${minioPublicUrl}${cleanPath}`;
  ```
- **Impact:** Component ini sekarang default menggunakan Minio URL untuk semua relative paths

### 3. **Created `app/plugins/imageUrl.js`** (NEW)
- **Purpose:** Global plugin untuk provide `$getImageUrl` helper method
- **Usage in template:**
  ```vue
  <img :src="$getImageUrl(imagePath)" />
  ```
- **Features:**
  - Accessible di semua components via `$getImageUrl`
  - Fallback to placeholder image jika path kosong
  - Support untuk relative paths dan full URLs

### 4. **Updated `nuxt.config.ts`**
- **Change:** Added `'~/plugins/imageUrl'` ke plugins array
- **Before:**
  ```typescript
  plugins:['~/plugins/api']
  ```
- **After:**
  ```typescript
  plugins:['~/plugins/api', '~/plugins/imageUrl']
  ```

### 5. **Created `IMAGE_URL_GUIDE.md`** (Documentation)
- Comprehensive guide untuk developers
- Usage examples untuk setiap method
- Troubleshooting section
- Environment variables documentation

## 🔄 Image URL Transformation Flow

```
Database/API returns image path
        ↓
Component receives imageUrl prop
        ↓
MinioImage component atau getImageUrl() composable
        ↓
Check: Is it full URL?
  - YES → Return as-is
  - NO → Prepend MINIO_PUBLIC_URL
        ↓
Final URL = ${MINIO_PUBLIC_URL}${imagePath}
        ↓
<img src="Final URL">
```

## 📋 Components Affected

### Currently Using MinioImage (Already Updated)
1. **`homepage-card.vue`** ✅
   - Portfolio images from database
   - Already uses MinioImage component

2. **`carousel-card.vue`** ✅
   - Blog/Article images from database
   - Already uses MinioImage component

### Static Assets (Not Changed)
1. **`bio-card.vue`** (uses local `/img/Alireza.jpg`)
   - Local assets dalam `/public/img/`
   - Tidak perlu Minio URL

2. **`about-us.vue`** (uses local `/img/sample/aboutus.png`)
   - Local background images
   - Tidak perlu Minio URL

## 🧪 Testing Checklist

- [ ] Portfolio images load correctly dari Minio
- [ ] Article/Blog images load correctly dari Minio
- [ ] Fallback images appear jika image gagal load
- [ ] Console logs show correct URL transformation
- [ ] Works with different image formats (jpg, png, webp)
- [ ] Error handling works properly
- [ ] Application works di production dengan production MinIO URL

## 🚀 How to Use

### For Components Displaying Database Images

**Method 1: MinioImage Component (Recommended)**
```vue
<template>
  <MinioImage
    :src="portfolio.coverImage"
    alt="Portfolio Image"
    fallback="/img/placeholder.png"
  />
</template>
```

**Method 2: Using $getImageUrl Plugin**
```vue
<template>
  <img :src="$getImageUrl(portfolio.coverImage)" alt="Portfolio" />
</template>
```

**Method 3: Using Composable**
```vue
<template>
  <img :src="normalizedImageUrl" alt="Portfolio" />
</template>

<script setup>
import { getImageUrl } from '~/composables/useImage.js'
const normalizedImageUrl = computed(() => getImageUrl(props.imageUrl))
</script>
```

## 📝 Environment Configuration

### .env
```env
MINIO_PUBLIC_URL=http://10.80.2.195:9004
MINIO_PROXY_MODE=direct
API_BASE_URL=http://10.80.2.195:5000
```

### Runtime Config (dari nuxt.config.ts)
```typescript
runtimeConfig: {
  public: {
    minioPublicUrl: process.env.MINIO_PUBLIC_URL || "http://localhost:9004",
    minioProxyMode: process.env.MINIO_PROXY_MODE || "backend",
    apiBaseUrl: process.env.API_BASE_URL || "http://localhost:5000",
  },
}
```

## 🔍 URL Transformation Examples

| Input | Output |
|-------|--------|
| `"uploads/portfolio/bridge.jpg"` | `http://10.80.2.195:9004/uploads/portfolio/bridge.jpg` |
| `"/uploads/blog/article.png"` | `http://10.80.2.195:9004/uploads/blog/article.png` |
| `"http://10.80.2.195:9004/image.jpg"` | `http://10.80.2.195:9004/image.jpg` (pass-through) |
| `"https://external.com/image.jpg"` | `https://external.com/image.jpg` (pass-through) |
| `""` (empty) | `/img/placeholder.png` (fallback) |

## ⚙️ Configuration Priority

1. **Full URL** (http/https) → Use as-is
2. **Relative path** → Prepend `MINIO_PUBLIC_URL`
3. **Empty** → Use fallback `/img/placeholder.png`

## 🛠️ Troubleshooting

### Images Not Loading
1. Check `.env` file has correct `MINIO_PUBLIC_URL`
2. Verify MinIO server adalah accessible dari browser
3. Check browser DevTools Network tab untuk failed requests
4. Check console untuk error messages
5. Verify image paths di database are relative (tidak full URLs)

### Mixed Content Warning (HTTPS)
1. Update `MINIO_PUBLIC_URL` ke `https://` version
2. Or configure MinIO dengan SSL certificate
3. Or access application via `http://` jika development

### CORS Issues
1. Configure MinIO CORS settings di backend
2. Or switch to `MINIO_PROXY_MODE=backend` (proxy through API)

## 📚 Related Documentation
- See `IMAGE_URL_GUIDE.md` untuk detailed usage guide
- Check individual component comments untuk implementation details

## 🎉 Benefits

✅ Centralized image URL configuration via `.env`
✅ Support untuk relative paths dan full URLs
✅ Fallback image support
✅ Error handling built-in
✅ Easy to migrate to different MinIO server
✅ No hardcoded URLs di components
✅ Works both localhost dan production
