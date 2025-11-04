# Sistem Autentikasi - Nuxt v4 TDK

## Overview

Proyek ini menggunakan **cookie-based JWT authentication** yang dikelola sepenuhnya oleh backend. Frontend hanya perlu melakukan request HTTP dengan `credentials: true` (dalam axios: `withCredentials: true`).

## Arsitektur Autentikasi

### Backend (Node.js/Express API)

- **Login**: `POST /api/user/login`

  - Body: `{ "name": "admin", "password": "password" }`
  - Response: Backend akan **set cookie** bernama `token` dengan flag `HttpOnly`
  - Cookie ini akan otomatis disimpan oleh browser

- **Logout**: `POST /api/user/logout`

  - Backend akan **clear cookie** `token`
  - No body required

- **Protected Endpoints**: Semua endpoint admin (CRUD blog/portfolio, statistics, etc.)
  - Memerlukan cookie `token` yang valid
  - Backend akan verify JWT dari cookie

### Frontend (Nuxt 4)

#### 1. Plugin API (`app/plugins/api.js`)

```javascript
const api = axios.create({
  baseURL: config.public.apiBaseUrl,
  withCredentials: true, // PENTING: Ini membuat browser auto-send cookies
});
```

**Kenapa `withCredentials: true`?**

- Membuat browser otomatis mengirim cookie ke backend pada setiap request
- Cookie `HttpOnly` tidak bisa diakses via JavaScript (security feature)
- Browser yang handle semua cookie management

#### 2. Login Page (`app/pages/login.vue`)

```javascript
async login() {
  const response = await this.$api.post("/api/user/login", {
    name,
    password,
  });
  // Cookie sudah di-set oleh backend!
  // Langsung redirect, tidak perlu simpan token manual
  await navigateTo("/admin");
}
```

**TIDAK PERLU:**

- ❌ `localStorage.setItem('token', ...)`
- ❌ `useCookie('accessToken').value = token`
- ❌ Manual token management

**SUDAH OTOMATIS:**

- ✅ Browser menerima cookie dari backend
- ✅ Browser menyimpan cookie secara aman (HttpOnly)
- ✅ Browser mengirim cookie pada setiap request ke backend

#### 3. Middleware Auth (`app/middleware/auth.ts`)

```typescript
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path.startsWith("/admin")) {
    const { $api } = useNuxtApp();

    try {
      // Test apakah cookie valid dengan hit protected endpoint
      await $api.get("/api/user/profile");
      // Jika berhasil, user authenticated
    } catch (error) {
      // Jika gagal (401), redirect ke home
      return navigateTo("/");
    }
  }
});
```

**Cara Kerja:**

1. User akses `/admin/*`
2. Middleware cek auth dengan call `/api/user/profile`
3. Browser otomatis kirim cookie `token`
4. Backend verify JWT dari cookie
5. Jika valid → izinkan akses, jika tidak → redirect ke `/`

#### 4. Logout Component (`app/components/logout-component.vue`)

```javascript
const handleLogout = async () => {
  try {
    // Call logout endpoint - backend akan clear cookie
    await $api.post("/api/user/logout");
    // Redirect ke home
    await navigateTo("/");
  } catch (error) {
    // Tetap redirect untuk keamanan
    await navigateTo("/");
  }
};
```

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                       LOGIN FLOW                            │
└─────────────────────────────────────────────────────────────┘

User                Frontend (Nuxt)           Backend (Express)
  │                       │                          │
  │  1. Input credentials │                          │
  ├──────────────────────>│                          │
  │                       │                          │
  │                       │  2. POST /api/user/login │
  │                       ├─────────────────────────>│
  │                       │  { name, password }      │
  │                       │                          │
  │                       │                          │  3. Verify
  │                       │                          │     credentials
  │                       │                          │
  │                       │  4. Set-Cookie: token=JWT│
  │                       │<─────────────────────────┤
  │                       │     (HttpOnly)           │
  │                       │                          │
  │  5. Redirect /admin   │                          │
  │<──────────────────────┤                          │
  │                       │                          │


┌─────────────────────────────────────────────────────────────┐
│                  PROTECTED REQUEST FLOW                     │
└─────────────────────────────────────────────────────────────┘

User                Frontend (Nuxt)           Backend (Express)
  │                       │                          │
  │  1. Access /admin     │                          │
  ├──────────────────────>│                          │
  │                       │                          │
  │                       │  2. Middleware: Check    │
  │                       │     GET /api/user/profile│
  │                       ├─────────────────────────>│
  │                       │  Cookie: token=JWT       │
  │                       │  (sent automatically)    │
  │                       │                          │
  │                       │                          │  3. Verify JWT
  │                       │                          │     from cookie
  │                       │                          │
  │                       │  4. 200 OK (or 401)      │
  │                       │<─────────────────────────┤
  │                       │                          │
  │  5. Show admin page   │                          │
  │     or redirect /     │                          │
  │<──────────────────────┤                          │
  │                       │                          │
