import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import SearchBar from '../../components/searchBar/SearchBar';
import axios from 'axios';
import './ConsultarVagas.css';

function ConsultarVagas() {
  const [patios, setPatios] = useState([]);
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/patios')
      .then(res => setPatios(res.data))
      .catch(err => console.error('Erro ao buscar pátios:', err));
  }, []);

  const patiosFiltrados = patios.filter((p) =>
    p.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="container">
      <Header />
      <h2 className="titulo">Vagas</h2>
        <SearchBar
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Digite o nome do pátio"
        />

      <div className="card-wrapper">

        {patiosFiltrados.length === 0 ? (
          <p className="sem-dados">Nenhum pátio encontrado.</p>
        ) : (
          patiosFiltrados.map((patio, index) => (
            <div className="card-patio" key={index}>
              <p><strong>Nome do Pátio:</strong> <em>{patio.nome}</em></p>
              <p><strong>Endereço:</strong> <em>{patio.endereco}</em></p>
              <p><strong>Capacidade:</strong> {patio.capacidade}</p>
              <p><strong>Capacidade Atual:</strong> {patio.vagasDisponiveis}</p>

              <div className="botoes-card">
                <button
                  className="btn-vagas"
                  onClick={() => navigate(`/vagas/${patio.id}`)}
                >
                  Consultar Vagas
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ConsultarVagas;
