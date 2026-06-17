import { createContext, useContext, useState, type ReactNode } from "react";

type Role = "gestor" | "usuario" | "admin";

type User = {
  name?: string;
  email?: string;
  role?: Role;
  [key: string]: unknown;
};

type AuthContextData = {
  user: User | null;
  usuario: User | null;
  role: Role;
  isAuthenticated: boolean;
  isGestor: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (...args: unknown[]) => void;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsGestor: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

function getInitialUser(): User {
  try {
    const savedUser = localStorage.getItem("sidsTubeUser");

    if (savedUser) {
      return JSON.parse(savedUser);
    }
  } catch {
    localStorage.removeItem("sidsTubeUser");
  }

  return {
    name: "Gestor",
    role: "gestor",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getInitialUser);

  const role: Role = user?.role || "gestor";

  const login = (...args: unknown[]) => {
    const firstArg = args[0];

    const nextUser: User =
      typeof firstArg === "object" && firstArg !== null
        ? { ...(firstArg as User), role: (firstArg as User).role || "gestor" }
        : {
            name: "Gestor",
            role: "gestor",
          };

    setUser(nextUser);
    localStorage.setItem("sidsTubeUser", JSON.stringify(nextUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sidsTubeUser");
  };

  const setIsGestor = (value: boolean) => {
    const nextUser: User = {
      ...(user || {}),
      name: user?.name || "Usuário",
      role: value ? "gestor" : "usuario",
    };

    setUser(nextUser);
    localStorage.setItem("sidsTubeUser", JSON.stringify(nextUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        usuario: user,
        role,
        isAuthenticated: !!user,
        isGestor: role === "gestor" || role === "admin",
        isAdmin: role === "admin",
        loading: false,
        login,
        logout,
        setUser,
        setIsGestor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}