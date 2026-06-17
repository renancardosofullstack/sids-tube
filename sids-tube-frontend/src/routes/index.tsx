import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthPage } from "../components/AuthPage";
import { Layout } from "../components/Layout";
import { VideoList } from "../components/VideoList";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<VideoList />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;