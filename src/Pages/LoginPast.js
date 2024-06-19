import React from 'react';

const Login = () => {
  return (
    <header className="text-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Login do participante
      </h1>
      <form className="bg-gray-200 text-center rounded-lg w-full md:w-1/2 lg:w-1/3 mx-auto p-8 shadow-lg">
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg">Digite o seu E-Mail:</label>
          <input type="email" name="email" id="email" className="rounded-lg p-2 w-3/4 mx-auto block" />
        </div>
        <div className="mb-4">
          <label htmlFor="senha" className="block text-lg">Digite a sua senha:</label>
          <input type="password" name="senha" id="senha" className="rounded-lg p-2 w-3/4 mx-auto block" />
        </div>
        <div className="flex justify-center space-x-4">
          <button className="rounded-lg w-1/4 p-2 cursor-pointer bg-blue-500 text-white transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600">
            Entrar
          </button>
          <button className="rounded-lg w-1/4 p-2 cursor-pointer bg-gray-500 text-white transform transition-transform duration-300 hover:scale-105 hover:bg-gray-600">
            Limpar
          </button>
        </div>
      </form>
    </header>
  );
};

export default Login;
