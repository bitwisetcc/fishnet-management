import { useContext } from "react";
import { Link } from "react-router-dom";
import { TitleContext } from "../App";
import {
  ChevronDownIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import ListingFilter from "../components/ListingFilter";

const ListagemProdtuto = () => {
  const setTitle = useContext(TitleContext);
  setTitle("Meus produtos");
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
            maxLength={90}
            className="w-full placeholder:text-slate-500"
          />
        </span>
        <input
          type="date"
          name="date"
          id="date"
          className="empty:text-slate-500"
        />

        <button className="flex items-center text-slate-600 gap-1 relative group cursor-pointer">
          <CurrencyDollarIcon className="size-4" />
          <span>Preço</span>
          <ChevronDownIcon className="size-4 ml-4" />

          <div className="panel left-0 top-10">
            <input
              type="range"
              name="price"
              id="price"
              className="accent-alt-dimm"
            />
            <div className="flex justify-between text-sm">
              <span>R$10,00</span>
              <span>R$500,00</span>
            </div>
          </div>
        </button>

        <span className="flex items-center text-slate-600 gap-1 relative group cursor-pointer">
          <FunnelIcon className="size-4" />
          <span className="text-nowrap">Outros filtros</span>
          <ChevronDownIcon className="size-4 ml-4" />

          <div className="panel right-0 top-10">
            <ul>
              <li>Água doce</li>
              <li>Água salgada</li>
              <li>Em oferta</li>
              <li>Em estoque</li>
            </ul>
          </div>
        </span>
      </ListingFilter>

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

      <article className="grid grid-cols-7 content-start">
        <header className="listing grid-cols-7 col-span-7 text-slate-500">
          <span>
            <span className="bg-slate-300 rounded-lg px-2">#</span>
          </span>
          <span>Nome</span>
          <span>Preço</span>
          <span>Estoque</span>
          <span>Foto</span>
          <span>Insights</span>
          <span>Ações</span>
        </header>

        <section className="grid grid-cols-subgrid col-span-7 pl-[9px] my-3 *:ml-2">
          <span>
            <span className="bg-slate-300 rounded-lg px-2 text-slate-500 text-sm">
              1
            </span>
          </span>
          <span>Peixe Beta</span>
          <span>R$50,00</span>
          <span>25</span>
          <span>https://example.com</span>
          <span>acessar</span>
          <span>
            <Link to="/editar">Editar</Link>
          </span>
        </section>

        <section class="grid grid-cols-subgrid col-span-7 pl-[9px] my-3 *:ml-2">
          <span>
            <span class="bg-slate-300 rounded-lg px-2 text-slate-500 text-sm">
              1
            </span>
          </span>
          <span>Lion Fish</span>
          <span>R$70,00</span>
          <span>10</span>
          <span>https://example.com</span>
          <span>acessar</span>
          <span>
            <Link to="/editar">Editar</Link>
          </span>
        </section>

        <section class="grid grid-cols-subgrid col-span-7 pl-[9px] my-3 *:ml-2">
          <span>
            <span class="bg-slate-300 rounded-lg px-2 text-slate-500 text-sm">
              1
            </span>
          </span>
          <span>Guppy</span>
          <span>R$10,00</span>
          <span>50</span>
          <span>https://example.com</span>
          <span>acessar</span>
          <span>
            <Link to="/editar">Editar</Link>
          </span>
        </section>

        <section class="grid grid-cols-subgrid col-span-7 pl-[9px] my-3 *:ml-2">
          <span>
            <span class="bg-slate-300 rounded-lg px-2 text-slate-500 text-sm">
              1
            </span>
          </span>
          <span>Angel Fish</span>
          <span>R$30,00</span>
          <span>15</span>
          <span>https://example.com</span>
          <span>acessar</span>
          <span>
            <Link to="/editar">Editar</Link>
          </span>
        </section>

        <section class="grid grid-cols-subgrid col-span-7 pl-[9px] my-3 *:ml-2">
          <span>
            <span class="bg-slate-300 rounded-lg px-2 text-slate-500 text-sm">
              1
            </span>
          </span>
          <span>Clown Fish</span>
          <span>R$25,00</span>
          <span>30</span>
          <span>https://example.com</span>
          <span>acessar</span>
          <span>
            <Link to="/editar">Editar</Link>
          </span>
        </section>

        <section class="grid grid-cols-subgrid col-span-7 pl-[9px] my-3 *:ml-2">
          <span>
            <span class="bg-slate-300 rounded-lg px-2 text-slate-500 text-sm">
              1
            </span>
          </span>
          <span>White Shark</span>
          <span>R$10.000,00 </span>
          <span>-</span>
          <span>https://example.com</span>
          <span>acessar</span>
          <span>
            <Link to="/editar" disabled>
              Editar
            </Link>
          </span>
        </section>
      </article>
    </>
  );
};

export default ListagemProdtuto;
