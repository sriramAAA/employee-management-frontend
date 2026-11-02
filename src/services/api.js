
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://login-registration-backend-1-7qag.onrender.com/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

export async function registerUser(userData) {
  const response = await api.post('/register', userData)
  return response.data
}

export async function loginUser(credentials) {
  const response = await api.post('/login', credentials)
  return response.data
}

export function getApiErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data

    if (typeof data === 'string' && data.trim()) {
      return data
    }

    if (data && typeof data === 'object') {
      const message = data.message || data.detail || data.error

      if (typeof message === 'string' && message.trim()) {
        return message
      }

      if (Array.isArray(data.errors) && data.errors.length > 0) {
        return data.errors
          .map((item) => typeof item === 'string' ? item : item.defaultMessage || item.message)
          .filter(Boolean)
          .join(' ')
      }
    }

    if (error.code === 'ECONNABORTED') {
      return 'The server took too long to respond. Please try again.'
    }

    if (!error.response) {
      return 'Unable to reach the server. Check that the backend is running and try again.'
    }
  }

  return 'Something went wrong. Please try again.'
}
