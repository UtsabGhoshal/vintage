export interface User {
  id: string;
  username: string;
  email: string;
  role: "collaborator" | "guest";
  createdAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: "collaborator" | "guest";
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface JWTPayload {
  userId: string;
  role: string;
}
