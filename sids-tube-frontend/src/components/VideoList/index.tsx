import React, { useState, useMemo } from 'react';
import { Video, CATEGORIES } from '../../types';
import { Search, Trash2, Calendar, Tag, Play, Sparkles } from 'lucide-react';
import * as styles from './styles';
import { useAuth } from '../../contexts/AuthContext';
import { DeleteConfirmModal } from '../ConfirmaDelete';
import { SidMascot } from '../SidMascot';

interface VideoListProps {
    videos: Video[];
    onDeleteVideo: (id: string) => void;
    onVideoClick: (video: Video) => void;
    title?: string;
    emptyMessage?: string;
}

export const VideoList: React.FC<VideoListProps> = ({
    videos,
    onDeleteVideo,
    onVideoClick,
    title = "Catálogo de videos",
    emptyMessage = "Nenhum vídeo encontrado."
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [videoToDelete, setVideoToDelete] = useState<Video | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { isGestor } = useAuth();

    const filteredVideos = useMemo(() => {
        return videos.filter(video => {
            const title = video.titulo || video.title || '';
            const description = video.descricao || video.description || '';
            const category = video.categoria || video.category || '';
            const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'Todos' || category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [videos, searchTerm, selectedCategory]);

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const getYoutubeThumbnail = (url: string | undefined): string | null => {
        if (!url) return null;
        try {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            if (match && match[2].length === 11) {
                return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
            }
        } catch (e) {
            return null;
        }
        return null;
    };

    const getVideoUrl = (video: Video) => video.urlVideo || video.url;
    const getVideoTitle = (video: Video) => video.titulo || video.title || '';
    const getVideoDescription = (video: Video) => video.descricao || video.description || '';
    const getVideoCategory = (video: Video) => video.categoria || video.category || '';
    const getVideoDate = (video: Video) => video.dataEnvio || video.createdAt || 0;

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

    const handleCancelDelete = () => {
        setDeleteModalOpen(false);
        setVideoToDelete(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <div>
                    <div className={styles.eyebrow}>
                        <Sparkles size={16} />
                        Operação Trazer o Sid para Casa
                    </div>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.subtitle}>
                        Escolha um vídeo, dê o play e siga evoluindo sem pressa, mas sem parar.
                    </p>
                </div>
                <SidMascot
                    size="lg"
                    message="Eu separei os melhores vídeos para você."
                    className="hidden md:flex"
                />
            </div>

            <div className={styles.filtersContainer}>

                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={20} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por título ou descrição..."
                        className={styles.searchInput}
                    />
                </div>

                <div>
                    <p className={styles.categoryLabel}>Filtrar por Categoria</p>
                    <div className={styles.categoryList}>
                        <button
                            onClick={() => setSelectedCategory('Todos')}
                            className={styles.getCategoryButtonClass(selectedCategory === 'Todos')}
                        >
                            Todos
                        </button>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={styles.getCategoryButtonClass(selectedCategory === cat)}
                            >
                                {cat}
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
                    {filteredVideos.map(video => (
                        <div
                            key={video.id}
                            className={styles.card}
                            onClick={() => onVideoClick(video)}
                        >
                            <div className={styles.thumbnailWrapper}>
                                {getYoutubeThumbnail(video.url) ? (
                                    <img
                                        src={getYoutubeThumbnail(video.url)!}
                                        alt={video.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : null}
                                <div className={styles.thumbnailOverlay}></div>
                                <Play size={48} className={styles.playIcon} />
                                <span className={styles.durationBadge}>
                                    Video
                                </span>
                            </div>

                            <div className={styles.cardContent}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.categoryBadge}>
                                        <Tag size={12} />
                                        {video.category}
                                    </span>
                                </div>

                                <h3 className={styles.cardTitle}>
                                    {video.title}
                                </h3>

                                <p className={styles.cardDescription}>
                                    {video.description}
                                </p>

                                <div className={styles.cardFooter}>
                                    <div className={styles.dateWrapper}>
                                        <Calendar size={14} />
                                        {formatDate(video.createdAt)}
                                    </div>
                                    {isGestor && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
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
                        </div>
                    ))}
                </div>
            )}
            <DeleteConfirmModal
                isOpen={deleteModalOpen}
                videoTitle={videoToDelete?.title || ''}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                isLoading={isDeleting}
            />
        </div>
    );
};

export default VideoList;