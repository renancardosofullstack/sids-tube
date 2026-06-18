import React, { useEffect, useState } from "react";
import { VideoList } from "../../components/VideoList";
import { useNavigate } from "react-router-dom";
import api from "../../services/api/api";
import { Video } from "../../types";

const LikedPage: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadLikedVideos() {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.warn("Nenhum userId encontrado no localStorage");
          setVideos([]);
          return;
        }

        const { data: likedIds } = await api.get(`/curtidas/usuario/${userId}`);

        if (!likedIds || likedIds.length === 0) {
          setVideos([]);
          return;
        }

        const { data: allVideos } = await api.get("/videos");

        const fullVideos = allVideos.filter((v: any) => likedIds.includes(v.id));

        const normalized = fullVideos.map((v: any) => ({
          id: String(v.id),
          title: v.titulo,
          description: v.descricao,
          category: v.categoria,
          url: v.urlVideo,
          thumbnail: v.urlThumbnail,
          createdAt: new Date(v.dataEnvio).getTime(),
          original: v
        }));

        setVideos(normalized);
      } catch (err) {
        console.error("Erro ao carregar vídeos curtidos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadLikedVideos();
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
      title="Vídeos Curtidos"
      videos={videos}
      onDeleteVideo={handleDeleteVideo}
      onVideoClick={handleVideoClick}
    />
  );
};

export default LikedPage;
