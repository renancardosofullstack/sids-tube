import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VideoList } from "../../components/VideoList";
import { Video } from "../../types";
import api from "../../services/api/api";

const Catalogo: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadVideos() {
      try {
        const { data } = await api.get("/videos");

        const normalized = data.map((v: any) => ({
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
        console.error("Erro ao carregar vídeos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);

  const handleVideoClick = (video: Video) => {
    navigate(`/videos/${video.id}`);
  };

  const handleDeleteVideo = async (id: string) => {
    try {
      await api.delete(`/videos/${id}`);
      setVideos((currentVideos) => currentVideos.filter((v) => v.id !== id));
    } catch (err) {
      console.error("Erro ao excluir vídeo:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-slate-950 flex items-center justify-center">
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl shadow-2xl px-8 py-6 flex items-center gap-4">
          <div className="text-5xl">🦥</div>
          <div>
            <p className="text-emerald-950 font-bold text-lg">
              Carregando catálogo...
            </p>
            <p className="text-emerald-700 text-sm">
              O Sid está procurando seus vídeos.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl mb-3 shadow-2xl border border-emerald-700/30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(6,78,59,0.72), rgba(2,44,34,0.82)), url('https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1600&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="relative z-10 px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 shadow-xl flex items-center justify-center text-5xl border border-white/20">
                🦥
              </div>

              <div>
                <p className="text-emerald-100 text-sm font-semibold uppercase tracking-[0.2em]">
                  Sid&apos;s Tube
                </p>

                <h1 className="text-4xl font-black text-white tracking-tight mt-1">
                  Catálogo de Vídeos
                </h1>

                <p className="text-emerald-50 mt-2 max-w-2xl">
                  Organize, descubra e acompanhe seus vídeos favoritos em um só lugar.
                </p>
              </div>
            </div>

            <div className="bg-emerald-50/95 border border-emerald-200 rounded-2xl px-5 py-4 shadow-xl text-center">
              <p className="text-3xl font-black text-emerald-950">
                {videos.length}
              </p>
              <p className="text-emerald-700 text-sm font-semibold">
                vídeos no catálogo
              </p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50/95 border border-emerald-200 rounded-3xl shadow-2xl px-6 pb-6 pt-2">
          <VideoList
            videos={videos}
            onDeleteVideo={handleDeleteVideo}
            onVideoClick={handleVideoClick}
            title="Catálogo de Vídeos"
          />
        </div>
      </div>
    </div>
  );
};

export default Catalogo;