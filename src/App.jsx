import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Patios from './pages/patios/Patios';
import CadastroPatio from './pages/cadastroPatio/CadastroPatio';
import EdicaoPatio from './pages/edicaoPatio/EdicaoPatio';
import Vagas from './pages/vagas/Vagas';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/patios" element={<Patios />} />
      <Route path="/cadastro-patio" element={<CadastroPatio />} />
      <Route path="/editar-patio/:id" element={<EdicaoPatio />} />
      <Route path="/vagas/:id" element={<Vagas />} />
    </Routes>
  );
}

export default App;
