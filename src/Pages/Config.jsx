import { useContext } from "react";
import { TitleContext } from "../App";

function Config() {
  const setTitle = useContext(TitleContext);
  setTitle("Ajustes");

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        {/* Informações da Conta */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Informações da Conta</h2>
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4 border border-slate-400">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome de Usuário</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Digite seu nome de usuário"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="seuemail@exemplo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="********"
              />
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-dark text-white rounded-md">
              Salvar Alterações
            </button>
          </div>
        </section>

        {/* Preferências */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Preferências</h2>
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4 border border-slate-400">
            <div>
              <label className="block text-sm font-medium text-gray-700">Idioma</label>
              <select
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              >
                <option>Português</option>
                <option>Inglês</option>
                <option>Espanhol</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tema</label>
              <select
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              >
                <option>Claro</option>
                <option>Escuro</option>
              </select>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-dark text-white rounded-md ">
              Salvar Alterações
            </button>
          </div>
        </section>

        {/* Segurança */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Segurança</h2>
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4 border border-slate-400">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Autenticação de Dois Fatores</h3>
                <p className="text-sm text-gray-500">Adicione uma camada extra de segurança à sua conta.</p>
              </div>
              <button className="px-4 py-2 bg-blue-dark text-white rounded-md hover:bg-green-900">
                Ativar
              </button>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Dispositivos Conectados</h3>
              <p className="text-sm text-gray-500">Gerencie os dispositivos que têm acesso à sua conta.</p>
              <div className="mt-2">
                <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                  <div>
                    <p className="text-sm text-gray-700">Chrome em Windows 10</p>
                    <p className="text-xs text-gray-500">Último acesso: 02/09/2024</p>
                  </div>
                  <button className="text-sm text-red-600 hover:underline">Remover</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Config;
