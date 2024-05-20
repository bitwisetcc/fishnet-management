// Pages/CadastroProdutos.js
import React from 'react';

const CadastroProdutos = () => {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-medium pb-5">Novo Produto</h1>
      <div className="flex flex-col space-y-4">
        <label className="flex flex-col">
          <span>Nome do Peixe</span>
          <input
            placeholder="Digite o nome do peixe a ser cadastrado"
            className="h-9 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
            type="text"
          />
        </label>
        <label className="flex flex-col">
          <span>Família do Peixe</span>
          <input
            placeholder="Digite o nome da família do peixe a ser cadastrado"
            className="h-9 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
            type="text"
          />
        </label>
        <label className="flex flex-col">
          <span>Origem do Peixe</span>
          <input
            placeholder="Digite o nome da origem do peixe a ser cadastrado"
            className="h-9 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
            type="text"
          />
        </label>
        <label className="flex flex-col">
          <span>pH do Peixe</span>
          <input
            placeholder="Digite o pH do peixe a ser cadastrado"
            className="h-9 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
            type="text"
          />
        </label>
        <label className="flex flex-col">
          <span>Expectativa da Vida do Peixe</span>
          <input
            placeholder="Digite a expectativa de vida do peixe a ser cadastrado"
            className="h-9 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
            type="text"
          />
        </label>
        <label className="flex flex-col">
          <span>Tamanho Adulto do Peixe</span>
          <input
            placeholder="Digite o tamanho adulto do peixe a ser cadastrado"
            className="h-9 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
            type="text"
          />
        </label>
        <label className="flex flex-col">
          <span>Temperatura do Peixe</span>
          <input
            placeholder="Digite a temperatura do peixe a ser cadastrado"
            className="h-9 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
            type="text"
          />
        </label>
        <label className="flex flex-col">
          <span>Descrição de Especificação do Peixe</span>
          <input
            placeholder="Digite a descrição do peixe a ser cadastrado"
            className="h-9 bg-gray-300 rounded-md placeholder:text-slate-600 placeholder:italic"
            type="text"
          />
        </label>
      </div>
      <div className="flex flex-row justify-end p-4 space-x-8 mt-5">
        <button className="h-10 w-[140px] bg-gray-300 rounded">LIMPAR</button>
        <button className="h-10 w-[140px] bg-gray-300 rounded">ENVIAR</button>
      </div>
    </div>
  );
};

export default CadastroProdutos;
