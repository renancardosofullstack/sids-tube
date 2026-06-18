import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VideoDetail from "../../components/VideoDetail";
import { Video } from "../../types";
import api from "../../services/api/api";
import { interactionService } from "../../services/api/interactions";
import { useAuth } from "../../contexts/AuthContext";
import * as styles from "./styles";

const VideoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    async function loadVideo() {
      try {
        setLoading(true);

        const [videosResponse, likesResponse] = await Promise.all([
          api.get("/videos"),
          api.get("/curtidas").catch(() => ({ data: [] })),
        ]);

        const videosData = Array.isArray(videosResponse.data)
          ? videosResponse.data
          : [];

        const videoData = videosData.find((v: any) => String(v.id) === String(id));

        if (!videoData) {
          setVideo(null);
          return;
        }

        const allLikes = Array.isArray(likesResponse.data)
          ? likesResponse.data
          : [];

        const videoLikesCount = allLikes.filter((like: any) => {
          const likeVideoId = like.videoId || like.video_id || like.video?.id;
          return String(likeVideoId) === String(id);
        }).length;

        const normalized: Video = {
          id: String(videoData.id),

          titulo: videoData.titulo,
          descricao: videoData.descricao,
          categoria: videoData.categoria,
          urlVideo: videoData.urlVideo,
          urlThumbnail: videoData.urlThumbnail,
          dataEnvio: new Date(videoData.dataEnvio).getTime(),
          curtidas: videoLikesCount,

          title: videoData.titulo,
          description: videoData.descricao,
          category: videoData.categoria,
          url: videoData.urlVideo,
          thumbnail: videoData.urlThumbnail,
          createdAt: new Date(videoData.dataEnvio).getTime(),
        };

        setVideo(normalized);

        if (user?.id) {
          const { data: likedIds } = await api
            .get(`/curtidas/usuario/${user.id}`)
            .catch(() => ({ data: [] }));

          const likedList = Array.isArray(likedIds) ? likedIds : [];

          setIsLiked(
            likedList.some((likedId: any) => String(likedId) === String(id))
          );
        }
      } catch (err) {
        console.error("Erro ao carregar vídeo:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadVideo();
    }
  }, [id, user?.id]);

  const handleBack = () => {
    navigate("/catalogo");
  };

  const handleToggleLike = async (videoId: string) => {
    if (!user?.id) return;

    await interactionService.toggleLike(Number(user.id), videoId);
    setIsLiked((prev) => !prev);
  };

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loadingCard}>
          <div className="text-5xl">🦥</div>
          <div>
            <p className="text-emerald-950 font-bold text-lg">
              Carregando vídeo...
            </p>
            <p className="text-emerald-700 text-sm">
              O Sid está preparando a reprodução.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundCard}>
          <div className={styles.notFoundMascot}>🦥</div>

          <h1 className={styles.notFoundTitle}>
            Vídeo não encontrado
          </h1>

          <p className={styles.notFoundText}>
            O Sid procurou no catálogo, mas não encontrou esse vídeo.
          </p>

          <button
            type="button"
            onClick={() => navigate("/catalogo")}
            className={styles.backToCatalogButton}
          >
            Voltar para o catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <div className={styles.heroMascot}>🦥</div>

            <div>
              <p className={styles.heroKicker}>Sid&apos;s Tube</p>

              <h1 className={styles.heroTitle}>
                Assistir Vídeo
              </h1>

              <p className={styles.heroSubtitle}>
                Reproduza, curta e acompanhe os comentários deste conteúdo.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.contentCard}>
          <VideoDetail
            video={video}
            onBack={handleBack}
            isLiked={isLiked}
            onToggleLike={handleToggleLike}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage;