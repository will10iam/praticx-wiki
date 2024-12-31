import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import './Login.css'


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, [auth, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("")
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
            navigate("/");
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    setError("Usuário não encontrado. Verifique o email.");
                    break;
                case "auth/wrong-password":
                    setError("Senha incorreta. Tente novamente.");
                    break;
                default:
                    setError("Erro ao fazer login. Tente novamente.");
            }
            console.error("Erro no login", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar"}
                </button>
            </form>
            <p>
                Não tem uma conta? <a href="/registro">Registre-se aqui</a>
            </p>
        </div>
    );
}
export default Login;
