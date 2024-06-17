import { useContext } from "react";
import { Link } from "react-router-dom";
import { TitleContext } from "../App";
import { PlusCircleIcon, PrinterIcon } from "@heroicons/react/24/outline";

const ListagemProdtuto = () => {
  const setTitle = useContext(TitleContext);
  setTitle("Meus produtos");
  return (
    <>
      <header className="listing">
        <input type="search" name="search" id="search" placeholder="Pesquise" />
        <input
          type="date"
          name="date"
          id="date"
          className="empty:text-slate-500"
        />
        <input type="text" />
        <input type="text" name="" id="" />
      </header>

      <header className="flex justify-end gap-3 my-4">
        <button className="action">
          <PlusCircleIcon className="size-5" />
          Adicionar
        </button>
        <button className="action">
          <PrinterIcon className="size-5" />
          Imprimir
        </button>
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
            <td>
              <a href="https://via.placeholder.com/50" target="_blank">
                Peixe Beta
              </a>
            </td>
            <td>10 vendas</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Peixe Beta</td>
            <td>R$ 10,00</td>
            <td>10</td>
            <td>
              <a href="https://via.placeholder.com/50" target="_blank">
                Peixe Beta
              </a>
            </td>
            <td>10 vendas</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Peixe Beta</td>
            <td>R$ 10,00</td>
            <td>10</td>
            <td>
              <a href="https://via.placeholder.com/50" target="_blank">
                Peixe Beta
              </a>
            </td>
            <td>10 vendas</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Peixe Beta</td>
            <td>R$ 10,00</td>
            <td>10</td>
            <td>
              <a href="https://via.placeholder.com/50" target="_blank">
                Peixe Beta
              </a>
            </td>
            <td>10 vendas</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ListagemProdtuto;
