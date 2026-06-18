export interface VideoStats {
    views: number;
    likes: number;
    comments: number;
    visualizacoes?: number;
    curtidas?: number;
    comentarios?: number;
}

export interface Video {
    url: string;
    title: string;
    category: string;
    createdAt: number;
    description: string;
    id: string;
    titulo: string;
    descricao: string;
    categoria: string;
    urlVideo: string;
    urlThumbnail?: string;
    dataEnvio: number;

    curtidas?: number; 
}


export interface Comment {
    id: string;
    videoId: string;
    userId: string;
    author: string;
    content: string;
    timestamp: number;
    avatar?: string;
}

export interface CriarVideoDTO {
    titulo: string;
    descricao: string;
    categoria: string;
    urlVideo: string;
    urlThumbnail?: string;
    notificacaoHabilitada?: boolean;
}

export const CATEGORIES = [
    "Desenvolvimento Web",
  "Frontend",
  "Backend",
  "DevOps",
  "HTLML/CSS",
  "Segurança",
  "Outros",
];
