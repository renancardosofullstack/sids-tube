export const Role = {
  ADMIN: "ADMIN",
  GESTOR: "GESTOR",
  USUARIO: "USUARIO",
  admin: "ADMIN",
  gestor: "GESTOR",
  usuario: "USUARIO",
} as const;

export type Role = (typeof Role)[keyof typeof Role] | "admin" | "gestor" | "usuario";

export const AppView = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  CATALOGO: "CATALOGO",
  DASHBOARD: "DASHBOARD",
  UPLOAD: "UPLOAD",
  login: "LOGIN",
  register: "REGISTER",
  catalogo: "CATALOGO",
  dashboard: "DASHBOARD",
  upload: "UPLOAD",
} as const;

export type AppView = (typeof AppView)[keyof typeof AppView];

export const CATEGORIES = [
  "Desenvolvimento Web",
  "Frontend",
  "Backend",
  "DevOps",
  "HTML/CSS",
  "Segurança",
  "Outros",
] as const;

export type Category = (typeof CATEGORIES)[number];
export type UserRole = Role;

export type User = {
  id?: string | number;
  name?: string;
  nome?: string;
  email?: string;
  role?: Role;
  perfil?: Role;
};

export type AuthUser = User;

export type LoginData = {
  email: string;
  password?: string;
  senha?: string;
  role?: Role;
};

export type Video = {
  id: string | number;
  titulo?: string;
  title?: string;
  descricao?: string;
  description?: string;
  categoria?: string;
  category?: string;
  urlVideo?: string;
  url?: string;
  urlThumbnail?: string;
  thumbnail?: string;
  dataEnvio?: string | number;
  createdAt?: string | number;
};

export type VideoType = Video;
