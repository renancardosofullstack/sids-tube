import React, { useEffect, useState } from "react";
import { VideoList } from "../../components/VideoList";
import { useNavigate } from "react-router-dom";
import api from "../../services/api/api";
import { Video } from "../../types";

const HistoryPage: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadHistoryVideos() {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.warn("Nenhum userId encontrado no localStorage");
          setVideos([]);
          return;
        }

        const { data: rawHistory } = await api.get(`/visualizacoes/usuario/${userId}`);

        const historyVideoIds = rawHistory
          .map((h: any) => String(h.video?.id))
          .filter((id: string) => id && id !== 'undefined');

        if (!historyVideoIds || historyVideoIds.length === 0) {
          setVideos([]);
          return;
        }

        const { data: allVideos } = await api.get("/videos");

        const fullVideos = allVideos.filter((v: any) => historyVideoIds.includes(String(v.id)));

        const normalized = fullVideos.map((v: any) => ({
          id: String(v.id),
          title: v.titulo,
          description: v.descricao,
          category: v.categoria,
          url: v.urlVideo,
          thumbnail: v.urlThumbnail,
          createdAt: new Date(v.dataEnvio).getTime(),
          original: v,
        }));

        setVideos(normalized);
      } catch (err) {
        console.error("Erro ao carregar histórico:", err);
      } finally {
        setLoading(false);
      }
    }

    loadHistoryVideos();
  }, []);

  const handleVideoClick = (video: Video) => {
    navigate(`/videos/${video.id}`);
  };

  const handleDeleteVideo = async (id: string) => {
    try {
      await api.delete(`/videos/${id}`);
      setVideos(videos.filter(v => v.id !== id));
    } catch (err) {
      console.error("Erro ao excluir vídeo:", err);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <VideoList
      title="Histórico de Visualização"
      videos={videos}
      onDeleteVideo={handleDeleteVideo}
      onVideoClick={handleVideoClick}
      emptyMessage="Você ainda não assistiu a nenhum vídeo."
    />
  );
};

export default HistoryPage;
