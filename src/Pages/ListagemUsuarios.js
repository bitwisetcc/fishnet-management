import {
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { TitleContext } from "../App";
import ListingFilter from "../components/ListingFilter";
import { Link } from "react-router-dom";
import { listAllProducts } from "../lib/query";

function ListagemUsuarios() {
  const setTitle = useContext(TitleContext);
  setTitle("Usuários");

  const [products, setProds] = useState([]);
  useEffect(() => {
    listAllProducts().then(setProds);
  }, []);

  return (
    <>
      <ListingFilter>
        <span className="flex items-center text-slate-600 flex-1 gap-1">
          <MagnifyingGlassIcon className="size-4" />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Pesquise"
            maxLength={100}
            className="w-full placeholder:text-slate-500"
          />
        </span>
      </ListingFilter>

      <header className="flex justify-end gap-3 my-4">
        <Link to="new" className="action">
          <PlusCircleIcon className="size-5" />
          Adicionar
        </Link>
        <button className="action">
          <PrinterIcon className="size-5" />
          Imprimir
        </button>
      </header>

      <div className="overflow-x-scroll md:overflow-x-hidden">
  <article className="grid grid-cols-[90px_minmax(150px,1fr)_120px_minmax(180px,1fr)_150px_minmax(200px,1fr)_120px_90px_70px] gap-4 p-4">
    <header className="listing col-span-9 text-slate-500">
      <span>
        <span className="bg-slate-200 rounded-lg px-2">#</span>
      </span>
      <span>Nome</span>
      <span>Tel</span>
      <span>Email</span>
      <span>CPF/CNPJ</span>
      <span>Endereço</span>
      <span>Cidade/UF</span>
      <span>Insights</span>
      <span>Ações</span>
    </header>
  </article>
</div>

    </>
  );
}

export default ListagemUsuarios;
