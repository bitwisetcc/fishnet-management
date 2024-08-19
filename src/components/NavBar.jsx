import Tippy from "@tippyjs/react";
import { FaFishFins } from "react-icons/fa6";
import {
  HomeIcon,
  DocumentTextIcon,
  Cog8ToothIcon as CogIcon, // Novo ícone
  UserGroupIcon,
  ArrowLeftStartOnRectangleIcon as LogOutIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import "tippy.js/dist/tippy.css";

import logo from "../Logo.png";

const NavBar = () => {
  return (
    <nav className="hidden sticky md:flex flex-col justify-between items-center list-none pb-12 p-5 mr-2 h-[100vh] top-0 left-0 bg-backnav-dark shadow-right-lg">
      <ul className="list-none flex flex-col space-y-7 items-center">
        <img
          src={logo}
          alt="Logo"
          className="rounded-full border border-slate-600 shadow-sm p-[6px] w-14 h-14"
        />
        <NavItem Icon={HomeIcon} text="Home" url="/" />
        <NavItem Icon={FaFishFins} text="Produtos" url="/prods" />
        <NavItem Icon={DocumentTextIcon} text="Vendas" url="/vendas" />
        <NavItem Icon={UserGroupIcon} text="Usuários" url="/users" />
        <NavItem Icon={CogIcon} text="Configurações" url="/config" /> {/* Atualizado */}
      </ul>
      <NavItem Icon={LogOutIcon} text="Logout" url="/login" />
    </nav>
  );
};

function NavItem({ Icon, text, url }) {
  return (
    <li className="only-of-type:stroke-[10px]">
      <Tippy content={text} placement="bottom" delay={50} arrow>
        <Link to={url} className="flex items-center">
          <Icon className="w-7 h-7 text-white hover:text-yellow-300 transition-colors duration-300" />
        </Link>
      </Tippy>
    </li>
  );
}

export default NavBar;
