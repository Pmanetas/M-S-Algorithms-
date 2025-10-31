import axios, { AxiosResponse } from 'axios';
import { LoginRequest, LoginResponse, UserInfo } from './types';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // Important for session cookies
});

export class AuthService {
  static async login(username: string, password: string): Promise<LoginResponse> {
    const request: LoginRequest = { username, password };
    const response: AxiosResponse<LoginResponse> = await api.post('/login', request);
    return response.data;
  }

  static async logout(): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await api.post('/logout');
    return response.data;
  }

  static async checkAuth(): Promise<UserInfo> {
    const response: AxiosResponse<UserInfo> = await api.get('/auth');
    return response.data;
  }

  static async health(): Promise<{ status: string; service: string }> {
    const response = await api.get('/health');
    return response.data;
  }
}

export default AuthService; 