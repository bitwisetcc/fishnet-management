import Tippy from "@tippyjs/react";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { FaFishFins } from "react-icons/fa6";
import { GiDoubleFish } from "react-icons/gi";
import {
  HomeIcon,
  UserPlusIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import "tippy.js/dist/tippy.css";

import logo from "../Logo.png";

const NavBar = () => {
  return (
    <nav>
      <ul className="list-none flex flex-col m-6 space-y-5 items-center flex-grow">
        <img
          src={logo}
          alt="Logo"
          width="50"
          className="rounded-full border border-slate-600 shadow-sm p-[6px]"
        />
        <NavItem Icon={HomeIcon} text="Home" url="/" />
        <NavItem Icon={UserPlusIcon} text="Usuários" url="/CadastroUsuarios" />
        <NavItem Icon={FaFishFins} text="Produtos" url="/prods" />
        <NavItem Icon={FaUsers} text="Usuários" url="/ListagemUsuarios" />
        <NavItem Icon={DocumentTextIcon} text="Vendas" url="/ListagemVendas" />
        <NavItem Icon={Cog6ToothIcon} text="Configurações" url="/config" />
      </ul>
      {/* <NavItem Icon={MdOutlineLibraryBooks} text="Detalhes do Produto" url="/DetalhesProduto" /> */}
    </nav>
  );
};

function NavItem({ Icon, text, url }) {
  return (
    <li>
      <Tippy content={text} placement="right" delay={50} arrow>
        <Link to={url}>
          <Icon className="size-7 text-slate-700 hover:text-slate-800 transition-colors" />
        </Link>
      </Tippy>
    </li>
  );
}

export default NavBar;
