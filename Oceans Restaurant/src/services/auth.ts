// src/services/auth.service.ts
import { fetchData } from '../utils/fetchData';

export const authService = {
  async login(credentials: { email: string; password: string }) {
    const response = await fetchData<{
      token: string;
      user: { id: string; email: string };
    }>('/auth/login', {
      method: 'POST',
      body: credentials
    });
    return response.data;
  },

  async register(userData: {
    username: string;
    email: string;
    password: string;
    rol?: string;
  }) {
    const response = await fetchData<{
      token: string;
      user: { id: string; email: string };
    }>('/auth/register', {
      method: 'POST',
      body: userData
    });
    return response.data;
  },

  async verifyToken() {
    try {
      const response = await fetchData<{
        isValid: boolean;
        user?: { id: string; email: string };
      }>('/auth/verify', {
        method: 'POST'
      });

      console.log(222222222, response.data);
      return response.data;
    } catch (error) {
      console.error('Token verification failed:', error);
      return { isValid: false, user: undefined };
    }
  },

  async logout() {
    try {
      await fetchData('/auth/logout', { method: 'POST' });
    } finally {
      localStorage.removeItem('authToken');
    }
  }
};