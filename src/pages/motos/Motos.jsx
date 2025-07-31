import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from '../../components/header/Header';
import axios from 'axios';
import './Motos.css';

function Motos() {
  const [patios, setPatios] = useState([]);
  const [motos, setMotos] = useState([]);
  const [patioSelecionado, setPatioSelecionado] = useState(null);
  const navigate = useNavigate(); // <-- AQUI! Inicializa o useNavigate

  // Busca todos os pátios cadastrados
  useEffect(() => {
    axios.get('http://localhost:8080/api/patios')
      .then(res => setPatios(res.data))
      .catch(err => console.error('Erro ao buscar pátios:', err));
  }, []);

  // Busca TODAS as motos e filtra pelo idPatio
  const buscarMotosPorPatio = (idPatio) => {
    axios.get('http://localhost:8080/api/motos')
      .then(res => {
        const motosDoPatio = res.data.filter((moto) => moto.idPatio === idPatio);
        setMotos(motosDoPatio);
        setPatioSelecionado(patios.find((p) => p.id === idPatio));
      })
      .catch(err => console.error('Erro ao buscar motos:', err));
  };

  return (
    <div className="container">
      <Header />
      <h2 className="titulo">Motos</h2>

      {/* Botão de Navegação */}
      <button className="btn-add" onClick={() => navigate('/cadastro-moto')}>
        Adicionar Nova Moto
      </button>

      <div className="card-wrapper">
        {/* SELEÇÃO DE PÁTIOS */}
        {!patioSelecionado ? (
          <>
            <h3 className="subtitulo">Motos já cadastradas</h3>
            <p className="texto-pergunta">Qual pátio está a moto:</p>
            {patios.length === 0 ? (
              <p className="sem-dados">Nenhum pátio encontrado.</p>
            ) : (
              patios.map((patio, i) => (
                <button
                  key={i}
                  className="btn-patio"
                  onClick={() => buscarMotosPorPatio(patio.id)}
                >
                  {patio.nome} - {patio.endereco}
                </button>
              ))
            )}
          </>
        ) : (
          /* LISTA DE MOTOS DO PÁTIO SELECIONADO */
          <>
            <h3 className="subtitulo">Motos - {patioSelecionado.nome}</h3>

            {motos.length === 0 ? (
              <p className="sem-dados">Nenhuma moto cadastrada nesse pátio.</p>
            ) : (
              motos.map((moto, index) => (
                <div className="card-moto" key={index}>
                  <p><strong>Placa da Moto:</strong> <em>{moto.placa}</em></p>
                  <p><strong>Modelo:</strong> <em>{moto.modelo}</em></p>
                  <p><strong>Cor:</strong> <em>{moto.cor}</em></p>
                  <p><strong>Ano:</strong> {moto.ano}</p>
                  <p><strong>Vaga:</strong> {moto.vagaAtual ?? 'Não alocada'}</p>
                  <p><strong>Nome do Pátio:</strong> {moto.nomePatio}</p>

                  <div className="botoes-card">
                    <button className="btn-editar">Editar</button>
                    <button className="btn-apagar">Apagar</button>
                  </div>
                </div>
              ))
            )}

            {/* BOTÃO VOLTAR */}
            <button
              className="btn-voltar"
              onClick={() => {
                setPatioSelecionado(null);
                setMotos([]);
              }}
            >
              Voltar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Motos;
