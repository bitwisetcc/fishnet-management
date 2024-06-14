import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosHome, IoIosPersonAdd } from "react-icons/io";
import { FaFishFins } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { GiDoubleFish } from "react-icons/gi";
import { MdOutlineLibraryBooks } from "react-icons/md";

const NavBar = () => {
  return (
    <nav className="NavBarLateral flex flex-col bg-gray-200 border border-gray-400 shadow h-full text-center ml-5 mt-5 p-5 px-8 rounded">
      <h1 className="py-2 font-medium">MENU</h1>
      <hr className="border-black mb-4" />
      <div className="flex flex-col space-y-5">
        <Link to="/" className="flex items-center space-x-2 group relative">
          <IoIosHome size={30} />
          <span className="nav-hint">Cadastro de Usuário</span>
        </Link>
        <Link to="/CadastroUsuarios" className="flex items-center space-x-2 group relative">
          <IoIosPersonAdd size={30} />
          <span className="nav-hint">Cadastro de Usuário</span>
        </Link>
        <Link to="/prods" className="flex items-center space-x-2 group relative">
          <FaFishFins size={30} />
          <span className="nav-hint">Listagem de Produtos</span>
        </Link>
        <Link to="/ListagemUsuarios" className="flex items-center space-x-2 group relative">
          <FaUsers size={30} />
          <span className="nav-hint">Listagem de Usuários</span>
        </Link>
        <Link to="/ListagemVendas" className="flex items-center space-x-2 group relative">
          <GiDoubleFish size={30} />
          <span className="nav-hint">Listagem de Vendas</span>
        </Link>
        <Link to="*" className="flex items-center space-x-2 group relative">
          <MdOutlineLibraryBooks size={30} />
          <span className="nav-hint">Detalhes do Produto</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;