export interface User {
  id: number;
  username: string;
  email: string;
  customerId?: number;
  roleName?: string;
  role?: string[]; // Added for compatibility
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}