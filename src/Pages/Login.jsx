import { useContext } from "react";
import { TitleContext } from "../App";
import logo from "../LogoSemFundo.png";
import { Link } from "react-router-dom";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";

function Login() {
  const setTitle = useContext(TitleContext);
  setTitle("Login");
  return (
    <article className="flex items-center justify-center h-[100vh] relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-dark"></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[300px] h-[300px] bg-[#CBAD51] opacity-30 rounded-full absolute -left-20 -bottom-20 animate-pulse"></div>
        <div className="w-[200px] h-[200px] bg-[#CBAD51] opacity-20 rounded-full absolute left-40 top-40 animate-pulse"></div>
        <div className="w-[150px] h-[150px] bg-[#CBAD51] opacity-25 rounded-full absolute right-10 bottom-10 animate-pulse"></div>
        <div className="w-[100px] h-[100px] bg-[#CBAD51] opacity-30 rounded-full absolute left-20 top-20 animate-pulse"></div>
        <div className="w-[180px] h-[180px] bg-[#CBAD51] opacity-20 rounded-full absolute right-40 bottom-40 animate-pulse"></div>
        <div className="w-[130px] h-[130px] bg-[#CBAD51] opacity-25 rounded-full absolute left-60 bottom-20 animate-pulse"></div>
        <div className="w-[90px] h-[90px] bg-[#CBAD51] opacity-30 rounded-full absolute right-60 top-10 animate-pulse"></div>
        
      </div>
      <form
        className="bg-slate-100 text-slate-800 border border-slate-400 rounded-lg p-9 shadow-lg z-10 flex w-2/3"
        action="/"
      >
        <section className="flex-1 flex items-center justify-center border-r border-r-slate-300 mr-8 pr-5">
          <img src={logo} alt="Logo FishNet" className="size-32" />
        </section>
        <section className="flex-1">
          <h2 className="text-2xl font-semibold">Bem vindo(a)!</h2>

          <div className="flex flex-col mt-6 gap-5">
            <div>
              <span className="flex bg-white rounded-lg items-center shadow-sm border border-slate-200">
                <UserIcon className="size-9 py-2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="@username"
                  className="flex-1 p-2 bg-transparent outline-none"
                />
              </span>
            </div>
            <div>
              <span className="flex bg-white rounded-lg items-center shadow-sm border border-slate-200">
                <LockClosedIcon className="size-9 py-2 text-gray-500" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="password123"
                  className="flex-1 p-2 bg-transparent outline-none"
                />
              </span>
            </div>
            <Link to="/users/new">
            <a href="/reset-password" className="text-blue-dark hover:text-yellow-light w-max" >
              Esqueceu a senha?
            </a>
            </Link>
            <button
              type="submit"
              className="bg-blue-dark rounded-lg py-2 shadow-sm text-white"
            >
              Login
            </button>
          </div>
        </section>
      </form>
    </article>
  );
}

export default Login;
