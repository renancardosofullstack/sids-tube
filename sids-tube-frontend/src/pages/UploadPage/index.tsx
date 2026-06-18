import { useNavigate } from "react-router-dom";
import videoService from "../../services/api/videos";
import VideoForm from "../../components/VideoForm";

export default function UploadPage() {
  const navigate = useNavigate();

  const handleSubmit = async (dto: any) => {
    try {
      await videoService.criar(dto);

      if (dto.notificacaoHabilitada) {
        alert("Vídeo cadastrado com sucesso! Os usuários serão notificados por e-mail.");
      } else {
        alert("Vídeo cadastrado com sucesso!");
      }

      navigate("/catalogo");
    } catch (error) {
      console.error("Erro ao cadastrar vídeo:", error);
      alert("Ocorreu um erro ao tentar salvar o vídeo. Tente novamente.");
    }
  };

  const handleCancel = () => {
    navigate("/catalogo");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-slate-950 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-emerald-700/30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(6,78,59,0.72), rgba(2,44,34,0.82)), url('https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1600&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="relative z-10 px-8 py-8 flex items-center gap-5">
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-700 shadow-xl flex items-center justify-center text-5xl border border-white/20">
              🦥
            </div>

            <div>
              <p className="text-emerald-100 text-sm font-semibold uppercase tracking-[0.2em]">
                Sid&apos;s Tube
              </p>

              <h1 className="text-4xl font-black text-white tracking-tight mt-1">
                Enviar Vídeo
              </h1>

              <p className="text-emerald-50 mt-2 max-w-2xl">
                Cadastre um novo vídeo e mantenha o catálogo sempre atualizado.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50/95 border border-emerald-200 rounded-3xl shadow-2xl p-6">
          <VideoForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
      </div>
    </div>
  );
}