import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import './EdicaoPatio.css';
import axios from 'axios';

function EdicaoPatio() {
  const { id } = useParams();
  const [form, setForm] = useState({ nome: '', endereco: '', capacidade: '' });
  const [sucesso, setSucesso] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/patios/${id}`)
      .then(res => {
        const { nome, endereco, capacidade } = res.data;
        setForm({ nome, endereco, capacidade });
      })
      .catch(err => console.error('Erro ao buscar pátio:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/patios/${id}`, {
        nome: form.nome,
        endereco: form.endereco,
        capacidade: Number(form.capacidade),
      });
      setSucesso(true);
    } catch (err) {
      alert('Erro ao editar pátio');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="conteudo">
        <h2 className="titulo">Edição de Pátio</h2>

        <form className="form-card" onSubmit={handleSubmit}>
          <label>Nome do Pátio:</label>
          <input name="nome" value={form.nome} onChange={handleChange} required />

          <label>Endereço do Pátio:</label>
          <input name="endereco" value={form.endereco} onChange={handleChange} required />

          <label>Capacidade Total do Pátio:</label>
          <input
            name="capacidade"
            value={form.capacidade}
            onChange={handleChange}
            required
            type="number"
            min="1"
          />

          <button type="submit" className="btn-cadastrar">Editar Pátio</button>
        </form>

        {sucesso && <p className="mensagem-sucesso">Pátio Editado!</p>}

        <button className="btn-voltar" onClick={() => navigate('/patios')}>
          Voltar
        </button>
      </div>
    </div>
  );
}

export default EdicaoPatio;
