import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  LogOut,
  Heart,
  BarChart3,
  Clock,
  MessageSquare,
  FileText,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

import * as styles from "./styles";
import { SidMascot } from "../SidMascot";
import { useAuth } from "../../contexts/AuthContext";

export const Layout = () => {
  const { isGestor, isUsuario, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const displayName =
    user?.nome ?? user?.name ?? user?.email ?? "Usuário";

  const roleLabel = isGestor ? "Portal do Gestor" : "Área do Usuário";

  const isActive = (path: string) =>
    location.pathname.startsWith(path);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={styles.menuButton}
        aria-label="Abrir menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={styles.getSidebarClass(isMenuOpen)}>
        <div className={styles.brandContainer}>
          <SidMascot size="sm" />
          <div>
            <h1 className={styles.brandName}>Sid's Tube</h1>
            <p className={styles.brandSubtitle}>
              {roleLabel} — {displayName}
            </p>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Menu principal">
          <Link
            to="/catalogo"
            className={styles.getButtonClass(isActive("/catalogo"))}
            onClick={handleLinkClick}
          >
            <LayoutDashboard size={20} />
            <span>Catálogo</span>
          </Link>

          {isUsuario && (
            <>
              <Link
                to="/historico"
                className={styles.getButtonClass(isActive("/historico"))}
                onClick={handleLinkClick}
              >
                <Clock size={20} />
                <span>Histórico</span>
              </Link>

              <Link
                to="/curtidas"
                className={styles.getButtonClass(isActive("/curtidas"))}
                onClick={handleLinkClick}
              >
                <Heart size={20} />
                <span>Curtidos</span>
              </Link>
            </>
          )}

          {isGestor && (
            <div className={styles.navSection}>
              <p className={styles.navSectionTitle}>Gestão</p>

              <Link
                to="/dashboard"
                className={styles.getButtonClass(isActive("/dashboard"))}
                onClick={handleLinkClick}
              >
                <BarChart3 size={20} />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/upload"
                className={styles.getButtonClass(isActive("/upload"))}
                onClick={handleLinkClick}
              >
                <Upload size={20} />
                <span>Enviar Vídeo</span>
              </Link>

              <Link
                to="/comentarios/pendentes"
                className={styles.getButtonClass(
                  isActive("/comentarios/pendentes")
                )}
                onClick={handleLinkClick}
              >
                <MessageSquare size={20} />
                <span>Comentários Pendentes</span>
              </Link>

              <Link
                to="/relatorios"
                className={styles.getButtonClass(isActive("/relatorios"))}
                onClick={handleLinkClick}
              >
                <FileText size={20} />
                <span>Relatórios</span>
              </Link>
            </div>
          )}
        </nav>

        <div className={styles.footer}>
          <button
            onClick={() => {
              logout();
              navigate("/login");
              setIsMenuOpen(false);
            }}
            className={styles.logoutButton}
          >
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      <main
        id="main-content"
        className={styles.main}
        role="main"
      >
        <div className={styles.contentWrapper}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
