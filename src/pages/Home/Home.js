import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { Link } from 'react-router-dom';
import './Home.css';



const Home = () => {
    const [manuals, setManuals] = useState([]);

    useEffect(() => {
        const fetchManuals = async () => {
            try {
                const db = getFirestore();
                const manualsRef = collection(db, "manuals");
                const manualsQuery = query(manualsRef, orderBy("uploadedAt", "desc"));
                const snapshot = await getDocs(manualsQuery);
                const fetchedManuals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setManuals(fetchedManuals);
            } catch (error) {
                console.error("Erro ao buscar manuais:", error);
            }
        };

        fetchManuals();
    }, []);

    return (
        <div className="home">
            <h1>Wiki Suporte Praticx</h1>

            <section className="recent-manuals">
                <h2>Manuais Recentes</h2>
                <div className="manuals-grid">
                    {manuals.length === 0 ? (
                        <p>Nenhum manual encontrado.</p>
                    ) : (
                        manuals.map(manual => (
                            <div key={manual.id} className="manual-card">
                                <h3>{manual.titulo}</h3>
                                <p><strong>Categoria:</strong> {manual.categoria}</p>
                                <small>Publicado em: {new Date(manual.uploadedAt.seconds * 1000).toLocaleDateString()}</small>
                                <Link to={`/manual/${manual.id}`}>
                                    <button>Visualizar Manual</button>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
