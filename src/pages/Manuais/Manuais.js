const Manuais = () => {
    const categorias = [
        {
            nome: 'TI',
            manuais: [
                { id: 1, titulo: 'Manual de Configuração', descricao: 'Guia para configurar equipamentos' },
                { id: 2, titulo: 'Segurança em TI', descricao: 'Boas práticas de segurança' },
            ],
        },
        {
            nome: 'Administrativo',
            manuais: [
                { id: 3, titulo: 'Procedimentos Internos', descricao: 'Regras e processos internos' },
                { id: 4, titulo: 'Política de Férias', descricao: 'Detalhes sobre férias' },
            ],
        },
    ];

    return (
        <div className="manuais">
            <h1>Manuais</h1>
            {categorias.map((categoria) => (
                <div key={categoria.nome} className="categoria">
                    <h2>{categoria.nome}</h2>
                    <div className="manual-grid">
                        {categoria.manuais.map((manual) => (
                            <div key={manual.id} className="manual-card">
                                <h3>{manual.titulo}</h3>
                                <p>{manual.descricao}</p>
                                <a href={`/manual/${manual.id}`}>Visualizar</a>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )


};
export default Manuais;
