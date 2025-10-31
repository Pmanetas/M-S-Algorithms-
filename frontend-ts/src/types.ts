export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
}

export interface UserInfo {
  username: string;
  logged_in: boolean;
}

export interface AppState {
  user: UserInfo | null;
  isLoading: boolean;
  error: string | null;
}

export type Route = 'login' | 'dashboard'; 