import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { login } from "../lib/auth";
import logo from "../LogoSemFundo.png";
import { TitleContext } from "../App";

function Login() {
  const { error } = useParams();
  const navigate = useNavigate();
  const setTitle = useContext(TitleContext);
  const [errorMsg, setErrorMsg] = useState("");

  function submit(e) {
    e.preventDefault();
    const form = e.target;

    login(form.email.value, form.password.value)
      .then(() => navigate("/"))
      .catch((e) => setErrorMsg(e.message));
  }

  useEffect(() => setTitle(null), [setTitle]);
  useEffect(() => {
    switch (error) {
      case undefined:
        break;

      case "role":
        setErrorMsg("Cargo inválido");
        break;

      default:
        setErrorMsg("Erro de autenticação");
        break;
    }
  }, [error]);

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
        className="bg-slate-100 text-slate-800 border border-slate-400 rounded-lg p-9 shadow-lg z-10 flex flex-col md:flex-row w-[90%] max-w-[800px]"
        onSubmit={(e) => submit(e)}
      >
        <section className="flex-1 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-300 mb-8 md:mb-0 md:mr-8 pr-0 md:pr-5">
          <img src={logo} alt="Logo FishNet" className="w-32 h-32" />
        </section>

        <section className="flex-1">
          <h2 className="text-2xl font-semibold text-center md:text-left">Bem vindo(a)!</h2>

          {errorMsg && (
            <p className="text-red-500 rounded-md border border-red-500 bg-red-300 flex flex-row items-center p-2 mt-2">
              <button onClick={() => setErrorMsg(null)}>
                <XMarkIcon className="size-5 text-red-800" />
              </button>
              {errorMsg}
            </p>
          )}

          <div className="flex flex-col mt-4 gap-5">
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
            <a
              href="/reset-password"
              className="text-blue-dark hover:text-yellow-light w-max"
            >
              Esqueceu a senha?
            </a>
            <a
              href="/users/new"
              className="text-blue-dark hover:text-yellow-light w-max"
            >
              Não tem uma conta? Crie agora!
            </a>
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
