import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthPage } from "../components/AuthPage";
import { Layout } from "../components/Layout";
import { VideoList } from "../components/VideoList";
import { Video } from "../types";

const DEFAULT_VIDEOS: Video[] = [
  {
    id: "react-full-course",
    title: "React Full Course 2022",
    description: "Curso completo de React para aprender componentes, hooks e construção de interfaces modernas.",
    category: "Frontend",
    url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
    createdAt: "2026-06-15",
  },
  {
    id: "node-zero",
    title: "Node.js do zero em uma aula",
    description: "Introdução prática ao backend com Node.js, APIs e lógica para servidores modernos.",
    category: "Backend",
    url: "https://www.youtube.com/watch?v=hHM-hr9q4mo",
    createdAt: "2026-06-15",
  },
  {
    id: "html-css-40-min",
    title: "HTML + CSS em 40 minutos",
    description: "Fundamentos essenciais de HTML e CSS para montar páginas bonitas e responsivas.",
    category: "HTML/CSS",
    url: "https://www.youtube.com/watch?v=Fhy-5CtVkiM",
    createdAt: "2026-06-15",
  },
];

function AppRoutes() {
  const openVideo = (video: Video) => {
    const url = video.urlVideo || video.url;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthPage
              view="LOGIN"
              onNavigate={() => {}}
              onLogin={() => {}}
              onRegister={() => {}}
            />
          }
        />

        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/catalogo" replace />} />
          <Route
            path="catalogo"
            element={
              <VideoList
                videos={DEFAULT_VIDEOS}
                onVideoClick={openVideo}
                onDeleteVideo={() => {}}
              />
            }
          />
          <Route path="*" element={<Navigate to="/catalogo" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/catalogo" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
