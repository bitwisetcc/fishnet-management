import { useContext } from "react";
import { TitleContext } from "../App";
import logo from "../Logo.png";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";

function Login() {
  const setTitle = useContext(TitleContext);
  setTitle("Login");
  return (
    <article className="flex items-center justify-center h-[100vh] relative">
      <div className="absolute inset-0 login-bg blur-[4px]"></div>
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
                <UserIcon className="size-9 py-2" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="@username"
                />
              </span>
            </div>
            <div>
              <span className="flex bg-white rounded-lg items-center shadow-sm border border-slate-200">
                <LockClosedIcon className="size-9 py-2" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="password123"
                />
              </span>
            </div>
            <a href="/reset-password" className="text-[#2EC4B6]">
              Esqueceu a senha?
            </a>
            <button
              type="submit"
              className="bg-[#2EC4B6] rounded-lg py-2 shadow-sm hover:brightness-90 transition-all duration-300"
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
