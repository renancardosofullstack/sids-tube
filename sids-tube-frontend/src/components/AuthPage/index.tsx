import React, { useState } from 'react';
import { AppView, Role } from '../../types';
import { Mail, Lock, User, CheckCircle, Eye, EyeOff } from 'lucide-react';
import * as styles from './styles';
import { useNavigate } from 'react-router-dom';

interface AuthPageProps {
    view: AppView.LOGIN | AppView.REGISTER;
    onNavigate: (view: AppView) => void;
    onLogin: (email: string, password: string) => void;
    onRegister: (name: string, email: string, password: string, role: Role) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ view, onLogin, onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [role] = useState<Role>('USUARIO');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isLogin = view === AppView.LOGIN;
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                await onLogin(email, password);
            } else {
                await onRegister(name, email, password, role);
            }
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${styles.container} bg-gradient-to-br from-emerald-950 via-green-900 to-slate-950`}>
            <div className={styles.contentWrapper}>
                <div className="relative overflow-hidden rounded-3xl mb-8 shadow-2xl border border-emerald-700/30">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(6,78,59,0.68), rgba(2,44,34,0.76)), url('https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1600&auto=format&fit=crop')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    <div className="relative z-10 px-8 py-12 flex flex-col items-center text-center backdrop-blur-[2px]">
                        <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 shadow-xl flex items-center justify-center text-5xl border border-white/20 mb-5">
                            🦥
                        </div>

                        <h1 className="text-5xl font-black text-white tracking-tight">
                            Sid&apos;s Tube
                        </h1>

                        <p className="text-emerald-50 mt-4 max-w-md text-base">
                            Organize, descubra e acompanhe seus vídeos favoritos.
                        </p>
                    </div>
                </div>

                <div className="bg-emerald-50/95 border border-emerald-200 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="px-8 pt-8 text-center">
                        <h2 className="text-3xl font-bold text-emerald-950">
                            {isLogin ? 'Entrar na conta' : 'Criar conta'}
                        </h2>

                        <p className="text-emerald-700 mt-2">
                            {isLogin
                                ? 'Acesse sua conta para continuar.'
                                : 'Crie sua conta para começar.'}
                        </p>
                    </div>

                    {error && (
                        <div className="px-8 pt-4">
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {!isLogin && (
                            <div className={styles.inputGroup}>
                                <label className="block text-sm font-semibold text-emerald-950 mb-2">
                                    Nome Completo
                                </label>
                                <div className={styles.inputWrapper}>
                                    <User className="text-emerald-700" size={18} />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={styles.input}
                                        placeholder="Digite seu nome completo"
                                    />
                                </div>
                            </div>
                        )}

                        <div className={styles.inputGroup}>
                            <label className="block text-sm font-semibold text-emerald-950 mb-2">
                                E-mail
                            </label>
                            <div className={styles.inputWrapper}>
                                <Mail className="text-emerald-700" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.input}
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className="block text-sm font-semibold text-emerald-950 mb-2">
                                Senha
                            </label>
                            <div className={styles.inputWrapper}>
                                <Lock className="text-emerald-700" size={18} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`${styles.input} pr-12`}
                                    placeholder={!isLogin ? 'Mínimo 6 caracteres' : '••••••••'}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 text-emerald-700 hover:text-emerald-950 transition"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {!isLogin && (
                                <small className="text-emerald-700 text-sm">
                                    A senha deve ter no mínimo 6 caracteres
                                </small>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 text-white font-bold py-3 px-4 rounded-xl hover:from-emerald-700 hover:via-green-700 hover:to-teal-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            {loading ? 'Processando...' : isLogin ? 'Acessar' : 'Criar conta'}
                            {!loading && <CheckCircle size={18} />}
                        </button>
                    </form>

                    <div className="px-8 pb-8 text-center">
                        <p className="text-emerald-800">
                            {isLogin ? 'Ainda não tem conta? ' : 'Já tem uma conta? '}
                            <button
                                type="button"
                                onClick={() => navigate(isLogin ? '/register' : '/login')}
                                className="font-bold text-emerald-950 hover:text-green-700 transition"
                            >
                                {isLogin ? 'Cadastre-se' : 'Faça Login'}
                            </button>
                        </p>

                        {isLogin && (
                            <p className="text-emerald-800 mt-3">
                                Esqueceu sua senha?{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate('/forgot-password')}
                                    className="font-bold text-emerald-950 hover:text-green-700 transition"
                                >
                                    Redefinir senha
                                </button>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};