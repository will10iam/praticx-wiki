import React, { useState } from "react";
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import './Upload.css'

const Upload = () => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [arquivo, setArquivo] = useState(null);
    const [status, setStatus] = useState('');

    const handleUpload = async () => {

        if (!arquivo || !titulo || !descricao) {
            alert("Preencha todos os campos");
            return;
        }

        const formData = new FormData();
        formData.append('file', arquivo);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

        try {
            setStatus('Fazendo upload para o Cloudinary...');
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );
            const data = await response.json();
            if (!data.secure_url) {
                throw new Error('Erro ao carregar arquivo no Cloudinary')

            }
            await addDoc(collection(db, "manuals"), {
                titulo,
                descricao,
                categoria,
                fileUrl: data.secure_url,
                uploadedAt: new Date(),
            });

            console.log('Arquivo enviado com sucesso', data.secure_url);
            alert("Arquivo enviado com sucesso");
            setTitulo('');
            setDescricao('');
            setCategoria('');
            setArquivo(null);
            setStatus('Manual enviado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar para o Cloudinary:', error);
            setStatus('Erro ao enviar o manual.');
        }
    };

    return (
        <div className="upload">
            <h1>Adicionar Novo Manual</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Título:
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Descrição:
                    <textarea
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Categoria:
                    <input
                        type="text"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Arquivo (PDF):
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setArquivo(e.target.files[0])}
                        required
                    />
                </label>
                <button onClick={handleUpload}>Enviar</button>
            </form>
            {status && <p className="status">{status}</p>}
        </div>
    )
}
export default Upload;
