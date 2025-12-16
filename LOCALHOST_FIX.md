# Fix for "Token Not Found" / 401 Error on Localhost

The issue was caused by the backend setting cookies with `SameSite=None; Secure` attributes. This configuration is required for cross-origin requests but fails on `localhost` (HTTP) because `SameSite=None` requires the `Secure` attribute, and the backend was not setting `Secure` (or the browser rejects `Secure` on HTTP).

To fix this without modifying the backend, we implemented a proxy in the Nuxt frontend.

## Changes Made

1.  **Created `server/middleware/proxy.ts`**:
    *   This middleware intercepts requests to `/api` and proxies them to `http://localhost:5000`.
    *   It rewrites the `Set-Cookie` headers from the backend to replace `SameSite=None` with `SameSite=Lax` and removes the `Secure` attribute. This makes the cookies compatible with `localhost` development.

2.  **Updated `nuxt.config.ts`**:
    *   Modified `apiBaseUrl` configuration to be empty (`""`) when in development mode.
    *   This forces `axios` (used in `$api`) to use relative paths (e.g., `/api/staff/...`), which are then handled by the Nuxt proxy middleware.

## How to Test

1.  **Restart the Nuxt development server**.
2.  **Log out** and **Log in** again to receive the corrected cookies.
3.  Try to delete an employee again. It should now work.
