export interface User {
  id: number;
  user_name: string;
  email: string;
  rol: string;
  active: 0 | 1; // Representación numérica del estado
}

export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
  rol?: string; // Opcional (se asignará un valor por defecto si no se proporciona)
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}