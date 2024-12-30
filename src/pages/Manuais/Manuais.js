import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import './Manuais.css';


const Manuais = () => {
    const [manuais, setManuais] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchManuais = async () => {

            try {
                const manuaisCollection = collection(db, "manuals");
                const snapshot = await getDocs(manuaisCollection);
                const manuaisList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setManuais(manuaisList);
                setLoading(false);
            } catch (error) {
                alert("Erro ao carregar os manuais, verificar console")
                console.log("Erro ao carregar os manuais", error);
            }
        }
        fetchManuais();
    }, []);

    if (loading) {
        return <div>Carregando manuais...</div>
    }

    return (
        <div className="manuais">
            <h1>Manuais</h1>
            <div className="manuais-grid">
                {manuais.map((manual) => (
                    <div key={manual.id} className="manual-card">
                        <h2>{manual.titulo}</h2>
                        <p>{manual.descricao}</p>
                        <p><strong>Categoria:</strong> {manual.categoria}</p>
                        <Link to={`/manual/${manual.id}`}>
                            <button>Visualizar Manual</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )


};
export default Manuais;
