import { Link } from "react-router-dom";

const ListagemProduto = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-3">Meus produtos</h1>
      <p className="text-sm">Clique na categoria para buscar os produtos</p>

      <header className="flex justify-between mt-3">
        <div className="flex gap-3">
          <button className="shadow text-sm bg-sky-300 p-3 py-1 rounded-xl border border-sky-500">Água salgada</button>
          <button className="shadow text-sm bg-sky-300 p-3 py-1 rounded-xl border border-sky-500">Água doce</button>
        </div>
        <div className="flex items-center">
          <label htmlFor="search" className="mr-1">Buscar:</label>
          <input type="search" id="search" name="search" className="rounded-xl border bg-slate-200 border-slate-300 pt-1 px-2 font-mono" />
          <Link to="/prods/cadastro" className="shadow text-sm bg-sky-300 p-3 py-1 rounded-xl border border-sky-500 ml-2">Adicionar produto</Link>
        </div>
      </header>

      <table className="table-auto mt-3 border border-slate-400 w-full">
        <thead className="bg-slate-400">
          <tr className="*:text-left">
            <th>#</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Foto</th>
            <th className="italic">Insights</th>
          </tr>
        </thead>
        <tbody className="*:even:bg-slate-100 *:odd:bg-slate-200 *:border-b border-b-slate-300">
          <tr>
            <td>1</td>
            <td>Peixe Beta</td>
            <td>R$ 10,00</td>
            <td>10</td>
            <td><a href="https://via.placeholder.com/50" target="_blank">Peixe Beta</a></td>
            <td>10 vendas</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Peixe Beta</td>
            <td>R$ 10,00</td>
            <td>10</td>
            <td><a href="https://via.placeholder.com/50" target="_blank">Peixe Beta</a></td>
            <td>10 vendas</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Peixe Beta</td>
            <td>R$ 10,00</td>
            <td>10</td>
            <td><a href="https://via.placeholder.com/50" target="_blank">Peixe Beta</a></td>
            <td>10 vendas</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Peixe Beta</td>
            <td>R$ 10,00</td>
            <td>10</td>
            <td><a href="https://via.placeholder.com/50" target="_blank">Peixe Beta</a></td>
            <td>10 vendas</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ListagemProduto;
