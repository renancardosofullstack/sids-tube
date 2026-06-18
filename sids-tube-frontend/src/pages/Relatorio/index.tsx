import { useEffect, useState } from "react";
import api from "../../services/api/api";
import { FileText, Search, Download, Video, Tag, Calendar } from "lucide-react";
import * as styles from "./styles";

interface VideoType {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  urlVideo: string;
  urlThumbnail: string;
  dataEnvio: string;
}

export default function Relatorio() {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<number[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [carregandoVideos, setCarregandoVideos] = useState(true);

  useEffect(() => {
    async function carregarVideos() {
      try {
        setCarregandoVideos(true);
        const res = await api.get("/videos");
        setVideos(res.data);
      } catch (err) {
        console.error("Erro ao buscar vídeos", err);
      } finally {
        setCarregandoVideos(false);
      }
    }

    carregarVideos();
  }, []);

  const toggleVideo = (id: number) => {
    setSelectedVideos((prev) =>
      prev.includes(id)
        ? prev.filter((v) => v !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedVideos.length === videos.length) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos(videos.map((v) => v.id));
    }
  };

  const filteredVideos = videos.filter((video) =>
    video.titulo.toLowerCase().includes(filter.toLowerCase())
  );

  const getYoutubeThumbnail = (url: string | undefined): string | null => {
    if (!url) return null;

    try {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      if (match && match[2].length === 11) {
        return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
      }
    } catch (e) {
      return null;
    }

    return null;
  };

  const gerarRelatorio = async () => {
    if (selectedVideos.length === 0) return;

    setLoading(true);

    try {
      const response = await api.get("/relatorios/engajamento", {
        params: { videoIds: selectedVideos },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "relatorio_engajamento.xlsx");

      document.body.appendChild(link);
      link.click();
      link.remove();

      alert("Relatório gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      alert("Erro ao gerar relatório");
    } finally {
      setLoading(false);
    }
  };

  if (carregandoVideos) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingCard}>
          <div className="text-5xl">🦥</div>
          <div>
            <p className="text-emerald-950 font-bold text-lg">
              Carregando relatórios...
            </p>
            <p className="text-emerald-700 text-sm">
              O Sid está buscando os vídeos disponíveis.
            </p>
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

              <h1 className={styles.heroTitle}>
                Relatórios
              </h1>

              <p className={styles.heroSubtitle}>
                Selecione vídeos e gere relatórios de engajamento em formato Excel.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.contentCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.header}>
                <FileText size={20} className={styles.headerIcon} />
                Relatórios de Engajamento
              </h2>

              <p className={styles.headerSubtitle}>
                Escolha os vídeos que devem entrar no relatório.
              </p>
            </div>

            {selectedVideos.length > 0 && (
              <div className={styles.selectedBadge}>
                {selectedVideos.length} selecionado
                {selectedVideos.length > 1 ? "s" : ""}
              </div>
            )}
          </div>

          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={18} />

            <input
              type="text"
              placeholder="Buscar por título..."
              className={styles.searchInput}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          <div className={styles.checkboxContainer}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={videos.length > 0 && selectedVideos.length === videos.length}
                onChange={toggleAll}
              />

              <span>Selecionar todos os vídeos</span>

              {selectedVideos.length > 0 && (
                <span className={styles.selectionCount}>
                  {selectedVideos.length} selecionado
                  {selectedVideos.length > 1 ? "s" : ""}
                </span>
              )}
            </label>
          </div>

          <div className={styles.videoGrid}>
            {filteredVideos.map((video) => (
              <label
                key={video.id}
                className={`${styles.videoCard} ${
                  selectedVideos.includes(video.id)
                    ? styles.videoCardSelected
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={selectedVideos.includes(video.id)}
                  onChange={() => toggleVideo(video.id)}
                />

                <img
                  src={
                    getYoutubeThumbnail(video.urlVideo) ||
                    video.urlThumbnail ||
                    "https://via.placeholder.com/112x80?text=Video"
                  }
                  alt={video.titulo}
                  className={styles.videoThumbnail}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/112x80?text=Video";
                  }}
                />

                <div className={styles.videoInfo}>
                  <p className={styles.videoTitle}>
                    {video.titulo}
                  </p>

                  <span className={styles.videoCategory}>
                    <Tag size={10} />
                    {video.categoria}
                  </span>

                  <p className={styles.videoDate}>
                    <Calendar size={10} className="inline mr-1" />
                    Enviado em{" "}
                    {new Date(video.dataEnvio).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </label>
            ))}

            {filteredVideos.length === 0 && (
              <div className={styles.emptyState}>
                <Video size={48} className={styles.emptyIcon} />
                <p className={styles.emptyTitle}>Nenhum vídeo encontrado</p>
                <p className={styles.emptySubtitle}>
                  Tente ajustar o filtro de busca.
                </p>
              </div>
            )}
          </div>

          <button
            onClick={gerarRelatorio}
            disabled={selectedVideos.length === 0 || loading}
            className={styles.button}
          >
            <Download size={18} />
            {loading ? "Gerando..." : "Gerar Relatório"}
          </button>
        </div>
      </div>
    </div>
  );
}