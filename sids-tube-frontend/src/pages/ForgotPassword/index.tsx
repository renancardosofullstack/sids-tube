import React, { useState } from "react";
import api from "../../services/api/api";
import * as styles from "./styles";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      await api.post("/auth/recuperar-senha", { email });
      setSuccess(
        "Se o e-mail existir, você receberá um link para redefinir sua senha."
      );
    } catch {
      setError("Erro ao solicitar recuperação de senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Recuperar senha</h2>
          <p className={styles.headerSubtitle}>
            Informe seu e-mail para receber o link
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {success && <div className={styles.successMessage}>{success}</div>}
          {error && <div className={styles.errorMessage}>{error}</div>}

          <input
            type="email"
            placeholder="Digite seu e-mail"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? "Enviando..." : "Enviar link"}
          </button>
        </form>

        <div className={styles.footer}>
          <a href="/login" className={styles.linkButton}>
            Voltar para login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
