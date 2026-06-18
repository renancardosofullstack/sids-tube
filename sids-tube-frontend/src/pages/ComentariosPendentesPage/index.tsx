import React, { useEffect, useState } from "react";
import comentarioService, {
  ComentarioResponseDto,
} from "../../services/api/comentarios";
import * as styles from "./styles";

export default function ComentariosPendentesPage() {
  const [comentarios, setComentarios] = useState<ComentarioResponseDto[]>([]);
  const [carregando, setCarregando] = useState(true);

  const carregarPendentes = async () => {
    try {
      setCarregando(true);
      const data = await comentarioService.listarPendentes();
      setComentarios(data);
    } catch (error) {
      console.error("Erro ao carregar comentários pendentes:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPendentes();
  }, []);

  const handleAprovar = async (id: number) => {
    await comentarioService.aprovar(id);
    setComentarios((prev) => prev.filter((c) => c.id !== id));
  };

  const handleDeletar = async (id: number) => {
    if (!confirm("Deseja realmente rejeitar este comentário?")) return;

    await comentarioService.deletar(id);
    setComentarios((prev) => prev.filter((c) => c.id !== id));
  };

  if (carregando) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loadingCard}>
            <div className="text-5xl">🦥</div>
            <div>
              <h1 className={styles.title}>Comentários Pendentes</h1>
              <p className="text-emerald-700">Carregando comentários...</p>
            </div>
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
                Comentários Pendentes
              </h1>
              <p className={styles.heroSubtitle}>
                Revise, aprove ou rejeite comentários enviados pelos usuários.
              </p>
            </div>
          </div>
        </div>

        {comentarios.length === 0 ? (
          <div className={styles.empty}>
            <div className="text-5xl mb-3">🦥</div>
            <p>Nenhum comentário pendente de aprovação.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {comentarios.map((comentario) => (
              <div key={comentario.id} className={styles.card}>
                <div className={styles.cardContent}>
                  <div className={styles.header}>
                    <div className={styles.avatar}>
                      {comentario.usuarioNome.charAt(0).toUpperCase()}
                    </div>

                    <div className={styles.userInfo}>
                      <span className={styles.userName}>
                        {comentario.usuarioNome}
                      </span>
                      <span className={styles.date}>
                        {new Date(comentario.criadoEm).toLocaleString("pt-BR")}
                      </span>
                    </div>
                  </div>

                  <div className={styles.videoInfo}>
                    Vídeo:{" "}
                    <span className={styles.videoTitle}>
                      {comentario.videoTitulo}
                    </span>
                  </div>

                  <p className={styles.text}>{comentario.texto}</p>
                </div>

                <div className={styles.actions}>
                  <button
                    className={styles.approveButton}
                    onClick={() => handleAprovar(comentario.id)}
                  >
                    Aprovar
                  </button>

                  <button
                    className={styles.rejectButton}
                    onClick={() => handleDeletar(comentario.id)}
                  >
                    Rejeitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}