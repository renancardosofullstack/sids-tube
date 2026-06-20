export const Role = {
  ADMIN: "admin",
  GESTOR: "gestor",
  USUARIO: "usuario",
  USER: "usuario",
  Admin: "admin",
  Gestor: "gestor",
  Usuario: "usuario",
  User: "usuario",
  admin: "admin",
  gestor: "gestor",
  usuario: "usuario",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export const AppView = {
  LOGIN: "login",
  REGISTER: "register",
  HOME: "home",
  DASHBOARD: "dashboard",
  VIDEOS: "videos",
  AUTH: "auth",
  Login: "login",
  Register: "register",
  Home: "home",
  Dashboard: "dashboard",
  Videos: "videos",
  Auth: "auth",
  login: "login",
  register: "register",
  home: "home",
  dashboard: "dashboard",
  videos: "videos",
  auth: "auth",
} as const;

export type AppView = (typeof AppView)[keyof typeof AppView];

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
  titulo: string;
  descricao?: string;
  categoria?: string;
  urlVideo?: string;
  urlThumbnail?: string;
  dataEnvio?: string;
};

export type VideoType = Video;

export const CATEGORIES = [
  "Aulas",
  "Treinamentos",
  "Tutoriais",
  "Podcast",
  "Institucional",
  "Tecnologia",
  "Outros",
] as const;

export type Category = (typeof CATEGORIES)[number];
