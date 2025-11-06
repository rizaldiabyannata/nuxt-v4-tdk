# Developer Guide - MinIO Image URL Integration

## 🎯 Quick Start

### For Frontend Developers

#### Goal
All images from database/Minio should use `MINIO_PUBLIC_URL` from `.env` as base URL.

#### Three Ways to Use Images

**1. MinioImage Component (RECOMMENDED)**
```vue
<template>
  <MinioImage
    :src="imageUrl"
    alt="Description"
    fallback="/img/placeholder.png"
  />
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "uploads/portfolio/image.jpg" // from database
    }
  }
}
</script>
```

**2. Global Plugin Helper**
```vue
<template>
  <img :src="$getImageUrl(imageUrl)" alt="Description" />
</template>

<script setup>
defineProps({
  imageUrl: String
})
</script>
```

**3. Composable Function**
```vue
<template>
  <img :src="normalizedImageUrl" alt="Description" />
</template>

<script setup>
import { getImageUrl } from '~/composables/useImage.js'

const props = defineProps({
  imageUrl: String
})

const normalizedImageUrl = computed(() => getImageUrl(props.imageUrl))
</script>
```

---

## 🔧 Architecture

### Configuration Hierarchy
```
.env (MINIO_PUBLIC_URL)
    ↓
nuxt.config.ts (runtimeConfig.public.minioPublicUrl)
    ↓
useImage.js composable
MinioImage.vue component
imageUrl.js plugin
    ↓
useImageUrl() for reactive computed
$getImageUrl() for direct calls
```

### Data Flow

```
Database/API
    ↓
Returns: "uploads/portfolio/image.jpg"
    ↓
Component Props: :imageUrl="imagePath"
    ↓
MinioImage | getImageUrl() | $getImageUrl()
    ↓
Check: Is it full URL?
    ├─ YES → Return as-is
    └─ NO → Add MINIO_PUBLIC_URL prefix
    ↓
Final URL: "http://10.80.2.195:9004/uploads/portfolio/image.jpg"
    ↓
<img src="Final URL" />
```

---

## 📦 Core Components

### 1. `useImage.js` Composable
**Location:** `app/composables/useImage.js`

**Functions:**
- `getImageUrl(imageUrl)` - Transform image path to full URL
- `isMinIOUrl(imageUrl)` - Check if URL is MinIO format
- `getImageFilename(imageUrl)` - Extract filename from URL
- `useImageUrl(imageUrl)` - Reactive computed property wrapper

**Usage:**
```javascript
import { getImageUrl, useImageUrl } from '~/composables/useImage.js'

// Direct call
const fullUrl = getImageUrl("uploads/image.jpg")

// Reactive
const imageUrl = useImageUrl(ref("uploads/image.jpg"))
```

### 2. `MinioImage.vue` Component
**Location:** `app/components/MinioImage.vue`

**Props:**
- `src` (required) - Image path or full URL
- `alt` (optional) - Alt text
- `imgClass` (optional) - Custom CSS classes
- `fallback` (optional) - Fallback image path

**Events:**
- `@load` - Emitted when image loads
- `@error` - Emitted when image fails to load

**Usage:**
```vue
<MinioImage
  :src="portfolio.coverImage"
  alt="Portfolio"
  @load="onImageLoad"
  @error="onImageError"
/>
```

### 3. `imageUrl.js` Plugin
**Location:** `app/plugins/imageUrl.js`

**Provides:**
- `$getImageUrl` - Global helper function

**Usage:**
```vue
<img :src="$getImageUrl(imagePath)" />
<!-- or -->
<script>
computed(() => this.$getImageUrl(this.imagePath))
</script>
```

---

## 🔄 Image URL Resolution Logic

### Step 1: Check for Null/Undefined
```javascript
if (!imageUrl) {
  return "/img/placeholder.png"
}
```

### Step 2: Check if Already Full URL
```javascript
if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
  // Check for internal MinIO hostname needing transformation
  if (imageUrl.includes("minio:9000")) {
    // Transform if needed
  }
  return imageUrl
}
```

### Step 3: Apply Minio Base URL
```javascript
const cleanPath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`
return `${minioPublicUrl}${cleanPath}`
```

---

## 📋 Implementation Patterns

### Pattern 1: Portfolio Grid
```vue
<template>
  <div v-for="portfolio in portfolios" :key="portfolio.id">
    <MinioImage
      :src="portfolio.coverImage"
      :alt="portfolio.title"
    />
    <h3>{{ portfolio.title }}</h3>
  </div>
