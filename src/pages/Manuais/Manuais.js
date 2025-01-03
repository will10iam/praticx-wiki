import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import './Manuais.css';

const Manuais = () => {
    const [manuais, setManuais] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentManual, setCurrentManual] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "manuals"), orderBy("uploadedAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedManuais = [];
            querySnapshot.forEach((doc) => {
                fetchedManuais.push({ id: doc.id, ...doc.data() });
            });
            setManuais(fetchedManuais);
        })

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir esse manual?")) {
            try {
                await deleteDoc(doc(db, "manuals", id));
                alert("Manual excluído com sucesso");
            } catch (error) {
                console.error("Erro ao excluir o manual", error);
                alert("Não foi possível excluir o manual.");
            }
        }
    };

    const handleEdit = (manual) => {
        setEditMode(true);
        setCurrentManual(manual);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (currentManual) {
            try {
                const manualRef = doc(db, "manuals", currentManual.id);
                await updateDoc(manualRef, {
                    titulo: currentManual.titulo,
                    descricao: currentManual.descricao
                });
                alert("Manual atualizado com sucesso");
                setEditMode(false);
                setCurrentManual(null);
            } catch (error) {
                console.error("Erro ao atualizar manual:", error);
                alert("Não foi possível atualizar o manual");
            }
        }
    };

    return (
        <div className="manuais">
            <h1>Manuais</h1>

            {editMode && (
                <div className="edit-modal">
                    <h3>Editar Manual</h3>
                    <form onSubmit={handleUpdate}>
                        <label>
                            Título:
                            <input
                                type="text"
                                value={currentManual.titulo}
                                onChange={(e) =>
                                    setCurrentManual({ ...currentManual, titulo: e.target.value })
                                }
                                required
                            />
                        </label>
                        <label>
                            Descrição:
                            <textarea
                                value={currentManual.descricao}
                                onChange={(e) =>
                                    setCurrentManual({ ...currentManual, descricao: e.target.value })
                                }
                                required
                            />
                        </label>
                        <button type="submit">Salvar</button>
                        <button onClick={() => setEditMode(false)}>Cancelar</button>
                    </form>
                </div>
            )}
            <div className="manuais-grid">
                {manuais.map((manual) => (
                    <div key={manual.id} className="manual-card">
                        <h2>{manual.titulo}</h2>
                        <p>{manual.descricao}</p>
                        <p><strong>Categoria:</strong> {manual.categoria}</p>
                        <Link to={`/manual/${manual.id}`}>
                            <button>Visualizar Manual</button>
                        </Link>

                        <div className="actions">
                            <button onClick={() => handleEdit(manual)}>Editar</button>
                            <button onClick={() => handleDelete(manual.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )


};
export default Manuais;
