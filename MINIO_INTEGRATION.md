# MinIO Integration Guide

## Overview

Project ini telah diupdate untuk mendukung **MinIO object storage** sebagai replacement dari file system storage. Backend akan return URL gambar dari MinIO, dan frontend secara otomatis menangani berbagai format URL.

## Cara Kerja

### Backend → MinIO

Backend (Express API) akan:

1. Upload image ke MinIO bucket
2. Return URL dalam format:
   - **MinIO URL**: `http://minio-server:9000/bucket-name/path/to/file.webp`
   - **Pre-signed URL**: `http://minio-server:9000/bucket-name/file.webp?X-Amz-Algorithm=...`
   - **Relative path** (backward compatibility): `/uploads/images/file.webp`

### Frontend → Display

Frontend akan:

1. Detect format URL dari backend
2. Normalize URL menggunakan `getImageUrl()` helper
3. Display image dengan component `MinioImage` atau standard `img` tag

## File Structure

```
app/
├── composables/
│   └── useImage.js          # Helper functions untuk MinIO URLs
├── components/
│   └── MinioImage.vue       # Component wrapper untuk image dengan error handling
└── pages/
    ├── admin/
    │   ├── articles/        # Updated untuk MinIO
    │   └── portfolios/      # Updated untuk MinIO
    ├── portfolio/           # Updated untuk MinIO
    └── article/             # Updated untuk MinIO
```

## Helper Functions

### 1. `getImageUrl(imageUrl)`

Normalize image URL untuk berbagai format.

**Input:**

- `"/uploads/images/file.webp"` → Relative path
- `"http://minio:9000/bucket/file.webp"` → Full MinIO URL
- `"http://minio:9000/bucket/file.webp?X-Amz-..."` → Pre-signed URL

**Output:**

- Full, ready-to-use URL

**Usage:**

```javascript
import { getImageUrl } from "@/composables/useImage";

const normalizedUrl = getImageUrl(article.coverImage);
```

### 2. `isMinIOUrl(imageUrl)`

Check if URL is MinIO URL.

```javascript
import { isMinIOUrl } from "@/composables/useImage";

if (isMinIOUrl(imageUrl)) {
  console.log("This is MinIO URL");
}
```

### 3. `useImageUrl(imageUrl)`

Composable untuk reactive URL handling.

```javascript
import { useImageUrl } from "@/composables/useImage";

const imageUrl = ref("/uploads/images/test.webp");
const normalizedUrl = useImageUrl(imageUrl);
```

## Components

### MinioImage Component

Auto-handling untuk MinIO URLs dengan error fallback.

**Props:**

- `src` (String, required): Image URL dari backend
- `alt` (String): Alt text untuk accessibility
- `imgClass` (String): CSS classes
- `fallback` (String): Fallback image path

**Events:**

- `@load`: Triggered when image loaded successfully
- `@error`: Triggered when image failed to load

**Usage:**

```vue
<template>
  <MinioImage
    :src="article.coverImage"
    :alt="article.title"
    img-class="w-full h-64 object-cover rounded-lg"
    fallback="/img/placeholder.png"
    @load="handleImageLoad"
    @error="handleImageError"
  />
</template>

<script setup>
const handleImageLoad = (event) => {
  console.log("Image loaded:", event);
};

const handleImageError = (event) => {
  console.error("Image failed to load:", event);
};
</script>
```

## Migration Guide

### Before (Old System)

```vue
<!-- WRONG: Hardcoded localhost -->
<img :src="`http://localhost:5000${article.coverImage}`" />

<!-- Script -->
<script>
export default {
  methods: {
    async handleEdit(slug) {
      const response = await this.$api.get(`/api/blogs/${slug}`);
      this.existingImageUrl = `http://localhost:5000${response.data.coverImage}`;
    },
  },
};
</script>
```

### After (MinIO Support)

```vue
<!-- CORRECT: Using MinioImage component -->
<MinioImage
  :src="article.coverImage"
  :alt="article.title"
  img-class="w-full h-64 object-cover"
/>

<!-- Or using helper function -->
<img :src="getImageUrl(article.coverImage)" :alt="article.title" />

<!-- Script -->
<script>
import { getImageUrl } from "@/composables/useImage";

