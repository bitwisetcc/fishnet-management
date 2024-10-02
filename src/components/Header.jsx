import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFishFins } from "react-icons/fa6";
import {
  HomeIcon,
  ArrowLeftStartOnRectangleIcon as LogOutIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/solid";
import perfilphoto from "../coisadenerd.jpg";
import logo from "../LogoGold.jpeg";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { logout } from "../lib/auth";

const Header = ({ title, profile }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null); 

  useEffect(() => {
    setProfileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setProfileMenuOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className="flex flex-row items-center justify-between mx-7 my-6">
      <div className="flex gap-4 items-center">
        <MiniNav />
        <h1 className="text-3xl text-sky-950 font-bold">{title}</h1>
      </div>
      <div className="relative z-50 flex gap-3 items-center">
        {profile.name && <span className="font-semibold text-sky-900">{profile.name}</span>}
        <img
          className="rounded-full w-14 h-14 shadow-sm object-cover cursor-pointer"
          src={profile.picture}
          alt="Perfil"
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
        />
        {profileMenuOpen && (
          <ul
            ref={menuRef} 
            className="absolute right-0 top-10 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg"
          >
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Minha Conta
              </Link>
            </li>
            <li>
              <Link
                to="/config"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <WrenchScrewdriverIcon className="inline w-5 h-5 mr-2" />
                Configurações
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={logout}
                className="block px-4 py-2 text-red-600 hover:bg-red-100"
              >
                <LogOutIcon className="inline w-5 h-5 mr-2" />
                Sair da Conta
              </Link>
            </li>
          </ul>
        )}
      </div>
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
        className="rounded-full border border-slate-600 shadow-sm p-[6px] w-14 h-14 z-30"
        onClick={() => setOpen(!open)}
      />
      <ul
        className={`list-none flex flex-col space-y-5 items-center absolute transition-transform ease-in-out top-[4.5rem] bg-slate-100 rounded-full p-3 border border-slate-400 shadow origin-top duration-500 ${
          open ? "scale-y-100 translate-y-0" : "scale-y-0 -translate-y-10"
        }`}
      >
        <NavItem Icon={HomeIcon} text="Home" url="/" />
        <NavItem Icon={FaFishFins} text="Produtos" url="/prods" />
        <NavItem Icon={PresentationChartLineIcon} text="Vendas" url="/vendas" />
        <NavItem Icon={UsersIcon} text="Clientes" url="/client" />
        <NavItem Icon={BriefcaseIcon} text="Funcionários" url="/users" />
        <NavItem
          Icon={WrenchScrewdriverIcon}
          text="Configurações"
          url="/config"
        />
      </ul>
    </nav>
  );
}

function NavItem({ Icon, url }) {
  return (
    <li>
      <Link to={url}>
        <Icon className="w-7 h-7 text-slate-700 hover:text-yellow-light transition-colors duration-300" />
      </Link>
    </li>
  );
}

export default Header;
