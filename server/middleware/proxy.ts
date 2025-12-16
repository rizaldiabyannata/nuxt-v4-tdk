import { defineEventHandler, getRequestHeaders, createError } from 'h3'

export default defineEventHandler(async (event) => {
  // Only run in development mode
  if (process.env.NODE_ENV === 'production') {
    return
  }

  if (event.path.startsWith('/api')) {
    const target = 'http://localhost:5000' + event.path
    const method = event.method
    const headers = getRequestHeaders(event)
    
    // Clean up headers that might cause issues
    delete headers.host
    delete headers.connection
    
    // For body, we pass the incoming request stream directly
    const body = (method !== 'GET' && method !== 'HEAD') ? event.node.req : undefined

    try {
      const response = await fetch(target, {
        method,
        headers,
        body,
        // @ts-ignore - duplex is required for Node.js fetch with stream body
        duplex: 'half' 
      })

      // Create new headers from the response to modify them
      const newHeaders = new Headers(response.headers)
      
      // Fix cookies: Replace SameSite=None with Lax and remove Secure
      // Use getSetCookie() if available (Node 18+) to handle multiple cookies correctly
      const cookies = typeof newHeaders.getSetCookie === 'function' 
        ? newHeaders.getSetCookie() 
        : [newHeaders.get('set-cookie')].filter(Boolean)

      if (cookies.length > 0) {
        newHeaders.delete('set-cookie')
        cookies.forEach(cookie => {
          const fixedCookie = cookie
            .replace(/SameSite=None/gi, 'SameSite=Lax')
            .replace(/Secure;?/gi, '')
          newHeaders.append('set-cookie', fixedCookie)
        })
      }

      // Return the response directly. Nuxt/H3 will handle streaming the body.
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      })
      
    } catch (error) {
      console.error('Proxy Error:', error)
      throw createError({
        statusCode: 502,
        statusMessage: 'Bad Gateway',
        message: error.message
      })
    }
  }
})
