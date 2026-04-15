import axios from 'axios';

// Create axios instance with base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== USER/AUTH OPERATIONS ====================
export const authService = {
  login: (hospitalId, password) =>
    apiClient.post('/auth/login', { hospitalId, password }),
  
  register: (userData) =>
    apiClient.post('/auth/register', userData),
  
  logout: () =>
    apiClient.post('/auth/logout'),
  
  getProfile: () =>
    apiClient.get('/auth/profile'),
  
  updateProfile: (userData) =>
    apiClient.put('/auth/profile', userData),
};

// ==================== DOCTOR OPERATIONS ====================
export const doctorService = {
  getAll: (filters = {}) =>
    apiClient.get('/doctors', { params: filters }),
  
  getById: (id) =>
    apiClient.get(`/doctors/${id}`),
  
  create: (data) =>
    apiClient.post('/doctors', data),
  
  update: (id, data) =>
    apiClient.put(`/doctors/${id}`, data),
  
  delete: (id) =>
    apiClient.delete(`/doctors/${id}`),
  
  search: (query) =>
    apiClient.get('/doctors/search', { params: { q: query } }),
};

// ==================== APPOINTMENT OPERATIONS ====================
export const appointmentService = {
  getAll: (filters = {}) =>
    apiClient.get('/appointments', { params: filters }),
  
  getById: (id) =>
    apiClient.get(`/appointments/${id}`),
  
  create: (data) =>
    apiClient.post('/appointments', data),
  
  update: (id, data) =>
    apiClient.put(`/appointments/${id}`, data),
  
  delete: (id) =>
    apiClient.delete(`/appointments/${id}`),
  
  getAvailableSlots: (doctorId, date) =>
    apiClient.get('/appointments/slots', { params: { doctorId, date } }),
  
  cancel: (id, reason) =>
    apiClient.post(`/appointments/${id}/cancel`, { reason }),
};

// ==================== MEDICAL RECORDS OPERATIONS ====================
export const medicalRecordService = {
  getAll: (filters = {}) =>
    apiClient.get('/medical-records', { params: filters }),
  
  getById: (id) =>
    apiClient.get(`/medical-records/${id}`),
  
  create: (data) =>
    apiClient.post('/medical-records', data),
  
  update: (id, data) =>
    apiClient.put(`/medical-records/${id}`, data),
  
  delete: (id) =>
    apiClient.delete(`/medical-records/${id}`),
  
  uploadFile: (id, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post(`/medical-records/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// ==================== QUEUE OPERATIONS ====================
export const queueService = {
  getQueueStatus: (appointmentId) =>
    apiClient.get(`/queue/${appointmentId}`),
  
  getAllQueues: () =>
    apiClient.get('/queue'),
  
  updatePosition: (appointmentId) =>
    apiClient.post(`/queue/${appointmentId}/checkin`),
};

// ==================== PAYMENT OPERATIONS ====================
export const paymentService = {
  createPaymentIntent: (amount, appointmentId) =>
    apiClient.post('/payments/intent', { amount, appointmentId }),
  
  getPaymentHistory: (filters = {}) =>
    apiClient.get('/payments', { params: filters }),
  
  getPaymentById: (id) =>
    apiClient.get(`/payments/${id}`),
  
  refund: (paymentId, reason) =>
    apiClient.post(`/payments/${paymentId}/refund`, { reason }),
  
  webhook: (data) =>
    apiClient.post('/payments/webhook', data),
};

export default apiClient;
