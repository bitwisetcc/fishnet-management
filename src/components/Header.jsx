import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFishFins } from "react-icons/fa6";
import {
  HomeIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  ArrowLeftStartOnRectangleIcon as LogOutIcon,
} from "@heroicons/react/24/solid";
import perfilphoto from "../mcc.jpg";
import logo from "../Logo.png";

const Header = ({ title }) => {
  return (
    <header className="flex flex-row items-center justify-between mx-7 my-6 md:ml-0">
      <div className="flex gap-4 items-center">
        <MiniNav />
        <h1 className="text-3xl">{title}</h1>
      </div>
      <img
        className="rounded-full size-14 shadow-sm object-cover"
        src={perfilphoto}
        alt="Perfil"
      />
    </header>
  );
};

function MiniNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="md:hidden relative flex flex-col justify-between items-center list-none z-20">
      <img
        src={logo}
        alt="Logo"
        className="rounded-full border border-slate-600 shadow-sm p-[6px] size-14 z-30"
        onClick={() => setOpen(!open)}
      />
      <ul className={`list-none flex flex-col space-y-5 items-center absolute transition-transform ease-in-out top-[4.5rem] bg-slate-100 rounded-full p-3 border border-slate-400 shadow origin-top duration-500 ${open ? "scale-y-100 translate-y-0" : "scale-y-0 -translate-y-10"}`}>
        <NavItem Icon={HomeIcon} text="Home" url="/" />
        <NavItem Icon={FaFishFins} text="Produtos" url="/prods" />
        <NavItem Icon={DocumentTextIcon} text="Vendas" url="/vendas" />
        <NavItem Icon={UserGroupIcon} text="Usuários" url="/users" />
        <NavItem Icon={Cog6ToothIcon} text="Configurações" url="/config" />
      </ul>
      {/* <NavItem Icon={LogOutIcon} text="Logout" url="/login" /> */}
    </nav>
  );
}

function NavItem({ Icon, url }) {
  return (
    <li className="only-of-type:stroke-[10px]">
      <Link to={url}>
        <Icon className="size-7 text-slate-700 hover:text-highlighy-dimm transition-colors" />
      </Link>
    </li>
  );
}

export default Header;
