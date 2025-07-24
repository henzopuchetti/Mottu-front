import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import './CadastroPatio.css';
import axios from 'axios';

function CadastroPatio() {
  const [form, setForm] = useState({ nome: '', endereco: '', capacidade: '' });
  const [sucesso, setSucesso] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/patios', {
        nome: form.nome,
        endereco: form.endereco,
        capacidade: Number(form.capacidade),
      });
      setSucesso(true);
      setForm({ nome: '', endereco: '', capacidade: '' });
    } catch (err) {
      alert('Erro ao cadastrar pátio');
      console.error(err);
    }
  }

  return (
    <div className="container">
      <Header />
      <div className="conteudo">
        <h2 className="titulo">Cadastro de Pátios</h2>

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

          <button type="submit" className="btn-cadastrar">Cadastrar Novo Pátio</button>
        </form>

        {sucesso && <p className="mensagem-sucesso">Pátio Cadastrado!</p>}

        <button className="btn-voltar" onClick={() => navigate('/patios')}>
          Voltar
        </button>
      </div>
    </div>
  );
}

export default CadastroPatio;
