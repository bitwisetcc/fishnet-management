import {
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PlusIcon,
  PrinterIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { TitleContext } from "../App";
import ListingFilter from "../components/ListingFilter";
import { Link } from "react-router-dom";
import { listAllProducts } from "../lib/query";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

function ListagemProduto() {
  const setTitle = useContext(TitleContext);
  setTitle("Produtos");

  const [products, setProds] = useState([]);
  const [registerOpen, setRegisterOpen] = useState(false);
  useEffect(() => {
    listAllProducts().then(setProds);
  }, []);

  return (
    <>
      <AddProduct open={registerOpen} setOpen={setRegisterOpen} />
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
        <button className="action" onClick={() => setRegisterOpen(true)}>
          <PlusCircleIcon className="size-5" />
          Adicionar
        </button>
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
              <span className="truncate text-nowrap underline hover:text-yellow-light">
                <Link to={product.pictures[0]}>{product.pictures[0]}</Link>
              </span>
              <ArrowTopRightOnSquareIcon className="size-5 text-slate-800 hover:text-yellow-light cursor-pointer transition-colors duration-200" />
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

function AddProduct({ open, setOpen }) {
  const [images, setImages] = useState([""]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center bg-zinc-800/50 p-4">
        <DialogPanel className="h-[calc(100vh-4rem)] w-full mx-44 space-y-4 rounded-lg border border-slate-500 shadow-lg bg-slate-300 p-12 text-slate-800">
          <header>
            <DialogTitle className="font-bold">Cadastrar produto</DialogTitle>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2"
            >
              <XMarkIcon className="size-5" />
            </button>
          </header>

          <form
            action=""
            method="post"
            className="flex flex-col gap-4 text-stone-900"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="txt-name" className="font-semibold">
                Nome
              </label>
              <input
                type="text"
                name="name"
                id="txt-name"
                className="bg-stone-200 border py-1 px-2 border-stone-500 outline-none rounded focus:border-sky-600 transition-colors duration-200 focus:shadow shadow-sky-600 focus:ring-1 ring-sky-600"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="txt-namec">Nome científico</label>
              <input type="text" name="namec" id="txt-namec" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="txt-price">Preço</label>
              {images.map((image, i) => (
                <>
                  <label htmlFor={`url-img-${i}`}>Imagens</label>
                  <input type="url" name="name" id={`txt-img-${i}`} />
                </>
              ))}

              <button onClick={() => setImages(images.push(""))}>
                <PlusIcon className="size-4" />
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default ListagemProduto;
