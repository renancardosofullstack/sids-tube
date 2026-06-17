import { AuthProvider } from "./src/contexts/AuthContext";
import AppRoutes from "./src/routes";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}