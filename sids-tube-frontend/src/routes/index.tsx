import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

import Login from "../pages/Login";
import Catalogo from "../pages/Catalogo";
import Curtidas from "../pages/Curtidas";
import Historico from "../pages/Historico";
import UploadPage from "../pages/UploadPage";
import Dashboard from "../pages/Dashboard";
import VideoDetailPage from "../pages/VideoDetailPage";
import ComentariosPendentesPage from "../pages/ComentariosPendentesPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Relatorio from "@/pages/Relatorio";
import Register from "@/pages/Register";

function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <>{children}</>;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/resetar-senha" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Navigate to="/catalogo" />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/curtidas" element={<Curtidas />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/videos/:id" element={<VideoDetailPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/comentarios/pendentes"
            element={<ComentariosPendentesPage />}
          />
          <Route path="/relatorios" element={<Relatorio />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
