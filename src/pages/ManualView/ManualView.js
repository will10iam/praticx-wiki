import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import './ManualView.css'


/* const mockManuais = [
    { id: '1', titulo: 'Manual de Configuração', descricao: 'Guia para configurar equipamentos', pdfUrl: 'https://example.com/manual1.pdf' },
    { id: '2', titulo: 'Segurança em TI', descricao: 'Boas práticas de segurança', pdfUrl: 'https://example.com/manual2.pdf' },
];

const manual = mockManuais.find((manual) => manual.id === id); */

const ManualView = () => {
    const { id } = useParams();
    const [manual, setManual] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchManual = async () => {
            try {
                const manualDoc = doc(db, "manuals", id);
                const manualData = await getDoc(manualDoc);

                if (manualData.exists()) {
                    setManual(manualData.data());
                } else {
                    console.error("Manual não encontrado!");
                }
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar o manual:", error);
            }
        };
        fetchManual();
    }, [id]);

    if (loading) {
        return <div>Carregando manual...</div>;
    }


    if (!manual) {
        return <p>Manual não encontrado.</p>;
    }

    return (
        <div className="manual-view">
            <h1>{manual.titulo}</h1>
            <p>{manual.descricao}</p>
            <p><strong>Categoria:</strong> {manual.category}</p>

            <a href={manual.fileUrl} download>
                Baixar PDF
            </a>
        </div>
    )
}
export default ManualView;

