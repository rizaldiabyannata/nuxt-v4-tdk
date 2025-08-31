import { defineEventHandler, readBody, setCookie } from 'h3'
import axios from 'axios'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, password } = body

  if (!name || !password) {
    return { success: false, error: 'Name and password are required' }
  }

  const config = useRuntimeConfig();

  const baseURL = config.public.apiBaseUrl;

  try {
    // Replace with your actual backend login API URL
    const response = await axios.post(`${baseURL}/user/login/`, { name, password })
    const token = response.data.token
    if (token) {
      setCookie(event, 'auth_token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
    }
    return { success: true, token }
  } catch (error) {
    return { success: false, error: error.message }
  }
})
