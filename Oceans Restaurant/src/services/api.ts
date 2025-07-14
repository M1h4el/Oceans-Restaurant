import { fetchData } from "../utils/fetchData";

export const AuthService = {
  register: async (userData: { username: string; email: string; password: string; rol?: string }) => {
    return fetchData('/api/auth/register', {
      method: 'POST',
      body: userData,
    });
  },

  login: async (credentials: { email: string; password: string }) => {
    return fetchData('/api/auth/login', {
      method: 'POST',
      body: credentials,
    });
  },

  getCurrentUser: async (token: string) => {
    return fetchData('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};