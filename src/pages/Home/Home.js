import React from 'react';
import './Home.css';


const Home = () => {
    const mockManuals = [
        { id: 1, titulo: 'Manual de TI', descricao: 'Guia completo para o setor de TI' },
        { id: 2, titulo: 'Manual Administrativo', descricao: 'Procedimentos administrativos' },
        { id: 3, titulo: 'Políticas de Segurança', descricao: 'Orientações de segurança' },
    ]
    return (
        <div className='home'>


            <div className='search-bar'>
                <input type='text' placeholder='Pesquisando manuais...' />
                <select>
                    <option value=''>Filtrar por...</option>
                    <option value='categoria'>Categoria</option>
                    <option value='titulo'>Título</option>
                </select>
                <button>Buscar</button>
            </div>

            <div className='manuals-list'>
                {mockManuals.map((manual) => (
                    <div key={manual.id} className='manual-card'>
                        <h3>{manual.titulo}</h3>
                        <p>{manual.descricao}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
