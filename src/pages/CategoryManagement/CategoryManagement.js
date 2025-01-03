import React, { useState, useEffect } from "react";
import { db } from '../../firebase-config';
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import './CategoryManagement.css';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");

    const categoriesRef = collection(db, "categories");

    useEffect(() => {
        const fetchCategories = async () => {
            const snapshot = await getDocs(categoriesRef);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            console.log("Categorias recuperadas", data);
            setCategories(data);
        };
        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        if (newCategory.trim()) {
            await addDoc(categoriesRef, {
                name: newCategory,
                createdAt: new Date(),
            });
            setNewCategory("");
        }
    };

    const handleDeleteCategory = async (id) => {
        await deleteDoc(doc(db, "categories", id));
        setCategories(categories.filter(category => category.id !== id));
    };


    return (
        <div className="category-management">
            <h2>Gerenciar Categorias</h2>
            <div className="add-category">
                <input
                    type="text"
                    placeholder="Nova categoria"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button onClick={handleAddCategory}>Adicionar</button>
            </div>
            <ul className="categories-list">
                {categories.map(category => (
                    <li key={category.id}>
                        {category.name}
                        <button onClick={() => handleDeleteCategory(category.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default CategoryManagement;