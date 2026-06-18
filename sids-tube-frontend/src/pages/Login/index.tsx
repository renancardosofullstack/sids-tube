import React from "react";
import { AuthPage } from "../../components/AuthPage";
import { AppView } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const { login, register } = useAuth();
    const navigate = useNavigate();

    return (
        <AuthPage
            view={AppView.LOGIN}
            onNavigate={(view) => {
                if (view === AppView.REGISTER) {
                    navigate("/register");
                }
            }}
            onLogin={async (email, password) => {
                await login(email, password);
                navigate("/catalogo");
            }}
            onRegister={() => {
                throw new Error("Register não usado na tela de login");
            }}
        />
    );
};

export default Login;