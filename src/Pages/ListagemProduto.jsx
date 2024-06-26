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

function ListagemProduto() {
  const setTitle = useContext(TitleContext);
  setTitle("Produtos");

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

        <button className="flex items-center gap-1 relative group cursor-pointer">
          <CurrencyDollarIcon className="size-4" />
          <span>Preço</span>
          <ChevronDownIcon className="size-4 ml-4" />

          <div className="panel left-0 top-10">
            <input
              type="range"
              name="price"
              id="price"
              className="accent-highlighy-dimm"
            />
            <div className="flex justify-between text-sm">
              <span>R$10,00</span>
              <span>R$500,00</span>
            </div>
          </div>
        </button>

        <button className="flex items-center gap-1 relative group cursor-pointer">
          <FunnelIcon className="size-4" />
          <span className="text-nowrap">Outros filtros</span>
          <ChevronDownIcon className="size-4 ml-4" />

          <div className="panel right-0 top-10 px-10 text-left">
            <ul className="flex flex-col gap-1">
              <li className="hover:text-slate-800">Água doce</li>
              <li className="hover:text-slate-800">Água salgada</li>
              <li className="hover:text-slate-800">Em oferta</li>
              <li className="hover:text-slate-800">Em estoque</li>
            </ul>
          </div>
        </button>
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

      <div className="md:overflow-x-hidden overflow-x-scroll">
        <article className="grid-cols-[90px_minmax(130px,1fr)_90px_90px_minmax(130px,1fr)_90px_70px]">
          <header className="listing col-span-7">
            <span>
              <span className="bg-slate-200 rounded-lg px-2">#</span>
            </span>
            <span>Nome</span>
            <span>Preço</span>
            <span>Estoque</span>
            <span>Foto</span>
            <span>Insights</span>
            <span>Ações</span>
          </header>

          {products.map((product) => (
            <section className="grid grid-cols-subgrid col-span-7 pl-[9px] my-3 *:ml-2">
              <span className="w-8">
                <span className="bg-slate-200 rounded-lg px-2 text-slate-500 text-sm truncate w-8 max-w-8">
                  {product.id.slice(0, 6)}...
                </span>
              </span>
              <span className="text-nowrap truncate">{product.name}</span>
              <span>R${product.price}</span>
              <span>{product.name.length}</span>
              <span className="truncate text-nowrap underline hover:text-highlighy-dimm">
                <Link to={product.img}>{product.img}</Link>
              </span>
              <ArrowTopRightOnSquareIcon className="size-5 text-slate-800 hover:text-highlighy-dimm cursor-pointer transition-colors duration-200" />
              <span className="flex gap-2">
                <button>
                  <LockClosedIcon className="size-5" />
                </button>
                <button>
                  <PencilSquareIcon className="size-5" />
                </button>
              </span>
            </section>
          ))}
        </article>
      </div>
    </>
  );
}

export default ListagemProduto;
