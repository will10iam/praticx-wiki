import React from "react";
import { useParams } from "react-router-dom";
import './ManualView.css'


const ManualView = () => {
    const { id } = useParams();

    const mockManuais = [
        { id: '1', titulo: 'Manual de Configuração', descricao: 'Guia para configurar equipamentos', pdfUrl: 'https://example.com/manual1.pdf' },
        { id: '2', titulo: 'Segurança em TI', descricao: 'Boas práticas de segurança', pdfUrl: 'https://example.com/manual2.pdf' },
    ];

    const manual = mockManuais.find((manual) => manual.id === id);

    if (!manual) {
        return <p>Manual não encontrado.</p>;
    }

    return (
        <div className="manual-view">
            <h1>{manual.titulo}</h1>
            <p>{manual.descricao}</p>
            <iframe
                src={manual.pdfUrl}
                title={manual.titulo}
                width='100%'
                height='500px'
            ></iframe>
            <a href={manual.pdfUrl} download className="download-btn">
                Baixar PDF
            </a>
        </div>
    )
}
export default ManualView;

