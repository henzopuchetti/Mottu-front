import './Patios.css';
import Header from '../../components/header/Header';
import SearchBar from '../../components/searchBar/SearchBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Patios() {
  const [patios, setPatios] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [confirmarDelete, setConfirmarDelete] = useState(null); // <-- NOVO

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/patios')
      .then(res => setPatios(res.data))
      .catch(err => console.error(err));
  }, []);

  const apagarPatio = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/patios/${id}`);
      setPatios(patios.filter(p => p.id !== id));
      setConfirmarDelete(null); // fecha modal
    } catch (err) {
      alert("Erro ao apagar pátio.");
    }
  };

  const patiosFiltrados = patios.filter(p =>
    p.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="container">
      <Header />
      <h2 className="titulo">Patios</h2>
      <button className="btn-add" onClick={() => navigate('/cadastro-patio')}>
        Adicionar Novo Pátio
      </button>

      <div className="card-wrapper">
        <SearchBar
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Digite o nome do pátio"
        />

        {patiosFiltrados.length === 0 ? (
          <p className="sem-dados">Nenhum pátio encontrado.</p>
        ) : (
          patiosFiltrados.map((patio, i) => (
            <div className="card-patio" key={i}>
              <p><strong>Nome do Pátio:</strong> <em>{patio.nome}</em></p>
              <p><strong>Endereço:</strong> <em>{patio.endereco}</em></p>
              <p><strong>Capacidade:</strong> {patio.capacidade}</p>
              <p><strong>Vagas Disponíveis:</strong> {patio.vagasDisponiveis}</p>
              <div className="botoes-card">
                <button className="btn-editar" onClick={() => navigate(`/editar-patio/${patio.id}`)}>Editar</button>
                <button className="btn-apagar" onClick={() => setConfirmarDelete(patio.id)}>Apagar</button>
                <button className="btn-vagas" onClick={() => navigate(`/vagas/${patio.id}`)}>Ver Vagas</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Confirmação */}
      {confirmarDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Se apertar o Botão abaixo o Pátio será<br />permanentemente excluído!</p>
            <button className="btn-confirmar" onClick={() => apagarPatio(confirmarDelete)}>Apagar Pátio</button>
            <button className="btn-cancelar" onClick={() => setConfirmarDelete(null)}>Voltar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Patios;
