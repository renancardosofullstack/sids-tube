import React, { useEffect, useState } from "react";
import { ArrowLeft, Heart, Calendar } from "lucide-react";
import { Video } from "../../../types";
import * as styles from "./styles";
import { useAuth } from "../../contexts/AuthContext";
import ComentarioForm from "../ComentarioForm";
import ComentarioList from "../ComentarioList";
import {
  ComentarioResponseDto,
  interactionService,
} from "../../services/api/interactions";

interface VideoDetailProps {
  video: Video;
  onBack: () => void;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
}

const VideoDetail: React.FC<VideoDetailProps> = ({
  video,
  onBack,
  isLiked,
  onToggleLike,
}) => {
  const { user } = useAuth();

  const [comentarios, setComentarios] = useState<ComentarioResponseDto[]>([]);
  const [carregandoComentarios, setCarregandoComentarios] = useState(true);
  const [likeCount, setLikeCount] = useState<number>(video.curtidas ?? 0);

  const userRole = localStorage.getItem("userRole");
  const isGestor = userRole === "GESTOR";

  const carregarComentarios = async () => {
    setCarregandoComentarios(true);

    try {
      const publicos = await interactionService.listarPublicos(
        Number(video.id)
      );

      let listaFinal = publicos;

      if (isGestor) {
        const pendentes = await interactionService.getCommentPendente();

        const pendentesDesteVideo = pendentes.filter(
          (c) => Number(c.videoId) === Number(video.id)
        );

        const idsPublicos = new Set(publicos.map((p) => p.id));
        const novosPendentes = pendentesDesteVideo.filter(
          (p) => !idsPublicos.has(p.id)
        );

        listaFinal = [...publicos, ...novosPendentes];
      }

      setComentarios(listaFinal);
    } catch (error) {
      console.error("[ERRO] Falha ao carregar comentários:", error);
    } finally {
      setCarregandoComentarios(false);
    }
  };

  useEffect(() => {
    carregarComentarios();

    if (user?.id) {
      interactionService.addView(Number(user.id), video.id);
    }
  }, [video.id, user?.id]);

  useEffect(() => {
    setLikeCount(video.curtidas ?? 0);
  }, [video.id, video.curtidas]);

  const getEmbedUrl = (url?: string) => {
    if (!url) return null;

    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    return match
      ? `https://www.youtube.com/embed/${match[1]}`
      : null;
  };

  const embedUrl = getEmbedUrl(video.urlVideo);

  return (
    <div className={styles.container}>
      <button onClick={onBack} className={styles.backButton}>
        <ArrowLeft size={20} />
        Voltar
      </button>

      <div className={styles.grid}>
        <div className={styles.mainContent}>
          <div className={styles.videoPlayerWrapper}>
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={video.titulo}
                className={styles.iframe}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className={styles.externalVideoWrapper}>
                <p>Este vídeo não pode ser incorporado.</p>
                <a
                  href={video.urlVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir no YouTube
                </a>
              </div>
            )}
          </div>

          <h1 className={styles.videoTitle}>{video.titulo}</h1>

          <div className={styles.videoMetaContainer}>
            <div className={styles.videoMetaLeft}>
              <span className={styles.dateWrapper}>
                <Calendar size={16} />
                {new Date(video.dataEnvio).toLocaleDateString("pt-BR")}
              </span>

              <span className={styles.categoryBadge}>
                {video.categoria}
              </span>
            </div>

            <button
              onClick={() => {
                onToggleLike(video.id);
                setLikeCount((prev) =>
                  isLiked ? prev - 1 : prev + 1
                );
              }}
              className={styles.getLikeButtonClass(isLiked)}
            >
              <Heart
                size={20}
                fill={isLiked ? "currentColor" : "none"}
              />
              <span>
                {likeCount}{" "}
                {likeCount === 1 ? "Curtir" : "Curtidas"}
              </span>
            </button>
          </div>

          <div className={styles.descriptionContainer}>
            <p className={styles.descriptionText}>
              {video.descricao}
            </p>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.commentsWrapper}>
            <div className={styles.commentsHeader}>
              <h3 className={styles.commentsTitle}>
                Comentários
                <span className={styles.commentsCount}>
                  ({comentarios.length})
                </span>
              </h3>
            </div>

            <div className={styles.commentsList}>
              <ComentarioList
                comentarios={comentarios}
                carregando={carregandoComentarios}
              />
            </div>

            {user && (
              <div className={styles.commentFormWrapper}>
                <ComentarioForm
                  videoId={Number(video.id)}
                  usuarioId={Number(user.id)}
                  onComentarioAdicionado={carregarComentarios}
                />
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default VideoDetail;
