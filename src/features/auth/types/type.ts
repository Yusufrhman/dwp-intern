export type UserRole = "customer" | "admin";

export interface User {
  id: number;
  phone: string;
  password: string;
  name: string;
  role: UserRole;
}

export type AuthErrors = {
  phone?: string;
  password?: string;
};