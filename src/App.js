import logo from './Logo.png'; //importar imagem
import perfilphoto from './Perfil.png';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar'; // Supondo que você tem um componente NavBar
import CadastroProdutos from './Pages/CadastroProdutos';
import CadastroUsuarios from './Pages/CadastroUsuarios';
import ListagemUsuarios from './Pages/ListagemUsuarios';
import ListagemVendas from './Pages/ListagemVendas';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="flex flex-row flex-grow">
      <NavBar />
        <main className="flex-grow p-10">
          <Routes>
            <Route path="/" element={"</>"} />
            <Route path="/CadastroUsuarios" element={<CadastroUsuarios />} />
            <Route path="/CadastroProdutos" element={<CadastroProdutos />} />
            <Route path="/ListagemUsuarios" element={<ListagemUsuarios />} /> 
            <Route path="/ListagemVendas" element={<ListagemVendas />} />
            <Route path="*" element={<h1>Página não encontrada</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const Header = () => {
  const location = useLocation();

  // Função para obter o título da página com base na rota atual
  const getTitle = () => {
    switch (location.pathname) {
      case '/CadastroProdutos':
        return 'Cadastro de Produtos';
      case '/ListagemUsuarios':
        return 'Listagem de Usuários';
      case '/ListagemVendas':
        return 'Listagem de Vendas';
      default:
        return '';
    }
  };

  return (
    <header className="NavBarCima flex flex-row h-[130px] items-center justify-between px-10 py-5 bg-gray-100 shadow-md">
      <img className="rounded-lg" src={logo} alt="Logo" width="150" />
      <h1 className="text-3xl whitespace-nowrap">{getTitle()}</h1>
      <img className="rounded-full" src={perfilphoto} alt="Perfil" width="60" />
    </header>
  );
};

export default App;
