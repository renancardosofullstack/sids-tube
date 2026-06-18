import api from "./api";

export interface CriarVideoDTO {
    titulo: string;
    descricao: string;
    categoria: string;
    urlVideo: string;
    urlThumbnail?: string;
    notificacaoHabilitada?: boolean;
}

interface VideoApiResponse {
    id: number;
    titulo: string;
    descricao: string;
    categoria: string;
    urlVideo: string;
    urlThumbnail?: string;
    notificacaoHabilitada?: boolean;
    dataEnvio: string;
}

class VideoService {
    async buscarTodos(): Promise<VideoApiResponse[]> {
        const { data } = await api.get<VideoApiResponse[]>("/videos");
        return data;
    }

    async buscarPorId(id: number): Promise<VideoApiResponse> {
        const { data } = await api.get<VideoApiResponse>(`/videos/${id}`);
        return data;
    }

    async criar(dto: CriarVideoDTO): Promise<VideoApiResponse> {
        const { data } = await api.post<VideoApiResponse>("/videos", dto);
        return data;
    }

    async atualizar(id: number, dto: Partial<CriarVideoDTO>): Promise<VideoApiResponse> {
        const { data } = await api.put<VideoApiResponse>(`/videos/${id}`, dto);
        return data;
    }

    async deletar(id: number): Promise<void> {
        await api.delete(`/videos/${id}`);
    }
}

export default new VideoService();
