import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosHome, IoIosPersonAdd } from "react-icons/io";
import { FaFishFins } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { GiDoubleFish } from "react-icons/gi";
import { MdOutlineLibraryBooks } from "react-icons/md";

const NavBar = () => {
  return (
<<<<<<< HEAD
    <nav className="NavBarLateral flex flex-col h-full text-center ml-9 px-5">
=======
    <nav className="NavBarLateral flex flex-col bg-gray-200 border border-gray-400 shadow h-full text-center ml-5 mt-5 p-5 px-8 rounded">
      <h1 className="py-2 font-medium">MENU</h1>
      <hr className="border-black mb-4" />
>>>>>>> ca02aef0eddd5f60341545a255ccff6ae886252c
      <div className="flex flex-col space-y-5">
        <Link to="/" className="flex items-center space-x-2 group relative">
          <IoIosHome size={30} />
          <span className="nav-hint">Cadastro de Usuário</span>
        </Link>
        <Link to="/CadastroUsuarios" className="flex items-center space-x-2 group relative">
          <IoIosPersonAdd size={30} />
<<<<<<< HEAD
=======
          <span className="nav-hint">Cadastro de Usuário</span>
>>>>>>> ca02aef0eddd5f60341545a255ccff6ae886252c
        </Link>
        <Link to="/prods" className="flex items-center space-x-2 group relative">
          <FaFishFins size={30} />
<<<<<<< HEAD
=======
          <span className="nav-hint">Listagem de Produtos</span>
>>>>>>> ca02aef0eddd5f60341545a255ccff6ae886252c
        </Link>
        <Link to="/ListagemUsuarios" className="flex items-center space-x-2 group relative">
          <FaUsers size={30} />
<<<<<<< HEAD
=======
          <span className="nav-hint">Listagem de Usuários</span>
>>>>>>> ca02aef0eddd5f60341545a255ccff6ae886252c
        </Link>
        <Link to="/ListagemVendas" className="flex items-center space-x-2 group relative">
          <GiDoubleFish size={30} />
<<<<<<< HEAD
=======
          <span className="nav-hint">Listagem de Vendas</span>
>>>>>>> ca02aef0eddd5f60341545a255ccff6ae886252c
        </Link>
        <Link to="*" className="flex items-center space-x-2 group relative">
          <MdOutlineLibraryBooks size={30} />
<<<<<<< HEAD
=======
          <span className="nav-hint">Detalhes do Produto</span>
>>>>>>> ca02aef0eddd5f60341545a255ccff6ae886252c
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;