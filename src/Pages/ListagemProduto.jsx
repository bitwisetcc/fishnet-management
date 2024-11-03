import {
  ArrowTopRightOnSquareIcon,
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
            <div className="field">
              <label htmlFor="txt-name">Nome do Peixe</label>
              <input
                type="text"
                name="name"
                id="txt-name"
                placeholder="Glowlight Tetra"
                maxLength={80}
              />
            </div>
            <div className="field">
              <label htmlFor="txt-scientificName">Nome científico</label>
              <input
                type="text"
                name="scientificName"
                id="txt-scientificName"
                placeholder="Hemigrammus erythrozonus"
                maxLength={80}
              />
            </div>
            <div className="field">
              <label htmlFor="txt-price">Preço</label>
              <input
                type="number"
                name="price"
                id="txt-price"
                min={0}
                max={9999}
                step={0.01}
                placeholder="29.95"
              />
            </div>
            <div className="field">
              <label htmlFor="txt-origin">Origem</label>
              <input
                type="text"
                name="origin"
                id="txt-origin"
                placeholder="Guiana"
                maxLength={50}
              />
            </div>
            <div className="field">
              <label htmlFor="txt-ph">pH ideal do ambiente</label>
              <input
                type="text"
                name="ph"
                id="txt-ph"
                placeholder="5.5 - 7.5"
                maxLength={12}
              />
            </div>
            <div className="field">
              <label htmlFor="txt-ph">Tamanho mínimo de tanque</label>
              <input
                type="text"
                name="tank_size"
                id="txt-tank_size"
                placeholder="6L"
                maxLength={7}
              />
            </div>
            <div className="field">
              <label htmlFor="txt-temperature">Temperatura</label>
              <input
                type="text"
                name="temperature"
                id="txt-temperature"
                placeholder="15 - 20ºC"
                maxLength={12}
              />
            </div>
            <div className="field">
              <label htmlFor="txt-expectancy">
                Expectativa de vida (meses)
              </label>
              <input
                type="number"
                name="expectancy"
                id="txt-expectancy"
                placeholder="30"
                max={1000}
              />
            </div>
            <div className="field">
              <label htmlFor="size">Tamanho Adulto</label>
              <input
                type="text"
                name="size"
                id="size"
                placeholder="1.3 - 2.5cm"
                maxLength={20}
              />
            </div>
            <div className="field">
              <label htmlFor="sl-feeding">Alimentação</label>
              <select name="feeding" id="sl-feeding">
                <option value="Omnivorous">Onívoro</option>
                <option value="Carnivorous">Carnívoro</option>
                <option value="Herbivorous">Herbívoro</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="txt-desc">Descrição</label>
              <input type="text" name="desc" id="txt-desc" />
            </div>

            <div className="field">
              <label>Imagens</label>
              {images.map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="url"
                    name={`image-${i}`}
                    id={`txt-img-${i}`}
                    placeholder="URL da imagem"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = images.slice();
                      newImages.splice(i, 1); // Remove a imagem da lista
                      setImages(newImages);
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Remover
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setImages([...images, ""])}
                className="mt-2 flex items-center gap-1 text-blue-dark hover:text-sky-800 transition-colors"
              >
                <PlusIcon className="size-4" />
                Adicionar Imagem
              </button>
            </div>
            <div className="flex flex-row justify-end gap-4 mt-2">
              <button className="action" type="submit">
                Cadastrar
              </button>
              <button className="alternate" type="reset">
                Limpar
              </button>
            </div>
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

    fetch(`${API_URL}/prods/`, {
      method: "GET",
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
  const [sortOrder, setSortOrder] = useState("none");
  const [priceOrder, setPriceOrder] = useState("none");

  useEffect(() => setTitle("Produtos"), [setTitle]);

  const loadProducts = async () => {
    const activeFilters = { ...filters };
    activeFilters.page = currentPage;
  
    if (priceOrder !== "none") {
      delete activeFilters.ordemAlfabetica;
      activeFilters.ordem = priceOrder === "asc" ? "crescente" : "decrescente";
    } else if (sortOrder !== "none") {
      activeFilters.ordem = sortOrder === "asc" ? "A-Z" : "Z-A";
    }
  
    try {
      const data = await getProductByFilter(activeFilters);
      console.log("Resposta da API:", data);
      if (data && Array.isArray(data)) {
        setProducts(data);
        setFilteredProducts(data);
      } else {
        console.error("Formato de dados inesperado", data);
      }
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }; 

  useEffect(() => {
    loadProducts();
  }, [filters, currentPage, sortOrder, priceOrder]);

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
    setCurrentPage(1);
  };

  const handleSortByName = () => {
    setPriceOrder("none");
    setCurrentPage(1);
    const newOrder = sortOrder === "none" ? "asc" : sortOrder === "asc" ? "desc" : "none";
    setSortOrder(newOrder);
  };

  const handleSortByPrice = () => {
    setSortOrder("none");
    setCurrentPage(1);
    const newPriceOrder = priceOrder === "none" ? "asc" : priceOrder === "asc" ? "desc" : "none";
    setPriceOrder(newPriceOrder);
  };

  return (
    <>
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
            <button className="flex items-center gap-2 relative group cursor-pointer" onClick={() => setFilteringOpen(true)}>
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
            <span className="font-semibold flex items-center justify-start cursor-pointer" onClick={handleSortByName}>
              Nome {sortOrder === "asc" ? "↓" : sortOrder === "desc" ? "↑" : ""}
            </span>
            <span className="font-semibold flex items-center justify-center cursor-pointer" onClick={handleSortByPrice}>
              Preço {priceOrder === "asc" ? "↓" : priceOrder === "desc" ? "↑" : ""}
            </span>
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
                  <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600 transition duration-200"></div>
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