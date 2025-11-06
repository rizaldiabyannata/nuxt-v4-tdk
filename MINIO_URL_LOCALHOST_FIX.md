# Image URL Localhost Fix - Update

## 🔧 Problem
Backend mengembalikan image URLs dengan `localhost:9004` atau `127.0.0.1:9004`, padahal seharusnya menggunakan `MINIO_PUBLIC_URL` dari `.env` (misalnya: `http://10.80.2.195:9004`).

### Original Issue
```
Backend URL: http://localhost:9004/tdk-uploads/Gemini_Generated_Image_q621vbq621vbq621-1762401859300-499715167.webp
Desired URL: http://10.80.2.195:9004/tdk-uploads/Gemini_Generated_Image_q621vbq621vbq621-1762401859300-499715167.webp
```

---

## ✅ Solution
Implementasi transformasi URL di frontend untuk mendeteksi dan mengganti `localhost:9004` atau `127.0.0.1:9004` dengan `MINIO_PUBLIC_URL` dari `.env`.

---

## 📝 Changes Made

### 1. Updated `app/composables/useImage.js`
**Added localhost/127.0.0.1 detection:**
```javascript
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
```

### 2. Updated `app/components/MinioImage.vue`
**Added same localhost/127.0.0.1 detection** untuk consistency di component level.

### 3. Updated `app/plugins/imageUrl.js`
**Added same localhost/127.0.0.1 detection** di plugin helper function.

---

## 🔄 URL Transformation Flow (Updated)

```
Backend returns: http://localhost:9004/tdk-uploads/image.webp
        ↓
Frontend receives full URL
        ↓
Check: Is it localhost:9004 or 127.0.0.1:9004?
  ├─ YES (localhost) → Extract path: /tdk-uploads/image.webp
  │              → Prepend MINIO_PUBLIC_URL: http://10.80.2.195:9004/tdk-uploads/image.webp
  │              → Return transformed URL
  │
  ├─ YES (127.0.0.1) → Extract path: /tdk-uploads/image.webp
  │                → Prepend MINIO_PUBLIC_URL: http://10.80.2.195:9004/tdk-uploads/image.webp
  │                → Return transformed URL
  │
  └─ NO → Return URL as-is (already correct domain)
        ↓
Final URL: http://10.80.2.195:9004/tdk-uploads/image.webp
        ↓
Browser loads image
```

---

## 📋 URL Transformation Examples

### Example 1: localhost (local development)
```
Input:  http://localhost:9004/tdk-uploads/image.webp
Output: http://10.80.2.195:9004/tdk-uploads/image.webp
```

### Example 2: 127.0.0.1 (loop back)
```
Input:  http://127.0.0.1:9004/tdk-uploads/image.webp
Output: http://10.80.2.195:9004/tdk-uploads/image.webp
```

### Example 3: Correct domain (no change)
```
Input:  http://10.80.2.195:9004/tdk-uploads/image.webp
Output: http://10.80.2.195:9004/tdk-uploads/image.webp (pass-through)
```

### Example 4: Relative path (existing behavior)
```
Input:  /tdk-uploads/image.webp
Output: http://10.80.2.195:9004/tdk-uploads/image.webp
```

---

## 🧪 Testing

### Step 1: Verify Console Logs
When loading images, check browser console:
```
🖼️ MinioImage received src: http://localhost:9004/tdk-uploads/image.webp
🔄 localhost:9004 replaced with: http://10.80.2.195:9004/tdk-uploads/image.webp
```

### Step 2: Check Network Tab
All image requests should show:
- URL: `http://10.80.2.195:9004/...`
- Status: 200 OK

### Step 3: Verify Images Load Correctly
- Portfolio images should display
- Blog images should display
- No 404 errors

---

## 🎯 How It Works

### In `getImageUrl()` Function
1. Check if URL is empty → return placeholder
2. Check if URL starts with http/https → enter full URL handling
3. **NEW:** Check if URL contains `localhost:9004`
   - Extract path from URL
   - Combine with `MINIO_PUBLIC_URL` from env
   - Return transformed URL
4. **NEW:** Check if URL contains `127.0.0.1:9004`
   - Extract path from URL
   - Combine with `MINIO_PUBLIC_URL` from env
   - Return transformed URL
5. Otherwise → return URL as-is
6. If not full URL → treat as relative path and combine with `MINIO_PUBLIC_URL`

---

## 🌍 When This Applies

This fix handles these scenarios:

✅ Backend running on `localhost` → returns `localhost:9004` URLs
✅ Backend running on `127.0.0.1` → returns `127.0.0.1:9004` URLs
✅ Frontend accessing from different machine → needs proper domain/IP
✅ Production with different domain than localhost

---

## 🔍 Regex Patterns Used

### Pattern 1: localhost
```javascript
/https?:\/\/localhost:9004/
```
Matches: `http://localhost:9004` or `https://localhost:9004`

### Pattern 2: 127.0.0.1
```javascript
/https?:\/\/127\.0\.0\.1:9004/
```
Matches: `http://127.0.0.1:9004` or `https://127.0.0.1:9004`

---

## 💡 Why This Solution?

### ✅ Advantages
1. **Frontend-level fix** - No need to wait for backend changes
2. **Non-breaking** - All existing URLs still work
3. **Flexible** - Works with any `MINIO_PUBLIC_URL` in `.env`
4. **Transparent** - Users don't notice the transformation
5. **Logged** - Console shows what's happening for debugging

### Alternative Solutions (Not Implemented)
- ❌ Change backend to return correct URLs (requires backend change)
- ❌ Proxy through backend API (adds latency)
- ❌ Hardcode domain in frontend (not flexible)

---

## 🚀 Future Improvements

If backend is updated to return correct URLs:
1. Backend should check its own hostname/IP
2. Backend should return URLs with correct domain
3. Frontend code will still work (pass-through case)
4. Transformation code becomes redundant but harmless

---

## 🛠️ Configuration

### .env File (Required)
```env
MINIO_PUBLIC_URL=http://10.80.2.195:9004
```

This is the URL that will be used to replace localhost/127.0.0.1.

### Runtime Config (nuxt.config.ts)
```typescript
minioPublicUrl: process.env.MINIO_PUBLIC_URL || "http://localhost:9004"
```

The fallback ensures localhost usage still works if env var not set.

---

## 📊 Files Modified

| File | Changes |
|------|---------|
| `app/composables/useImage.js` | Added localhost detection |
| `app/components/MinioImage.vue` | Added localhost detection |
| `app/plugins/imageUrl.js` | Added localhost detection |

---

## 🔒 Security Notes

✅ No sensitive data exposed
✅ Only URL manipulation, no API calls
✅ Regex patterns are safe and specific
✅ No external dependencies added

---

## 📚 Related Documentation

- `IMAGE_URL_GUIDE.md` - Complete usage guide
- `MINIO_IMAGE_IMPLEMENTATION.md` - Original implementation
- `DEVELOPER_GUIDE.md` - Developer reference

---

## ✅ Verification Steps

- [ ] Images load with correct domain
- [ ] Console shows transformation logs
- [ ] Network tab shows correct URLs
- [ ] Works on different machines/networks
- [ ] Fallback works if env var missing

---

**Status:** ✅ Ready for Production
**Last Updated:** 2025-11-06
**Version:** 2.0
