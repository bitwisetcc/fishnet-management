import logo from './Logo.png'; //importar imagem
import perfilphoto from './baiacu.jpg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar'; // Supondo que você tem um componente NavBar
import CadastroProdutos from './Pages/CadastroProdutos';
import CadastroUsuarios from './Pages/CadastroUsuarios';
import ListagemUsuarios from './Pages/ListagemUsuarios';
import ListagemVendas from './Pages/ListagemVendas';
import Login from './Pages/Login';
import ListagemProduto from './Pages/ListagemProduto';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="flex flex-row flex-grow">
      <NavBar />
        <main className="flex-grow px-10">
          <Routes>
            <Route path="/" element={"</>"} />
            <Route path="/CadastroUsuarios" element={<CadastroUsuarios />} />
            <Route path="/prods/cadastro" element={<CadastroProdutos />} />
            <Route path="/prods" element={<ListagemProduto />} /> 
            <Route path="/ListagemUsuarios" element={<ListagemUsuarios />} /> 
            <Route path="/ListagemVendas" element={<ListagemVendas />} />
            <Route path="/Login" element={<Login />} />
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
      case '/':
        return 'Home';
      case '/CadastroUsuarios':
        return 'Cadastro de Usuários';
      case '/prods/cadastro':
        return 'Cadastro de Produtos';
      case '/ListagemUsuarios':
        return 'Listagem de Usuários';
      case '/ListagemVendas':
        return 'Pedidos';
      default:
        return '';
    }
  };

  return (
    <header className="NavBarCima flex flex-row h-[130px] items-center px-5 py-2 relative">
      <img className="rounded-lg" src={logo} alt="Logo" width="100" />
      <h1 className="text-3xl whitespace-nowrap pl-5">{getTitle()}</h1>
      <div className="absolute right-10">
        <img className="rounded-full" src={perfilphoto} alt="Perfil" width="60" />
      </div>
    </header>
  );
};

export default App;
