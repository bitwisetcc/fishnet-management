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
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { TitleContext } from "../App";
import ListingProducts from "../components/ListingProducts";
import { Link } from "react-router-dom";
import { API_URL, listAllProducts, getProductByFilter } from "../lib/query";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

function AddProduct({ open, setOpen }) {
  const [images, setImages] = useState([""]);

  function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.pictures = [];

    for (const key in data) {
      if (key.startsWith("image-")) {
        data.pictures.push(data[key]);
        delete data[key];
      }
    }

    fetch(`${API_URL}/prods/new`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center bg-zinc-800/50 p-4">
        <DialogPanel className="h-[calc(100vh-4rem)] w-full mx-44 space-y-4 rounded-lg border border-slate-500 shadow-lg bg-slate-300 p-12 text-slate-800">
          <header className="relative">
            <DialogTitle className="font-bold">Cadastrar produto</DialogTitle>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-0 right-0"
            >
              <XMarkIcon className="size-5 text-slate-800" />
            </button>
          </header>

          <form
            className="flex flex-col gap-4 text-stone-900 overflow-y-scroll max-h-[67vh] lg:max-h-[60vh] px-2"
            onSubmit={submit}
          >
            {/* Campos de formulário... */}
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function FilterProduct({ open, setOpen }) {
  const [images, setImages] = useState([""]);

  function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.pictures = [];

    for (const key in data) {
      if (key.startsWith("image-")) {
        data.pictures.push(data[key]);
        delete data[key];
      }
    }

    fetch(`${API_URL}/prods/new`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-end bg-zinc-800/50 p-4">
        <DialogPanel className="h-full w-full md:w-[45%] lg:w-[25%] mx-0 space-y-4 rounded-lg border border-slate-500 shadow-lg bg-slate-300 p-8 text-slate-800">
          <header className="relative">
            <DialogTitle className="font-bold text-xl">Filtros</DialogTitle>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-0 right-0"
            >
              <XMarkIcon className="size-5 text-slate-800" />
            </button>
          </header>
          <form
            className="flex flex-col gap-4 text-stone-900 overflow-y-scroll max-h-[67vh] lg:max-h-[60vh] px-2"
            onSubmit={submit}
          >
            {/* Campos de formulário... */}
          </form>
        </DialogPanel>
      </div>
    </Dialog>

  );
}

function ListagemProduto() {
  const setTitle = useContext(TitleContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [registerOpen, setRegisterOpen] = useState(false);
  const [filteringOpen, setFilteringOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20; 

  useEffect(() => setTitle("Produtos"), [setTitle]);

  // Atualiza produtos ao carregar ou mudar página/filtros
  useEffect(() => {
    const loadProducts = async () => {
      let data;
      if (Object.keys(filters).length > 0) {
        // Se houver filtros, usar getProductByFilter
        data = await getProductByFilter({ ...filters, page: currentPage, limit });
      } else {
        // Caso contrário, usar listAllProducts
        data = await listAllProducts(currentPage, limit);
      }

      setProducts(data);
      setFilteredProducts(data);
    };

    loadProducts();
  }, [filters, currentPage]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Resetar para a primeira página ao aplicar novos filtros
  };

  return (
    <>
      <AddProduct open={registerOpen} setOpen={setRegisterOpen} />
      <FilterProduct open={filteringOpen} setOpen={setFilteringOpen} />
      <ListingProducts onFilterChange={handleFilterChange}>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          {/* Barra de pesquisa */}
          <span className="flex items-center text-slate-600 flex-1 gap-1 border p-2 rounded-lg relative mb-2 md:mb-0">
            <MagnifyingGlassIcon className="size-6" />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Produto ou ID"
              maxLength={100}
              value={searchTerm}
              onChange={handleSearch}
              className="w-full placeholder:text-slate-500 focus:outline-none"
            />
          </span>

          {/* Botões */}
          <div className="flex gap-2">
            <button className="flex items-center gap-1 relative group cursor-pointer" onClick={() => setFilteringOpen(true)}>
              <FunnelIcon className="size-6" />
              <span className="hidden md:inline">Filtros</span>
            </button>

            <button className="action" onClick={() => setRegisterOpen(true)}>
              <PlusCircleIcon className="size-5" />
              <span className="hidden md:inline">Adicionar</span>
            </button>

            <button className="action">
              <PrinterIcon className="size-5" />
              <span className="hidden md:inline">Imprimir</span>
            </button>
          </div>
        </div>
      </ListingProducts>

      <div className="md:overflow-x-hidden overflow-x-scroll">
        <article className="grid">
          <header className="listing col-span-7 flex items-center bg-slate-100 p-2 rounded-lg shadow-md">
            <span className="font-semibold flex items-center justify-center">Foto</span>
            <span className="font-semibold flex items-center justify-start">Nome</span>
            <span className="font-semibold flex items-center justify-center">Preço</span>
            <span className="font-semibold flex items-center justify-center">Estoque</span>
            <span className="font-semibold flex items-center justify-center">Insights</span>
            <span className="font-semibold flex items-center justify-center">Ações</span>
            <span className="font-semibold flex items-center justify-center">Catálogo</span>
          </header>

          {filteredProducts.map((product) => (
            <section
              className="grid grid-cols-subgrid col-span-7 p-2 my-2 rounded-lg hover:bg-slate-50 transition-colors duration-200 items-center"
              key={product.id}
            >
              <span className="flex items-center justify-center truncate">
                <img 
                  src={product.pictures[0]} 
                  alt={product.name} 
                  className="w-16 h-16 object-cover rounded" 
                /> 
              </span>
              <span className="text-nowrap truncate flex flex-col items-start">
                <span>{product.name}</span>
                <span className="text-sm text-gray-500">{product.id}</span>
              </span>
              <span className="font-semibold flex items-center justify-center">R${product.price.toFixed(2)}</span>
              <span className="text-nowrap flex items-center justify-center">{product.name.length}</span>
              <span className="flex items-center justify-center">
                <ArrowTopRightOnSquareIcon className="size-5 text-slate-800 hover:text-yellow-light cursor-pointer transition-colors duration-200" />
              </span>
              <span className="flex gap-2 items-center justify-center">
                <button className="hover:text-yellow-light transition-colors duration-200">
                  <LockClosedIcon className="size-5" />
                </button>
                <button className="hover:text-yellow-light transition-colors duration-200">
                  <PencilSquareIcon className="size-5" />
                </button>
              </span>
              <span className="flex items-center justify-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 transition duration-200"></div>
                  <span className="absolute w-4 h-4 bg-white rounded-full shadow transition duration-200 peer-checked:translate-x-5 peer-checked:shadow-lg"></span>
                </label>
              </span>
            </section>
          ))}
        </article>
      </div>



      <footer className="flex justify-between my-8 items-center">
        <button
          className="action"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="size-5" />
          Anterior
        </button>
        <span>{currentPage} / 21 </span>
        <button
          className="action"
          onClick={handleNextPage}
        >
          Próxima
          <ChevronRightIcon className="size-5" />
        </button>
      </footer>
    </>
  );
}

export default ListagemProduto;
