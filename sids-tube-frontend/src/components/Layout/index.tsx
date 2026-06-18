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
  X,
} from "lucide-react";
import { useState } from "react";

import * as styles from "./styles";
import { useAuth } from "../../contexts/AuthContext";

export const Layout = () => {
  const { isGestor, isUsuario, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const displayName = user?.nome ?? user?.name ?? user?.email ?? "Usuário";
  const roleLabel = isGestor ? "Portal do Gestor" : "Área do Usuário";

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const menuItemClass = (active: boolean) =>
    active
      ? "flex items-center gap-3 rounded-xl px-4 py-3 text-white bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 shadow-lg font-semibold transition-all"
      : "flex items-center gap-3 rounded-xl px-4 py-3 text-emerald-100 hover:bg-emerald-900/60 hover:text-white transition-all font-medium";

  return (
    <div className={`${styles.container} bg-gradient-to-br from-emerald-950 via-green-900 to-slate-950`}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 left-4 z-50 h-10 w-10 rounded-xl bg-emerald-950 text-emerald-50 border border-emerald-700/60 shadow-lg flex items-center justify-center lg:hidden"
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

      <aside
        className={`${styles.getSidebarClass(
          isMenuOpen
        )} bg-gradient-to-b from-emerald-950 via-green-950 to-slate-950 border-r border-emerald-800/60`}
      >
        <div className="p-6 border-b border-emerald-800/60">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-700 shadow-xl flex items-center justify-center text-3xl border border-white/10">
              🦥
            </div>

            <div>
              <h1 className="text-xl font-black text-white tracking-tight">
                Sid&apos;s Tube
              </h1>
              <p className="text-sm text-emerald-200 leading-snug">
                {roleLabel} — {displayName}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2" aria-label="Menu principal">
          <Link
            to="/catalogo"
            className={menuItemClass(isActive("/catalogo"))}
            onClick={handleLinkClick}
          >
            <LayoutDashboard size={20} />
            <span>Catálogo</span>
          </Link>

          {isUsuario && (
            <>
              <Link
                to="/historico"
                className={menuItemClass(isActive("/historico"))}
                onClick={handleLinkClick}
              >
                <Clock size={20} />
                <span>Histórico</span>
              </Link>

              <Link
                to="/curtidas"
                className={menuItemClass(isActive("/curtidas"))}
                onClick={handleLinkClick}
              >
                <Heart size={20} />
                <span>Curtidos</span>
              </Link>
            </>
          )}

          {isGestor && (
            <div className="pt-4">
              <p className="px-4 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
                Gestão
              </p>

              <div className="space-y-2">
                <Link
                  to="/dashboard"
                  className={menuItemClass(isActive("/dashboard"))}
                  onClick={handleLinkClick}
                >
                  <BarChart3 size={20} />
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/upload"
                  className={menuItemClass(isActive("/upload"))}
                  onClick={handleLinkClick}
                >
                  <Upload size={20} />
                  <span>Enviar Vídeo</span>
                </Link>

                <Link
                  to="/comentarios/pendentes"
                  className={menuItemClass(isActive("/comentarios/pendentes"))}
                  onClick={handleLinkClick}
                >
                  <MessageSquare size={20} />
                  <span>Comentários Pendentes</span>
                </Link>

                <Link
                  to="/relatorios"
                  className={menuItemClass(isActive("/relatorios"))}
                  onClick={handleLinkClick}
                >
                  <FileText size={20} />
                  <span>Relatórios</span>
                </Link>
              </div>
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-emerald-800/60">
          <button
            onClick={() => {
              logout();
              navigate("/login");
              setIsMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-emerald-100 hover:bg-red-500/15 hover:text-red-200 transition-all font-semibold"
          >
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      <main id="main-content" className={styles.main} role="main">
        <div className={styles.contentWrapper}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};