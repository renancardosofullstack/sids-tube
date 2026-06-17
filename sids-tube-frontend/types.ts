export type Role = 'Usuário' | 'GESTOR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface VideoStats {
  views: number;
  likes: number;
  comments: number;
}

export interface VideoStats {
  visualizacoes: number;
  curtidas: number;
  comentarios: number;
}

export interface Video {
  id: string;
  titulo: string;
  urlVideo: string;
  descricao: string;
  categoria: string;
  dataEnvio: number;       
  urlThumbnail?: string;
  stats?: VideoStats;
}


export interface Comment {
  id: string;
  videoId: string;
  userId: string;
  author: string;
  content: string;
  timestamp: number;
}
