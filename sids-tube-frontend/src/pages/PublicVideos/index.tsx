import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, PlayCircle, LogIn } from "lucide-react";

import api from "../../services/api/api";

interface VideoType {
  id: number;
  titulo: string;
  descricao?: string;
  categoria?: string;
  urlThumbnail?: string;
  urlVideo?: string;
  dataEnvio?: string;
}

export default function PublicVideosPage() {
  const navigate = useNavigate();

  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/videos")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setVideos(data);
      })
      .catch((error) => {
        console.error("Erro ao carregar vídeos públicos:", error);
        setVideos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleBlockedAction = () => {
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-slate-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-6 rounded-3xl border border-emerald-700/40 bg-white/10 p-6 shadow-2xl backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-700 text-4xl shadow-xl">
              🦥
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Vitrine pública
              </p>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Sid&apos;s Tube
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-emerald-100 sm:text-base">
                Assista uma prévia dos conteúdos disponíveis. Para interagir,
                comentar, curtir ou acessar a área completa, faça login.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-bold text-emerald-950 shadow-lg transition hover:bg-emerald-400"
          >
            <LogIn size={18} />
            Entrar
          </button>
        </header>

        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-emerald-100">Carregando vídeos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-3xl border border-emerald-700/40 bg-white/10 p-8 text-center">
            <div>
              <p className="text-5xl">🦥</p>
              <h2 className="mt-4 text-2xl font-black">Nenhum vídeo publicado ainda</h2>
              <p className="mt-2 text-emerald-100">
                Quando houver vídeos cadastrados, eles aparecerão aqui.
              </p>
            </div>
          </div>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {videos.map((video) => (
              <article
                key={video.id}
                className="overflow-hidden rounded-3xl border border-emerald-700/40 bg-white/10 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
              >
                <button
                  type="button"
                  onClick={handleBlockedAction}
                  className="group relative block aspect-video w-full overflow-hidden bg-emerald-950 text-left"
                >
                  {video.urlThumbnail ? (
                    <img
                      src={video.urlThumbnail}
                      alt={video.titulo}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-emerald-900">
                      <PlayCircle size={52} className="text-emerald-300" />
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition group-hover:opacity-100">
                    <div className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 font-bold text-emerald-950 shadow-lg">
                      <Lock size={16} />
                      Entrar para assistir
                    </div>
                  </div>
                </button>

                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-200">
                      {video.categoria || "Sem categoria"}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-emerald-200">
                      <Lock size={13} />
                      Login obrigatório
                    </span>
                  </div>

                  <h2 className="line-clamp-2 text-xl font-black text-white">
                    {video.titulo}
                  </h2>

                  <p className="line-clamp-3 text-sm leading-relaxed text-emerald-100">
                    {video.descricao || "Vídeo disponível no Sid's Tube."}
                  </p>

                  <button
                    type="button"
                    onClick={handleBlockedAction}
                    className="mt-3 w-full rounded-2xl border border-emerald-500/40 bg-emerald-950/70 px-4 py-3 font-bold text-emerald-100 transition hover:bg-emerald-700 hover:text-white"
                  >
                    Fazer login para interagir
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </section>
    </main>
  );
}