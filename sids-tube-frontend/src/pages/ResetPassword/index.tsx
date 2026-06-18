import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import api from "../../services/api/api";
import * as styles from "./styles";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");

  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  if (!token) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <p className={styles.errorMessage}>
            Token inválido ou ausente.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (senha !== confirmacao) {
      setErro("As senhas não conferem");
      return;
    }

    try {
      setLoading(true);
      setErro(null);

      await api.post("/auth/resetar-senha", {
        token,
        novaSenha: senha,
      });

      setMensagem("Senha alterada com sucesso! Redirecionando para o login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setErro("Token inválido ou expirado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.headerTitle}>Redefinir Senha</h2>

        {mensagem && (
          <div className={styles.successMessage}>
            {mensagem}
          </div>
        )}

        {erro && (
          <div className={styles.errorMessage}>
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="password"
            placeholder="Nova senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            minLength={6}
            className={styles.input}
          />

          <input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmacao}
            onChange={(e) => setConfirmacao(e.target.value)}
            required
            minLength={6}
            className={styles.input}
          />

          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? "Salvando..." : "Redefinir senha"}
          </button>
        </form>
      </div>
    </div>
  );
}
