import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosPersonAdd } from "react-icons/io";
import { FaFishFins } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { GiDoubleFish } from "react-icons/gi";
import { MdOutlineLibraryBooks } from "react-icons/md";

const NavBar = () => {
  return (
    <nav className="NavBarLateral flex flex-col h-full text-center ml-9 px-5">
      <div className="flex flex-col space-y-5">
        <Link to="/CadastroUsuarios" className="flex items-center space-x-2">
          <IoIosPersonAdd size={30} />
        </Link>
        <Link to="/CadastroProdutos" className="flex items-center space-x-2">
          <FaFishFins size={30} />
        </Link>
        <Link to="/ListagemUsuarios" className="flex items-center space-x-2">
          <FaUsers size={30} />
        </Link>
        <Link to="/ListagemVendas" className="flex items-center space-x-2">
          <GiDoubleFish size={30} />
        </Link>
        <Link to="*" className="flex items-center space-x-2">
          <MdOutlineLibraryBooks size={30} />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;