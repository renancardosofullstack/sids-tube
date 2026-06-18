import React, { useState, useMemo, useEffect } from "react";
import api from "../../services/api/api";
import * as styles from "./styles";
import {
  BarChart3,
  Eye,
  ThumbsUp,
  MessageSquare,
  Search,
  TrendingUp,
  Calendar,
  Tag,
  ArrowUpDown,
} from "lucide-react";

type SortField = "title" | "views" | "likes" | "comments" | "createdAt";
type SortOrder = "asc" | "desc";

const Dashboard: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("views");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  useEffect(() => {
    async function loadVideos() {
      try {
        const [videosResponse, likesResponse] = await Promise.all([
          api.get("/videos"),
          api.get("/curtidas").catch(() => ({ data: [] })),
        ]);

        const videosData = videosResponse.data;
        const allLikes = Array.isArray(likesResponse.data) ? likesResponse.data : [];

        const likesByVideo: { [key: number]: number } = {};
        allLikes.forEach((like: any) => {
          const videoId = like.videoId || like.video_id || like.video?.id;
          if (videoId) likesByVideo[videoId] = (likesByVideo[videoId] || 0) + 1;
        });

        const statsPromises = videosData.map(async (v: any) => {
          const [commentsResult, viewsResult] = await Promise.all([
            api.get(`/comentarios/videos/${v.id}`).catch(() => ({ data: [] })),
            api.get(`/visualizacoes/video/${v.id}`).catch(() => ({ data: [] })),
          ]);

          const commentsCount = Array.isArray(commentsResult.data)
            ? commentsResult.data.length
            : 0;

          let viewsCount = 0;
          if (Array.isArray(viewsResult.data)) viewsCount = viewsResult.data.length;
          else if (typeof viewsResult.data === "number") viewsCount = viewsResult.data;

          return {
            ...v,
            curtidas: likesByVideo[v.id] || 0,
            visualizacoes: viewsCount,
            comentarios: commentsCount,
          };
        });

        const videosWithStats = await Promise.all(statsPromises);

        const normalized = videosWithStats.map((v: any) => ({
          id: String(v.id),
          title: v.titulo,
          description: v.descricao,
          category: v.categoria,
          url: v.urlVideo,
          thumbnail: v.urlThumbnail,
          createdAt: new Date(v.dataEnvio).getTime(),
          stats: {
            views: v.visualizacoes || 0,
            likes: v.curtidas || 0,
            comments: v.comentarios || 0,
          },
        }));

        setVideos(normalized);
      } catch (err) {
        console.error("Erro ao carregar vídeos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);

  const stats = useMemo(() => {
    if (!videos || videos.length === 0) {
      return { views: 0, likes: 0, comments: 0, totalVideos: 0 };
    }

    return videos.reduce(
      (acc, video) => ({
        views: acc.views + (video.stats?.views || 0),
        likes: acc.likes + (video.stats?.likes || 0),
        comments: acc.comments + (video.stats?.comments || 0),
        totalVideos: acc.totalVideos + 1,
      }),
      { views: 0, likes: 0, comments: 0, totalVideos: 0 }
    );
  }, [videos]);

  const filteredAndSortedVideos = useMemo(() => {
    const filtered = videos.filter(
      (video) =>
        (video.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (video.category?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case "title":
          aValue = a.title?.toLowerCase() || "";
          bValue = b.title?.toLowerCase() || "";
          break;
        case "views":
          aValue = a.stats?.views || 0;
          bValue = b.stats?.views || 0;
          break;
        case "likes":
          aValue = a.stats?.likes || 0;
          bValue = b.stats?.likes || 0;
          break;
        case "comments":
          aValue = a.stats?.comments || 0;
          bValue = b.stats?.comments || 0;
          break;
        case "createdAt":
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
      }

      if (sortOrder === "asc") return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    });

    return filtered;
  }, [videos, searchTerm, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loadingCard}>
          <div className="text-5xl">🦥</div>
          <div>
            <p className="text-emerald-950 font-bold text-lg">Carregando dashboard...</p>
            <p className="text-emerald-700 text-sm">O Sid está calculando as estatísticas.</p>
          </div>
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
              <h1 className={styles.heroTitle}>Dashboard de Estatísticas</h1>
              <p className={styles.heroSubtitle}>
                Acompanhe visualizações, curtidas e comentários dos seus vídeos.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCardBlue}>
            <div className="flex items-center justify-between mb-2">
              <div className={styles.statIconWrapperBlue}>
                <Eye size={14} />
              </div>
              <TrendingUp className={styles.statTrendIconBlue} size={12} />
            </div>
            <p className={styles.statLabelBlue}>Visualizações</p>
            <h3 className={styles.statValueBlue}>{stats.views.toLocaleString()}</h3>
          </div>

          <div className={styles.statCardRed}>
            <div className="flex items-center justify-between mb-2">
              <div className={styles.statIconWrapperRed}>
                <ThumbsUp size={14} />
              </div>
              <TrendingUp className={styles.statTrendIconRed} size={12} />
            </div>
            <p className={styles.statLabelRed}>Curtidas</p>
            <h3 className={styles.statValueRed}>{stats.likes.toLocaleString()}</h3>
          </div>

          <div className={styles.statCardGreen}>
            <div className="flex items-center justify-between mb-2">
              <div className={styles.statIconWrapperGreen}>
                <MessageSquare size={14} />
              </div>
              <TrendingUp className={styles.statTrendIconGreen} size={12} />
            </div>
            <p className={styles.statLabelGreen}>Comentários</p>
            <h3 className={styles.statValueGreen}>{stats.comments.toLocaleString()}</h3>
          </div>

          <div className={styles.statCardPurple}>
            <div className="flex items-center justify-between mb-2">
              <div className={styles.statIconWrapperPurple}>
                <BarChart3 size={14} />
              </div>
              <TrendingUp className={styles.statTrendIconPurple} size={12} />
            </div>
            <p className={styles.statLabelPurple}>Vídeos</p>
            <h3 className={styles.statValuePurple}>{stats.totalVideos}</h3>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderContent}>
              <h3 className={styles.tableTitle}>Estatísticas por Vídeo</h3>
              <div className={styles.searchWrapper}>
                <Search className={styles.searchIcon} size={16} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar..."
                  className={styles.searchInput}
                />
              </div>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th onClick={() => handleSort("title")} className={styles.thBase}>
                    <div className={styles.thContent}>
                      Título
                      <ArrowUpDown size={10} />
                    </div>
                  </th>
                  <th className={styles.thLeftHiddenMd}>Categoria</th>
                  <th onClick={() => handleSort("views")} className={styles.thCenter}>
                    <div className={styles.thContentCenter}>
                      <Eye size={10} />
                      <span className={styles.hiddenSm}>Views</span>
                      <ArrowUpDown size={10} />
                    </div>
                  </th>
                  <th onClick={() => handleSort("likes")} className={styles.thCenter}>
                    <div className={styles.thContentCenter}>
                      <ThumbsUp size={10} />
                      <span className={styles.hiddenSm}>Likes</span>
                      <ArrowUpDown size={10} />
                    </div>
                  </th>
                  <th onClick={() => handleSort("comments")} className={styles.thCenterHiddenSm}>
                    <div className={styles.thContentCenter}>
                      <MessageSquare size={10} />
                      <span className="hidden lg:inline">Coment.</span>
                      <ArrowUpDown size={10} />
                    </div>
                  </th>
                  <th onClick={() => handleSort("createdAt")} className={styles.thLeftHiddenLg}>
                    <div className={styles.thContent}>
                      <Calendar size={10} />
                      Data
                      <ArrowUpDown size={10} />
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className={styles.tbody}>
                {filteredAndSortedVideos.length === 0 ? (
                  <tr>
                    <td colSpan={6} className={styles.emptyRow}>
                      <Search size={32} className={styles.emptyIcon} />
                      <p className={styles.emptyTitle}>Nenhum vídeo encontrado</p>
                      <p className={styles.emptySubtitle}>Tente ajustar sua busca</p>
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedVideos.map((video) => (
                    <tr key={video.id} className={styles.tableRow}>
                      <td className={styles.tdBase}>
                        <div className={styles.videoTitle}>{video.title}</div>
                        <div className={styles.videoDescription}>{video.description}</div>
                      </td>
                      <td className={styles.tdHiddenMd}>
                        <span className={styles.categoryBadge}>
                          <Tag size={8} />
                          <span className={styles.categoryText}>{video.category}</span>
                        </span>
                      </td>
                      <td className={styles.tdCenter}>
                        <span className={styles.statBadgeBlue}>
                          <Eye size={12} />
                          {(video.stats?.views || 0).toLocaleString()}
                        </span>
                      </td>
                      <td className={styles.tdCenter}>
                        <span className={styles.statBadgeRed}>
                          <ThumbsUp size={12} />
                          {(video.stats?.likes || 0).toLocaleString()}
                        </span>
                      </td>
                      <td className={styles.tdCenterHiddenSm}>
                        <span className={styles.statBadgeGreen}>
                          <MessageSquare size={12} />
                          {(video.stats?.comments || 0).toLocaleString()}
                        </span>
                      </td>
                      <td className={styles.tdLeftHiddenLg}>
                        {formatDate(video.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;