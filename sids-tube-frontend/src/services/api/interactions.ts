import api from "@/services/api/api";

export interface ComentarioRequestDto {
    usuarioId: number;
    texto: string;
}

export interface ComentarioResponseDto {
    id: number;
    videoId: number;
    videoTitulo: string;
    usuarioId: number;
    usuarioNome: string;
    texto: string;
    publico: boolean;
    criadoEm: string;
}

export interface ComentarioRequestDto {
    usuarioId: number;
    texto: string;
}

export interface ComentarioResponseDto {
    id: number;
    videoId: number;
    videoTitulo: string;
    usuarioId: number;
    usuarioNome: string;
    texto: string;
    publico: boolean;
    criadoEm: string;
}

interface CurtidaResponseDto {
    id: number;
    usuarioId: number;
    videoId: number;
    dataCurtida: string;
}

export const interactionService = {

    async getHistory(usuarioId: number): Promise<string[]> {
        const response = await api.get(`/visualizacoes/${usuarioId}`);
        return response.data.map((h: any) => h.videoId.toString());
    },

    async addView(usuarioId: number, videoId: string): Promise<boolean> {
        try {
            const videoIdNumber = parseInt(videoId, 10);
            const url = `/visualizacoes/${usuarioId}/${videoIdNumber}`; 
            await api.post(url, {});
            return true;
        } catch (error: any) {
            return false;
        }
    },

    async getLikedVideos(userId: number) {
        const resp = await api.get(`/curtidas/usuario/${userId}`);
        return resp.data;
    },

    async toggleLike(usuarioId: number, videoId: string) {
        await api.post("/curtidas", {
            usuarioId,
            videoId: parseInt(videoId)
        });
        return true;
    },

    async listarPublicos(videoId: number): Promise<ComentarioResponseDto[]> {
        const { data } = await api.get<ComentarioResponseDto[]>(`/comentarios/videos/${videoId}`);
        return data;
    },

    async addComment(videoId: number, dto: ComentarioRequestDto): Promise<ComentarioResponseDto> {
        const { data } = await api.post<ComentarioResponseDto>(`/comentarios/videos/${videoId}`, dto);
        return data;
    },

    async getCommentPendente(): Promise<ComentarioResponseDto[]> {
        const { data } = await api.get<ComentarioResponseDto[]>("/comentarios/pendentes");
        return data;
    },

    async commentAprovado(comentarioId: number): Promise<void> {
        await api.patch(`/comentarios/${comentarioId}/aprovar`);
    },

    async deleteComment(comentarioId: number): Promise<void> {
        await api.delete(`/comentarios/${comentarioId}`);
    },

    async getLikedVideosFull(userId: number) {
        const { data: likedIds } = await api.get(`/curtidas/usuario/${userId}`);
        if (!likedIds || likedIds.length === 0) return [];

        const { data: allVideos } = await api.get("/videos");
        const filtered = allVideos.filter((v: any) => likedIds.includes(v.id));

        return filtered.map((v: any) => ({
            id: String(v.id),
            title: v.titulo,
            description: v.descricao,
            category: v.categoria,
            url: v.urlVideo,
            thumbnail: v.urlThumbnail,
            createdAt: new Date(v.dataEnvio).getTime(),
            original: v
        }));
    }
};