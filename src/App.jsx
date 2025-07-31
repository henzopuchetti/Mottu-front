import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Patios from './pages/patios/Patios';
import CadastroPatio from './pages/cadastroPatio/CadastroPatio';
import EdicaoPatio from './pages/edicaoPatio/EdicaoPatio';
import Vagas from './pages/vagas/Vagas';
import ConsultarVagas from './pages/consultarVagas/ConsultarVagas';
import Motos from './pages/motos/Motos';
import CadastroMoto from './pages/CadastroMoto/CadastroMoto';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/patios" element={<Patios />} />
      <Route path="/cadastro-patio" element={<CadastroPatio />} />
      <Route path="/editar-patio/:id" element={<EdicaoPatio />} />
      <Route path="/vagas/:id" element={<Vagas />} />
      <Route path="/consultar-vagas" element={<ConsultarVagas />} />
      <Route path="/motos" element={<Motos />} />
      <Route path="/cadastro-moto" element={<CadastroMoto />} />
    </Routes>
  );
}

export default App;