</template>

<script>
export default {
  async mounted() {
    const { $api } = useNuxtApp()
    const response = await $api.get('/api/portfolios')
    // portfolio.coverImage is relative path from database
    this.portfolios = response.data
  }
}
</script>
```

### Pattern 2: Blog Article
```vue
<template>
  <img :src="$getImageUrl(article.coverImage)" :alt="article.title" />
  <div v-html="transformedContent"></div>
</template>

<script setup>
const props = defineProps({
  article: Object
})

const transformedContent = computed(() => {
  // Transform image URLs in HTML content
  return props.article.content.replace(
    /src="([^"]+)"/g,
    (match, url) => `src="${useNuxtApp().$getImageUrl(url)}"`
  )
})
</script>
```

### Pattern 3: Team Member Card
```vue
<template>
  <div class="team-member">
    <MinioImage
      :src="member.image"
      :alt="member.name"
      fallback="/img/placeholder-avatar.png"
    />
    <h4>{{ member.name }}</h4>
    <p>{{ member.title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    member: {
      type: Object,
      required: true
    }
  }
}
</script>
```

---

## 🛠️ Configuration

### Environment Variables
```env
# Minio Public URL (accessible from browser)
MINIO_PUBLIC_URL=http://10.80.2.195:9004

# Minio Proxy Mode: 'direct' or 'backend'
MINIO_PROXY_MODE=direct

# API Base URL (for fallback)
API_BASE_URL=http://10.80.2.195:5000
```

### Runtime Config (nuxt.config.ts)
```typescript
runtimeConfig: {
  public: {
    minioPublicUrl: process.env.MINIO_PUBLIC_URL || "http://localhost:9004",
    minioProxyMode: process.env.MINIO_PROXY_MODE || "backend",
    apiBaseUrl: process.env.API_BASE_URL || "http://localhost:5000",
  },
}
```

### Accessing Config
```javascript
// In any component/composable/plugin
const config = useRuntimeConfig()
const minioUrl = config.public.minioPublicUrl
const apiUrl = config.public.apiBaseUrl
const proxyMode = config.public.minioProxyMode
```

---

## 🎯 Common Use Cases

### 1. Display Database Image
```vue
<template>
  <MinioImage :src="portfolio.coverImage" />
</template>
```
✅ Automatically transforms: `uploads/...jpg` → `http://10.80.2.195:9004/uploads/...jpg`

### 2. Handle Broken Images
```vue
<template>
  <MinioImage
    :src="portfolio.coverImage"
    fallback="/img/broken-image.png"
    @error="onError"
  />
</template>

<script>
export default {
  methods: {
    onError(event) {
      console.log('Image failed to load:', event)
    }
  }
}
</script>
```

### 3. Transform HTML Content with Images
```javascript
export function transformImageUrls(htmlContent) {
  const { $getImageUrl } = useNuxtApp()
  return htmlContent.replace(
    /src="([^"]+)"/g,
    (match, url) => {
      // Only transform relative paths
      if (!url.startsWith('http')) {
        return `src="${$getImageUrl(url)}"`
      }
      return match
    }
  )
}
```

### 4. Image Lazy Loading
```vue
<template>
  <div v-for="item in items" :key="item.id">
    <MinioImage
      :src="item.image"
      loading="lazy"
    />
  </div>
</template>
```

---

## ⚠️ Common Mistakes

### ❌ Wrong: Hardcoding API URL
```javascript
// DON'T DO THIS
const imageUrl = `${apiBaseUrl}${dbImage}`
```

### ✅ Correct: Use MinioImage or getImageUrl
```javascript
// DO THIS
const imageUrl = getImageUrl(dbImage)
// or use MinioImage component
```

---

### ❌ Wrong: Mixing URL schemes
```javascript
// DON'T DO THIS
const url1 = `${minioUrl}/uploads/image.jpg`
const url2 = dbImage.startsWith('/') ? `${minioUrl}${dbImage}` : dbImage
// Different transformation logic in different places
```

### ✅ Correct: Centralized transformation
```javascript
// DO THIS
const url1 = getImageUrl('uploads/image.jpg')
const url2 = getImageUrl(dbImage)
// Same logic everywhere
```

