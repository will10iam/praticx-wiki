import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Erro ao realizar o logout:", error)
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;