```

## Security Benefits

### ✅ HttpOnly Cookie

- JavaScript tidak bisa akses cookie (mencegah XSS attacks)
- Cookie hanya dikirim via HTTP requests
- Tidak ada token di localStorage/sessionStorage

### ✅ Same-Site Cookie Policy

- Backend set cookie dengan SameSite flag
- Mencegah CSRF attacks

### ✅ Secure Cookie (Production)

- Cookie hanya dikirim via HTTPS di production
- Mencegah man-in-the-middle attacks

## Development vs Production

### Development (`localhost`)

```javascript
// nuxt.config.ts
runtimeConfig: {
  public: {
    apiBaseUrl: "http://localhost:5000";
  }
}
```

- Cookie works di `localhost`
- CORS enabled di backend

### Production

```javascript
// Backend harus set:
- Same domain atau CORS configured properly
- Secure: true untuk HTTPS
- SameSite: 'strict' atau 'lax'
```

## Troubleshooting

### Problem: "Authentication check failed"

**Cause**: Cookie tidak terkirim ke backend
**Solution**:

1. Check `withCredentials: true` di axios config
2. Check CORS config di backend (Access-Control-Allow-Credentials)
3. Check cookie tidak expired

### Problem: Login berhasil tapi redirect langsung logout

**Cause**: Cookie tidak persisted setelah redirect
**Solution**:

1. Pastikan backend return cookie dengan Path=/
2. Check domain/subdomain match
3. Inspect cookie di browser DevTools → Application → Cookies

### Problem: 401 Unauthorized di middleware

**Cause**: JWT token invalid/expired
**Solution**:

1. Login ulang untuk refresh token
2. Check backend JWT secret consistency
3. Check token expiration time di backend

## Best Practices

### ✅ DO

- Gunakan `withCredentials: true` di semua API requests
- Biarkan browser handle cookie management
- Check auth status via API call, bukan localStorage
- Clear sensitive data saat logout

### ❌ DON'T

- Jangan simpan JWT di localStorage/sessionStorage
- Jangan akses cookie via JavaScript
- Jangan hardcode credentials
- Jangan skip HTTPS di production

## API Endpoints Reference

| Method | Endpoint            | Auth Required | Cookie Set | Description      |
| ------ | ------------------- | ------------- | ---------- | ---------------- |
| POST   | `/api/user/login`   | ❌            | ✅         | Login admin      |
| POST   | `/api/user/logout`  | ✅            | Clear      | Logout admin     |
| GET    | `/api/user/profile` | ✅            | -          | Get user profile |
| POST   | `/api/blogs`        | ✅            | -          | Create blog      |
| PUT    | `/api/blogs/:slug`  | ✅            | -          | Update blog      |
| DELETE | `/api/blogs/:slug`  | ✅            | -          | Delete blog      |
| GET    | `/api/statistic`    | ✅            | -          | Get statistics   |

**Auth Required**: Endpoint memerlukan cookie `token` yang valid

## Changes Made (2025-11-04)

### Fixed Files

1. **`app/pages/login.vue`**

   - ❌ Removed: Manual token storage to `accessToken` cookie
   - ✅ Added: Automatic cookie handling by backend
   - ✅ Added: Proper error handling with user feedback

2. **`app/components/logout-component.vue`**

   - ✅ Added: `handleLogout()` method to call `/api/user/logout`
   - ✅ Added: Props for dynamic username/email display
   - ✅ Added: Click handler on logout button

3. **`app/middleware/auth.ts`**

   - ✅ Already correct: Uses cookie-based auth check
   - ✅ No changes needed

4. **`app/plugins/api.js`**
   - ✅ Already correct: Has `withCredentials: true`
   - ✅ No changes needed

### Migration Notes

**Before:**

```javascript
// WRONG - Manual cookie management
const token = response.data.accessToken;
const authToken = useCookie("accessToken");
authToken.value = token;
```

**After:**

```javascript
// CORRECT - Let backend handle cookies
const response = await this.$api.post("/api/user/login", {
  name,
  password,
});
// Cookie sudah di-set otomatis oleh backend!
await navigateTo("/admin");
```

## Conclusion

Sistem autentikasi ini menggunakan **industry-standard cookie-based JWT** yang:

- ✅ Lebih aman dari localStorage
- ✅ Otomatis handled oleh browser
- ✅ Supports refresh token (jika backend implement)
- ✅ Works seamlessly dengan SSR/SSG Nuxt

**Key Takeaway**: Frontend tidak perlu tahu tentang token management. Browser dan backend yang handle semuanya!
