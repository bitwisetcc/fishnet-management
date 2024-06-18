import logo from './Logo.png'; //importar imagem
import perfilphoto from './baiacu.jpg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar'; // Supondo que você tem um componente NavBar
import CadastroProdutos from './Pages/CadastroProdutos';
import CadastroUsuarios from './Pages/CadastroUsuarios';
import ListagemUsuarios from './Pages/ListagemUsuarios';
import ListagemVendas from './Pages/ListagemVendas';
<<<<<<< HEAD
import Login from './Pages/Login';
=======
import ListagemProduto from "./Pages/ListagemProduto";
>>>>>>> ca02aef0eddd5f60341545a255ccff6ae886252c

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
            <Route path="/prods" element={<ListagemProduto />} /> 
            <Route path="/prods/cadastro" element={<CadastroProdutos />} />
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
      case '/CadastroProdutos':
        return 'Cadastro de Produtos';
      case '/ListagemUsuarios':
        return 'Listagem de Usuários';
      case '/ListagemVendas':
<<<<<<< HEAD
        return 'Pedidos';
=======
        return 'Listagem de Vendas';
      case '/prods':
        return 'Listagem de Produtos';
      case '/prods/cadastro':
        return 'Cadastro de Produtos';
>>>>>>> ca02aef0eddd5f60341545a255ccff6ae886252c
      default:
        return '';
    }
  };

  return (
<<<<<<< HEAD
    <header className="NavBarCima flex flex-row h-[130px] items-center px-5 py-2 relative">
      <img className="rounded-lg" src={logo} alt="Logo" width="100" />
      <h1 className="text-3xl whitespace-nowrap pl-5">{getTitle()}</h1>
      <div className="absolute right-10">
        <img className="rounded-full" src={perfilphoto} alt="Perfil" width="60" />
      </div>
=======
    <header className="flex flex-row items-center justify-between px-10 py-5 bg-gray-100 shadow-md">
      <img src={logo} alt="Logo" width="70" />
      <h1 className="text-3xl">{getTitle()}</h1>
      <img className="rounded-full" src={perfilphoto} alt="Perfil" width="60" />
>>>>>>> ca02aef0eddd5f60341545a255ccff6ae886252c
    </header>
  );
};

export default App;