export default {
  methods: {
    getImageUrl(url) {
      return getImageUrl(url);
    },
    async handleEdit(slug) {
      const response = await this.$api.get(`/api/blogs/${slug}`);
      // Helper function auto-detects format
      this.existingImageUrl = this.getImageUrl(response.data.coverImage);
    },
  },
};
</script>
```

## Updated Files

### ✅ Completed

- [x] `app/composables/useImage.js` - Helper functions
- [x] `app/components/MinioImage.vue` - Image component
- [x] `app/pages/admin/articles/index.vue` - Remove hardcoded URLs
- [x] `app/components/carousel-admin.vue` - Use MinioImage

### 🔄 In Progress

- [ ] `app/pages/admin/portfolios/index.vue`
- [ ] `app/pages/portfolio/[slug].vue`
- [ ] `app/pages/portfolio/index.vue`
- [ ] `app/pages/article/[slug].vue`
- [ ] `app/pages/article/index.vue`
- [ ] `app/pages/index.vue`

## Backend Configuration

Backend perlu konfigurasi MinIO:

```javascript
// Backend config example
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || "localhost",
  port: parseInt(process.env.MINIO_PORT) || 9000,
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

// Return full MinIO URL
const imageUrl = `http://${minioEndpoint}:${minioPort}/${bucketName}/${fileName}`;
```

### Environment Variables (Backend)

```env
MINIO_ENDPOINT=minio
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=images
```

### Environment Variables (Frontend)

```env
# .env (Development)
API_BASE_URL=http://localhost:5000

# MinIO Configuration
# Mode: 'backend' (proxy melalui backend) atau 'direct' (akses langsung MinIO)
MINIO_PROXY_MODE=direct

# MinIO Public URL (untuk mode direct)
# Port 9004 adalah port yang di-expose di docker-compose (9004:9000)
MINIO_PUBLIC_URL=http://localhost:9004

# Production
API_BASE_URL=https://api.production.com
MINIO_PROXY_MODE=backend
MINIO_PUBLIC_URL=https://minio.production.com
```

### Docker Compose Configuration (Backend)

MinIO harus di-expose ke host machine agar frontend bisa akses (mode direct):

```yaml
services:
  minio:
    image: minio/minio
    container_name: minio-tdk
    restart: always
    ports:
      - "9004:9000" # Expose MinIO API ke localhost:9004
      - "9005:9001" # Expose MinIO Console ke localhost:9005
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin123
    command: server /data --console-address ":9001"
    volumes:
      - minio-data:/data
    networks:
      - app-network
```

**Note:** Port 9004 digunakan di host machine untuk menghindari konflik dengan service lain.

## URL Format Detection Logic

Helper `getImageUrl()` auto-detects format:

```javascript
// Case 1: Full URL (MinIO)
"http://minio:9000/bucket/file.webp"
→ Return as-is

// Case 2: Pre-signed URL (MinIO)
"http://minio:9000/bucket/file.webp?X-Amz-Algorithm=..."
→ Return as-is

// Case 3: Relative path (backward compatibility)
"/uploads/images/file.webp"
→ Prepend with apiBaseUrl
→ "http://localhost:5000/uploads/images/file.webp"

// Case 4: Empty/null
""
→ Return placeholder "/img/placeholder.png"
```

## Error Handling

### MinioImage Component

```vue
<MinioImage :src="article.coverImage" fallback="/img/card-placeholder.png" />
```

**Behavior:**

1. Try load `article.coverImage`
2. If fails (404, CORS, network error) → Load `fallback`
3. Emit `@error` event untuk custom handling

### Manual Error Handling

```vue
<img :src="getImageUrl(article.coverImage)" @error="handleImageError" />

<script>
methods: {
  handleImageError(event) {
    event.target.src = '/img/placeholder.png';
    console.error('Image load failed');
  }
}
</script>
```

## CORS Configuration

MinIO perlu CORS enabled untuk frontend access (mode direct):

### Option 1: Set CORS via MinIO Client (Recommended)

Jalankan command ini di terminal backend server:

```bash
# Install mc (MinIO Client)
# Linux/Mac
curl https://dl.min.io/client/mc/release/linux-amd64/mc -o mc
chmod +x mc

# Windows (PowerShell)
# Download dari https://dl.min.io/client/mc/release/windows-amd64/mc.exe

# Configure alias
mc alias set myminio http://localhost:9004 minioadmin minioadmin123

# Set CORS policy untuk bucket tdk-uploads
mc anonymous set-json /path/to/cors-policy.json myminio/tdk-uploads

# Or set public read
mc anonymous set download myminio/tdk-uploads
```

**cors-policy.json:**

```json
{
  "CORSRules": [
    {
      "AllowedOrigins": [
        "http://localhost:3000",
        "http://localhost:5000",
        "https://yourdomain.com"
      ],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3600
    }
  ]
}
```

### Option 2: Set CORS via Backend Code

```javascript
// Backend: Configure MinIO CORS saat startup
const Minio = require("minio");

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || "localhost",
  port: parseInt(process.env.MINIO_PORT) || 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

