import { useEffect, useState } from "react";
import api from "../../services/api/api";
import { PlayCircle } from "lucide-react";

interface VideoType {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  urlVideo: string;
  urlThumbnail: string | null;
  dataEnvio: string;
}

function getYoutubeThumbnail(url: string) {
  if (!url) return "";

  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
  const match = url.match(regex);

  if (!match || !match[1]) return "";

  return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
}

export default function PublicHome() {
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
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-slate-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-10">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">
              Portal de vídeos
            </p>

            <h1 className="text-4xl font-black tracking-tight md:text-6xl">
              Sid&apos;s Tube
            </h1>

            <p className="mt-4 max-w-2xl text-base text-emerald-100 md:text-lg">
              Assista aos vídeos disponíveis na vitrine pública ou entre na sua
              conta para acessar a experiência completa.
            </p>
          </div>

          <a
            href="/login"
            className="rounded-2xl bg-emerald-400 px-6 py-3 text-center font-bold text-slate-950 shadow-lg shadow-emerald-950/40 transition hover:bg-emerald-300"
          >
            Entrar
          </a>
        </header>

        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-lg text-emerald-100">Carregando vídeos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="rounded-3xl border border-emerald-400/20 bg-white/10 p-8 text-center shadow-xl backdrop-blur">
            <p className="text-lg text-emerald-100">
              Nenhum vídeo disponível no momento.
            </p>
          </div>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => {
              const thumbnail =
                video.urlThumbnail || getYoutubeThumbnail(video.urlVideo);

              return (
                <article
                  key={video.id}
                  className="overflow-hidden rounded-3xl border border-emerald-400/20 bg-white/10 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
                >
                  <a href={video.urlVideo} target="_blank" rel="noreferrer">
                    <div className="relative aspect-video bg-slate-900">
                      {thumbnail ? (
                        <img
                          src={thumbnail}
                          alt={video.titulo}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-emerald-950">
                          <PlayCircle className="h-16 w-16 text-emerald-300" />
                        </div>
                      )}

                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition hover:opacity-100">
                        <PlayCircle className="h-16 w-16 text-white" />
                      </div>
                    </div>
                  </a>

                  <div className="p-5">
                    <span className="mb-3 inline-flex rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-200">
                      {video.categoria || "Sem categoria"}
                    </span>

                    <h2 className="line-clamp-2 text-xl font-bold">
                      {video.titulo}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm text-emerald-100">
                      {video.descricao || "Sem descrição."}
                    </p>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </section>
    </main>
  );
}
