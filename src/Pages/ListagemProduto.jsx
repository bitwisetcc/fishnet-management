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
import { useContext } from "react";
import { TitleContext } from "../App";
import ListingFilter from "../components/ListingFilter";

const ListagemProdtuto = () => {
  const setTitle = useContext(TitleContext);
  setTitle("Meus produtos");

  const products = [
    {
      id: 1,
      name: "Peixe Beta",
      price: 50,
      stock: 25,
      photo: "https://example.com",
    },
    {
      id: 2,
      name: "Peixe Leão",
      price: 70,
      stock: 10,
      photo: "https://example.com",
    },
    {
      id: 3,
      name: "Guppy",
      price: 10,
      stock: 50,
      photo: "https://example.com",
    },
    {
      id: 4,
      name: "Peixe Anjo",
      price: 30,
      stock: 15,
      photo: "https://example.com",
    },
    {
      id: 5,
      name: "Peixe Palhaço",
      price: 25,
      stock: 30,
      photo: "https://example.com",
    },
    {
      id: 6,
      name: "Tubarão Branco",
      price: 10000,
      stock: 0,
      photo: "https://example.com",
    },
  ];

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

        <button className="flex items-center text-slate-600 gap-1 relative group cursor-pointer">
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
        <button className="action">
          <PlusCircleIcon className="size-5" />
          Adicionar
        </button>
        <button className="action">
          <PrinterIcon className="size-5" />
          Imprimir
        </button>
      </header>

      <article className="grid grid-cols-[60px_repeat(4,1fr)_90px_70px] content-start">
        <header className="listing col-span-7 text-slate-500">
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

        {products.map((product) => (
          <section className="grid grid-cols-subgrid col-span-7 pl-[9px] my-3 *:ml-2">
            <span>
              <span className="bg-slate-300 rounded-lg px-2 text-slate-500 text-sm">
                {product.id}
              </span>
            </span>
            <span>{product.name}</span>
            <span>R${product.price}</span>
            <span>{product.stock}</span>
            <span>{product.photo}</span>
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
    </>
  );
};

export default ListagemProdtuto;
