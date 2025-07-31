import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import './Vagas.css';
import axios from 'axios';

function Vagas() {
  const { id } = useParams();
  const [vagas, setVagas] = useState({});
  const [nomePatio, setNomePatio] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/vagas/patio/${id}/formatado`)
      .then(res => {
        setVagas(res.data.vagasPorFileira);
        setNomePatio(res.data.nomePatio);
      })
      .catch(err => console.error('Erro ao buscar vagas:', err));
  }, [id]);

  return (
    <div className="page-container">
      <Header />

      <div className="conteudo-vagas">
        <h2 className="titulo">Vagas</h2>

        <div className="quadro-vagas">
          <p className="nome-patio">{nomePatio}</p>

          {Object.keys(vagas).map((letra, i) => (
            <div className="linha-vagas" key={i}>
              <span className="letra-linha">{letra}</span>
              {vagas[letra].map((vaga, index) => {
                const status = vaga.includes('ocupada') ? 'ocupado' : 'livre';
                return <div key={index} className={`quadrado ${status}`} />;
              })}
            </div>
          ))}

          <div className="legenda">
            <span><span className="exemplo livre"></span> Livre</span>
            <span><span className="exemplo ocupado"></span> Ocupado</span>
          </div>
        </div>

        <button className="btn-voltar" onClick={() => navigate('/')}>
          Voltar
        </button>
      </div>
    </div>
  );
}

export default Vagas;
