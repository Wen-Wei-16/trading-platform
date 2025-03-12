import api from './api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface TwoFactorData {
  token: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  isTwoFactorEnabled: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

class AuthService {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  }

  async register(data: RegisterData): Promise<{ message: string; userId: string }> {
    const response = await api.post<{ message: string; userId: string }>('/auth/register', data);
    return response.data;
  }

  async enableTwoFactor(): Promise<{ secret: string; token: string }> {
    const response = await api.post<{ secret: string; token: string }>('/auth/2fa/enable');
    return response.data;
  }

  async disableTwoFactor(data: TwoFactorData): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/2fa/disable', data);
    return response.data;
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/change-password', {
      oldPassword,
      newPassword
    });
    return response.data;
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

export default new AuthService(); 