// Set bucket policy untuk public read
const policy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: { AWS: ["*"] },
      Action: ["s3:GetObject"],
      Resource: [`arn:aws:s3:::${bucketName}/*`],
    },
  ],
};

await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
```

### Option 3: Gunakan Backend Proxy (Recommended untuk Production)

Jika CORS masih bermasalah, gunakan backend sebagai proxy:

```javascript
// Backend Express.js
app.get("/api/minio-proxy/*", async (req, res) => {
  const minioPath = req.params[0]; // e.g., tdk-uploads/file.webp
  const minioUrl = `http://minio:9000/${minioPath}`;

  try {
    const response = await axios.get(minioUrl, {
      responseType: "arraybuffer",
      headers: {
        Host: "minio:9000",
      },
    });

    res.set("Content-Type", response.headers["content-type"]);
    res.set("Cache-Control", "public, max-age=86400"); // Cache 1 day
    res.send(response.data);
  } catch (error) {
    console.error("MinIO proxy error:", error);
    res.status(404).send("Image not found");
  }
});
```

Kemudian set frontend ke mode backend:

```env
MINIO_PROXY_MODE=backend
```

## Testing

### Test dengan berbagai URL format:

```javascript
// Test helper functions
import { getImageUrl, isMinIOUrl } from "@/composables/useImage";

// Test 1: MinIO URL
const minioUrl = "http://minio:9000/images/test.webp";
console.log(getImageUrl(minioUrl)); // Should return as-is
console.log(isMinIOUrl(minioUrl)); // Should return true

// Test 2: Relative path
const relativePath = "/uploads/images/test.webp";
console.log(getImageUrl(relativePath)); // Should prepend baseUrl
console.log(isMinIOUrl(relativePath)); // Should return false

// Test 3: Pre-signed URL
const presignedUrl =
  "http://minio:9000/images/test.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256";
console.log(getImageUrl(presignedUrl)); // Should return as-is
console.log(isMinIOUrl(presignedUrl)); // Should return true
```

## Troubleshooting

### Problem: Images not loading

**Possible causes:**

1. CORS not configured on MinIO
2. Wrong MinIO endpoint URL
3. Bucket is private (needs pre-signed URL)

**Solution:**

```javascript
// Check MinIO CORS
mc admin policy list myminio

// Set public read policy
mc policy set download myminio/images

// Or use pre-signed URLs from backend
```

### Problem: Mixed content (HTTP/HTTPS)

**Cause:** Frontend on HTTPS, MinIO on HTTP

**Solution:**

```javascript
// Option 1: Use HTTPS for MinIO
MINIO_USE_SSL = true;

// Option 2: Proxy through backend
// Backend routes /api/images/* → MinIO
```

### Problem: 404 on old images

**Cause:** Old images still in filesystem, not migrated to MinIO

**Solution:**

```bash
# Migrate old images to MinIO
mc cp --recursive /uploads/images/ myminio/images/
```

## Production Checklist

- [ ] MinIO CORS configured
- [ ] MinIO bucket policy set (public or pre-signed)
- [ ] Environment variables configured
- [ ] All components updated to use `getImageUrl()` or `MinioImage`
- [ ] Old images migrated to MinIO
- [ ] Test image loading in production
- [ ] Monitor MinIO storage usage
- [ ] Setup MinIO backup strategy

## Best Practices

### ✅ DO

- Use `MinioImage` component for auto error handling
- Use `getImageUrl()` helper for URL normalization
- Set proper fallback images
- Test with various URL formats
- Enable CORS properly on MinIO

### ❌ DON'T

- Hardcode `http://localhost:5000` in templates
- Assume URL format (always use helpers)
- Skip error handling on images
- Store sensitive images in public bucket
- Forget to migrate old images

## Monitoring

### Image Load Metrics

```javascript
// Track image load success/failures
const imageStats = {
  loaded: 0,
  failed: 0,
  totalSize: 0,
};

// In MinioImage component
emit("load", { size: event.target.naturalWidth * event.target.naturalHeight });
emit("error", { src: props.src });
```

## Future Improvements

1. **Image Optimization Pipeline**

   - Auto-resize on upload
   - Convert to WebP automatically
   - Generate thumbnails

2. **CDN Integration**

   - Add CloudFront/CloudFlare in front of MinIO
   - Improve global load times

3. **Lazy Loading**

   - Implement intersection observer
   - Load images on viewport enter

4. **Image Caching**
   - Browser cache headers
   - Service worker caching
   - IndexedDB for offline support

## References

- [MinIO Documentation](https://min.io/docs/)
- [MinIO JavaScript Client](https://github.com/minio/minio-js)
- [Nuxt Image Module](https://image.nuxt.com/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
