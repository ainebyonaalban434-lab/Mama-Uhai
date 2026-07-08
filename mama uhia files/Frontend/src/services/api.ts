import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (name: string, email: string, password: string, role: string) =>
    api.post('/auth/register', { name, email, password, role }),
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  googleLogin: (token: string) =>
    api.post('/auth/google-login', { token }),
}

export const healthService = {
  getRecords: () => api.get('/health/records'),
  addRecord: (data: any) => api.post('/health/records', data),
  updateRecord: (id: string, data: any) => api.put(`/health/records/${id}`, data),
  deleteRecord: (id: string) => api.delete(`/health/records/${id}`),
}

export const adminService = {
  getUsers: () => api.get('/admin/users'),
  getUserStats: () => api.get('/admin/stats'),
  getUserDetails: (id: string) => api.get(`/admin/users/${id}`),
  updateUser: (id: string, data: any) => api.put(`/admin/users/${id}`, data),
}

export default api
