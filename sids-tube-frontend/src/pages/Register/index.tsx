import React from "react";
import { AuthPage } from "../../components/AuthPage";
import { AppView } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const { register } = useAuth(); 
    const navigate = useNavigate();

    return (
        <AuthPage
            view={AppView.REGISTER}
            onNavigate={(view) => {
                if (view === AppView.LOGIN) {
                    navigate("/login");
                }
            }}
            onLogin={async () => {
            }}
            onRegister={async (name, email, password) => {
                await register(name, email, password);
                navigate("/catalogo"); 
            }}
        />
    );
};

export default Register;