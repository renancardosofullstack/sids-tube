export type Role = 'USUARIO' | 'GESTOR' | 'USUARIO' | 'GESTOR';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
}

export interface DadosUsuario {
    id: number;
    nome: string;
    email: string;
    role: "USUARIO" | "GESTOR";
}

export type UserData = DadosUsuario;
