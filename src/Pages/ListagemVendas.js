import React from 'react';

const ListagemVendas = () => {
  return (
    <div className="bg-gray-100 h-full flex flex-col items-center justify-center">
      <section className="my-5 w-full px-4">
        <h1 className="text-xl font-bold text-center mb-4">Lista de venda de produtos</h1>
        <form className="bg-gray-300 rounded-md p-4 mt-4">
          <div className="grid grid-cols-8 gap-4">
            <label className="col-span-1 text-center">COD</label>
            <label className="col-span-1 text-center">CLIENTE</label>
            <label className="col-span-1 text-center">FRETE</label>
            <label className="col-span-1 text-center">TOTAL</label>
            <label className="col-span-1 text-center">PORMA PAGTO</label>
            <label className="col-span-1 text-center">STATUS</label>
            <label className="col-span-1 text-center">DATA</label>
            <label className="col-span-1 text-center">AÇÕES</label>
          </div>
        </form>

        {/* Exemplo de item de venda */}
        <form className="bg-gray-200 rounded-md p-4 mt-2">
          <div className="grid grid-cols-8 gap-4">
            <span className="col-span-1 text-center">#1234</span>
            <span className="col-span-1 text-center">Peixe palhaço colorido</span>
            <span className="col-span-1 text-center">2 unidades</span>
            <span className="col-span-1 text-center">R$80,00</span>
            <span className="col-span-1 text-center">Cyenton marques</span>
            <span className="col-span-1 text-center">Em processo</span>
            <span className="col-span-1 text-center">12/06/2023</span>
            <span className="col-span-1 text-center"></span>
          </div>
        </form>

        {/* Mais exemplos de itens de venda
        Array abaixo somente para criar + 4 linhas */}
        {[...Array(4)].map((_, index) => (
          <form key={index} className="bg-gray-200 rounded-md p-4 mt-2">
            <div className="grid grid-cols-6 gap-4">
              <span className="col-span-1"></span>
              <span className="col-span-1"></span>
              <span className="col-span-1"></span>
              <span className="col-span-1"></span>
              <span className="col-span-1"></span>
              <span className="col-span-1"></span>
            </div>
          </form>
        ))}
      </section>
    </div>
  );
};

export default ListagemVendas;
