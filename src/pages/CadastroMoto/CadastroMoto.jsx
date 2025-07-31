import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import './CadastroMoto.css';
import axios from 'axios';

function CadastroMoto() {
  const [form, setForm] = useState({
    placa: '',
    modelo: '',
    cor: '',
    ano: '',
    patioId: ''
  });
  const [sucesso, setSucesso] = useState(false);
  const [patios, setPatios] = useState([]);
  const navigate = useNavigate();

  // Buscar pátios disponíveis para associar à moto
  useEffect(() => {
    axios.get('http://localhost:8080/api/patios')
      .then(res => setPatios(res.data))
      .catch(err => console.error('Erro ao buscar pátios:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/motos', {
        placa: form.placa,
        modelo: form.modelo,
        cor: form.cor,
        ano: Number(form.ano),
        idPatio: Number(form.patioId)
      });
      setSucesso(true);
      setForm({ placa: '', modelo: '', cor: '', ano: '', patioId: '' });
    } catch (err) {
      alert('Erro ao cadastrar moto');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="conteudo">
        <h2 className="titulo">Cadastro de Motos</h2>

        <form className="form-card" onSubmit={handleSubmit}>
          <label>Placa:</label>
          <input
            name="placa"
            value={form.placa}
            onChange={handleChange}
            required
          />

          <label>Modelo:</label>
          <input
            name="modelo"
            value={form.modelo}
            onChange={handleChange}
            required
          />

          <label>Cor:</label>
          <input
            name="cor"
            value={form.cor}
            onChange={handleChange}
            required
          />

          <label>Ano:</label>
          <input
            name="ano"
            type="number"
            min="1900"
            value={form.ano}
            onChange={handleChange}
            required
          />

          <label>Pátio:</label>
          <select
            name="patioId"
            value={form.patioId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um pátio</option>
            {patios.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome} - {p.endereco}
              </option>
            ))}
          </select>

          <button type="submit" className="btn-cadastrar">
            Cadastrar Moto
          </button>
        </form>

        {sucesso && <p className="mensagem-sucesso">Moto Cadastrada!</p>}

        <button className="btn-voltar" onClick={() => navigate('/motos')}>
          Voltar
        </button>
      </div>
    </div>
  );
}

export default CadastroMoto;
