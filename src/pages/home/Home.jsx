import { Link } from 'react-router-dom';
import banner from '../../assets/images/banner.png';
import Header from '../../components/header/Header';
import './Home.css';


function Home() {
  return (
    <div className="container">
      <Header />

      <section className="banner">
        <img src={banner} alt="Banner Mottu" />
      </section>

      <section className="benefits">
        <h2>Benefícios da Mottu</h2>
        <p>
            A Mottu é uma startup de aluguel de motos e serviços logísticos. Construímos soluções inovadoras e tecnologia própria,
            gerando a melhor experiência para entregadores e para lojistas. Nossa missão é transformar realidades e gerar oportunidades,
            entregando para aqueles que entregam e fazem o mundo rodar. Valorizando quem se movimenta e batalha para conquistar seus sonhos.
        </p>
      </section>

      <section className="access">
        <h3>Onde Você Quer Acessar:</h3>
        <div className="buttons">
          <Link to="/patios"><button>Pátios</button></Link>
          <Link to="/consultar-vagas"><button>Vagas</button></Link>
          <Link to="/motos"><button>Motos</button></Link>
          <Link to="/evento"><button>Evento</button></Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
