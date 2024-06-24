import Tippy from "@tippyjs/react";
import { FaFishFins } from "react-icons/fa6";
import {
  HomeIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  ArrowLeftStartOnRectangleIcon as LogOutIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import "tippy.js/dist/tippy.css";

import logo from "../Logo.png";

const NavBar = () => {
  return (
    <nav className="hidden sticky md:flex flex-col justify-between items-center list-none pb-12 p-5 mr-2 h-[100vh] top-0 left-0">
      <ul className="list-none flex flex-col space-y-5 items-center">
        <img
          src={logo}
          alt="Logo"
          className="rounded-full border border-slate-600 shadow-sm p-[6px] size-14"
        />
        <NavItem Icon={HomeIcon} text="Home" url="/" />
        <NavItem Icon={FaFishFins} text="Produtos" url="/prods" />
        <NavItem Icon={DocumentTextIcon} text="Vendas" url="/vendas" />
        <NavItem Icon={UserGroupIcon} text="Usuários" url="/users" />
        <NavItem Icon={Cog6ToothIcon} text="Configurações" url="/config" />
      </ul>
      <NavItem Icon={LogOutIcon} text="Logout" url="/login" />
    </nav>
  );
};

function NavItem({ Icon, text, url }) {
  return (
    <li className="only-of-type:stroke-[10px]">
      <Tippy content={text} placement="right" delay={50} arrow>
        <Link to={url}>
          <Icon className="size-7 text-slate-700 hover:text-highlighy-dimm transition-colors" />
        </Link>
      </Tippy>
    </li>
  );
}

export default NavBar;