---

### ❌ Wrong: Assuming all images from database
```javascript
// DON'T DO THIS
<img :src="$getImageUrl(anyImageUrl)" />
```

### ✅ Correct: Check if it's already a full URL
```javascript
// DO THIS - getImageUrl handles this automatically
<img :src="$getImageUrl(anyImageUrl)" />
// It will pass through full URLs unchanged
```

---

## 🧪 Testing

### Unit Test Example
```javascript
import { getImageUrl } from '~/composables/useImage.js'

describe('getImageUrl', () => {
  it('should add MINIO_PUBLIC_URL to relative paths', () => {
    const result = getImageUrl('uploads/image.jpg')
    expect(result).toBe('http://10.80.2.195:9004/uploads/image.jpg')
  })

  it('should handle absolute paths', () => {
    const result = getImageUrl('/uploads/image.jpg')
    expect(result).toBe('http://10.80.2.195:9004/uploads/image.jpg')
  })

  it('should pass through full URLs', () => {
    const url = 'https://external.com/image.jpg'
    expect(getImageUrl(url)).toBe(url)
  })

  it('should return placeholder for empty input', () => {
    expect(getImageUrl('')).toBe('/img/placeholder.png')
    expect(getImageUrl(null)).toBe('/img/placeholder.png')
  })
})
```

---

## 📚 Component Integration Checklist

When adding images to new components:

- [ ] Import MinioImage component or use $getImageUrl
- [ ] Receive image URL from props or API
- [ ] Use MinioImage for database images
- [ ] Provide fallback image path
- [ ] Handle error events
- [ ] Test with both relative and full URLs
- [ ] Verify console logs show correct transformation
- [ ] Check network tab for correct image requests
- [ ] Test error handling (broken image)

---

## 🔍 Debugging

### Enable Detailed Logging
MinioImage already logs to console:
```javascript
// Edit MinioImage.vue to add more logging if needed
console.log("🖼️ MinioImage received src:", imageUrl)
console.log("⚙️ MinIO Config:", { mode, publicUrl })
console.log("🔗 Relative path converted to:", finalUrl)
```

### Check Network Requests
1. Open DevTools → Network tab
2. Filter by images (click the image icon)
3. Look for:
   - Status 200 = successful load
   - Status 404 = image not found
   - URL starting with `http://10.80.2.195:9004/` = correct Minio URL

### Console Checks
1. Open DevTools → Console
2. Look for component initialization logs
3. Look for URL transformation logs
4. Look for any error messages

---

## 🚀 Performance Tips

1. **Use Lazy Loading**
   ```vue
   <MinioImage :src="image" loading="lazy" />
   ```

2. **Cache Image URLs**
   ```javascript
   const imageCache = new Map()
   function getCachedImageUrl(path) {
     if (!imageCache.has(path)) {
       imageCache.set(path, getImageUrl(path))
     }
    return imageCache.get(path)
   }
   ```

3. **Implement Image Resizing** (if backend supports)
   ```javascript
   // Example: append query params for resizing
   const resizedUrl = `${getImageUrl(image)}?w=400&h=400&fit=cover`
   ```

4. **Monitor Bundle Size**
   - MinioImage is lightweight
   - No external dependencies

---

## 📖 Reference Links

- `IMAGE_URL_GUIDE.md` - Complete usage guide
- `MINIO_IMAGE_IMPLEMENTATION.md` - Implementation details
- `FILES_CHANGED.md` - All file changes
- `VERIFICATION_CHECKLIST.md` - Testing checklist

---

## 💡 Tips & Tricks

### Tip 1: Conditional Image Loading
```javascript
computed(() => {
  return item.image ? this.$getImageUrl(item.image) : '/img/placeholder.png'
})
```

### Tip 2: Image Gallery
```vue
<template>
  <div class="gallery">
    <MinioImage
      v-for="img in images"
      :key="img.id"
      :src="img.path"
      @click="selectImage(img)"
    />
  </div>
</template>
```

### Tip 3: Responsive Images
```vue
<template>
  <picture>
    <source :srcset="$getImageUrl(image.webp)" type="image/webp" />
    <img :src="$getImageUrl(image.jpg)" />
  </picture>
</template>
```

---

**Last Updated:** 2025-11-06
**Version:** 1.0
**Status:** ✅ Production Ready
