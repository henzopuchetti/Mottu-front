import './Header.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="header">
        <h1>Mottu Controller</h1>
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
      </header>

      <nav className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <h2>Mottu Controller</h2>
        <ul>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/patios" onClick={() => setMenuOpen(false)}>Patios</Link></li>
          <li><Link to="/vagas" onClick={() => setMenuOpen(false)}>Vagas</Link></li>
          <li><Link to="/motos" onClick={() => setMenuOpen(false)}>Motos</Link></li>
          <li><Link to="/evento" onClick={() => setMenuOpen(false)}>Evento</Link></li>
        </ul>
      </nav>

      {/* Overlay para fechar o menu clicando fora */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
    </>
  );
}

export default Header;
