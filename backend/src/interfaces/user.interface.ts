export interface User {
  id: number;
  user_name: string;
  email: string;
  rol: string;
  active: 0 | 1;
}

export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
  rol?: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}