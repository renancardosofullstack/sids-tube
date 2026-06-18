import React, { useMemo, useState } from "react";
import { Calendar, Play, Search, Tag, Trash2 } from "lucide-react";

import { CATEGORIES, Video } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { DeleteConfirmModal } from "../ConfirmaDelete";
import * as styles from "./styles";

interface VideoListProps {
  videos?: Video[];
  onDeleteVideo?: (id: string | number) => void | Promise<void>;
  onVideoClick?: (video: Video) => void;
  title?: string;
  emptyMessage?: string;
}

export const VideoList: React.FC<VideoListProps> = ({
  videos = [],
  onDeleteVideo = async () => {},
  onVideoClick,
  title = "Catálogo de Vídeos",
  emptyMessage = "Nenhum vídeo encontrado.",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<Video | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isGestor } = useAuth();

  const filteredVideos = useMemo(() => {
    const safeVideos = Array.isArray(videos) ? videos : [];
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return safeVideos.filter((video) => {
      const videoTitle = getVideoTitle(video).toLowerCase();
      const description = getVideoDescription(video).toLowerCase();
      const category = getVideoCategory(video);

      const matchesSearch =
        !normalizedSearch ||
        videoTitle.includes(normalizedSearch) ||
        description.includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "Todos" || category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [videos, searchTerm, selectedCategory]);

  const handleVideoClick = (video: Video) => {
    if (onVideoClick) {
      onVideoClick(video);
      return;
    }

    const url = getVideoUrl(video);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleDeleteClick = (video: Video) => {
    setVideoToDelete(video);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!videoToDelete) return;

    setIsDeleting(true);
    try {
      await onDeleteVideo(videoToDelete.id);
      setDeleteModalOpen(false);
      setVideoToDelete(null);
    } catch (err) {
      console.error("Erro ao excluir vídeo:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.forestHero}>
        <div className={styles.forestOverlay} />
        <div className={styles.forestContent}>
          <span className={styles.forestBadge}>Operação Trazer o Sid para Casa</span>
          <h1 className={styles.forestTitle}>Sid's Tube</h1>
          <p className={styles.forestSubtitle}>
            Aprenda tecnologia em um catálogo organizado, acessível e com a calma estratégica de uma preguiça.
          </p>
        </div>
      </section>

      <section className={styles.panel}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.filtersContainer}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar por título ou descrição..."
              className={styles.searchInput}
            />
          </div>

          <div>
            <p className={styles.categoryLabel}>Filtrar por Categoria</p>
            <div className={styles.categoryList}>
              <button
                type="button"
                onClick={() => setSelectedCategory("Todos")}
                className={styles.getCategoryButtonClass(
                  selectedCategory === "Todos"
                )}
              >
                Todos
              </button>

              {CATEGORIES.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={styles.getCategoryButtonClass(
                    selectedCategory === category
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredVideos.length === 0 ? (
          <div className={styles.emptyStateContainer}>
            <div className={styles.emptyStateIconWrapper}>
              <Search className={styles.emptyStateIcon} size={24} />
            </div>
            <h3 className={styles.emptyStateTitle}>{emptyMessage}</h3>
            <p className={styles.emptyStateText}>Tente ajustar seus filtros.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredVideos.map((video) => (
              <article
                key={video.id}
                className={styles.card}
                onClick={() => handleVideoClick(video)}
              >
                <div className={styles.thumbnailWrapper}>
                  {getVideoThumbnail(video) ? (
                    <img
                      src={getVideoThumbnail(video)!}
                      alt={getVideoTitle(video)}
                      className={styles.thumbnailImage}
                    />
                  ) : null}
                  <div className={styles.thumbnailOverlay} />
                  <Play size={48} className={styles.playIcon} />
                  <span className={styles.durationBadge}>Vídeo</span>
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <span className={styles.categoryBadge}>
                      <Tag size={12} />
                      {getVideoCategory(video)}
                    </span>
                  </div>

                  <h3 className={styles.cardTitle}>{getVideoTitle(video)}</h3>
                  <p className={styles.cardDescription}>
                    {getVideoDescription(video)}
                  </p>

                  <div className={styles.cardFooter}>
                    <div className={styles.dateWrapper}>
                      <Calendar size={14} />
                      {formatDate(getVideoDate(video))}
                    </div>

                    {isGestor && (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDeleteClick(video);
                        }}
                        className={styles.deleteButton}
                        title="Excluir vídeo"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        videoTitle={getVideoTitle(videoToDelete)}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setVideoToDelete(null);
        }}
        isLoading={isDeleting}
      />
    </div>
  );
};

function getVideoUrl(video?: Video | null) {
  return video?.urlVideo || video?.url || "";
}

function getVideoTitle(video?: Video | null) {
  return video?.titulo || video?.title || "Vídeo sem título";
}

function getVideoDescription(video?: Video | null) {
  return video?.descricao || video?.description || "Conteúdo selecionado para sua evolução.";
}

function getVideoCategory(video?: Video | null) {
  return video?.categoria || video?.category || "Outros";
}

function getVideoDate(video?: Video | null) {
  return video?.dataEnvio || video?.createdAt || Date.now();
}

function formatDate(dateValue: string | number) {
  const date = typeof dateValue === "number" ? new Date(dateValue) : new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Data indisponível";
  }

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getVideoThumbnail(video: Video) {
  if (video.urlThumbnail || video.thumbnail) {
    return video.urlThumbnail || video.thumbnail || null;
  }

  const url = getVideoUrl(video);
  if (!url) return null;

  const match = url.match(
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  );

  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
  }

  return null;
}

export default VideoList;
