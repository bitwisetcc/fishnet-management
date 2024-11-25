import {
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PrinterIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { TitleContext } from "../App";
import ListingProducts from "../components/ListingProducts";
import { API_URL, getProductByFilter } from "../lib/query";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import loadingImage from "../LoadingImage.gif";

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

function FilterProduct({ open, setOpen, onSaveFilters }) {
  const [selectedEnvironment, setSelectedEnvironment] = useState(null);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [selectedBehavior, setSelectedBehavior] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const clearFilters = () => {
    setSelectedEnvironment(null);
    setSelectedDiet(null);
    setSelectedBehavior(null);
    setMinPrice('');
    setMaxPrice('');
  };

  const [filters, setFilters] = useState({
    feeding: '',
    tankSize: '',
    // Add other filters as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const selectedFilters = {
      ...filters,
      tags: selectedEnvironment,
      feeding: selectedDiet,
      behavior: selectedBehavior,
      minPrice: minPrice ? Number(minPrice) : undefined, // Convert to number or undefined if empty
      maxPrice: maxPrice ? Number(maxPrice) : undefined, // Convert to number or undefined if empty
    };
    onSaveFilters(selectedFilters); // Sends the filters to `ListagemProduto`
    setOpen(false); // Closes the modal
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center md:justify-end bg-[#11223a]/80 p-4">
        <DialogPanel className="h-full w-full sm:max-w-md md:w-[45%] lg:w-[25%] mx-0 space-y-6 rounded-lg border border-[#cbd5e1] shadow-xl bg-[#f7f9fb] p-6 md:p-8 text-[#11223a] overflow-y-auto">
          <header className="relative flex justify-between items-center mb-6">
            <DialogTitle className="font-bold text-lg sm:text-xl md:text-2xl">Filtros</DialogTitle>
            <button onClick={() => setOpen(false)} className="text-[#11223a] hover:text-[#c7ae5d]">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </header>

          {/* Seção de Filtros */}
          <section className="space-y-6">
            {/* Filtro de Ambiente */}
            <div>
              <h3 className="font-semibold text-md sm:text-lg text-[#c7ae5d]">Ambiente</h3>
              <div className="flex flex-col gap-2">
                <button
                  className={`w-full p-2 border rounded-md ${selectedEnvironment === 'fresh' ? 'bg-blue-100 border-blue-500' : 'border-[#cbd5e1] hover:bg-[#cbd5e1]'} text-[#11223a]`}
                  onClick={() => setSelectedEnvironment(selectedEnvironment === 'fresh' ? null : 'fresh')}
                >
                  🌿 Água doce
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${selectedEnvironment === 'salt' ? 'bg-blue-100 border-blue-500' : 'border-[#cbd5e1] hover:bg-[#cbd5e1]'} text-[#11223a]`}
                  onClick={() => setSelectedEnvironment(selectedEnvironment === 'salt' ? null : 'salt')}
                >
                  🌊 Água salgada
                </button>
              </div>
            </div>

            {/* Filtro de Alimentação */}
            <div>
              <h3 className="font-semibold text-md sm:text-lg text-[#c7ae5d]">Alimentação</h3>
              <div className="flex flex-col gap-2">
                <button
                  className={`w-full p-2 border rounded-md ${selectedDiet === 'herb' ? 'bg-blue-100 border-blue-500' : 'border-[#cbd5e1] hover:bg-[#cbd5e1]'} text-[#11223a]`}
                  onClick={() => setSelectedDiet(selectedDiet === 'herb' ? null : 'herb')}
                >
                  🌱 Herbívoro
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${selectedDiet === 'omni' ? 'bg-blue-100 border-blue-500' : 'border-[#cbd5e1] hover:bg-[#cbd5e1]'} text-[#11223a]`}
                  onClick={() => setSelectedDiet(selectedDiet === 'omni' ? null : 'omni')}
                >
                  🍽️ Onívoro
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${selectedDiet === 'carn' ? 'bg-blue-100 border-blue-500' : 'border-[#cbd5e1] hover:bg-[#cbd5e1]'} text-[#11223a]`}
                  onClick={() => setSelectedDiet(selectedDiet === 'carn' ? null : 'carn')}
                >
                  🍖 Carnívoro
                </button>
              </div>
            </div>

            {/* Filtro de Valores */}
            <div>
              <h3 className="font-semibold text-md sm:text-lg text-[#c7ae5d]">Valores</h3>
              <label htmlFor="min-price" className="block mb-1 text-[#11223a]">Preço mínimo: R$</label>
              <input
                type="number"
                id="min-price"
                min={0}
                step={10}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded-md border p-2 border-[#cbd5e1] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f7f9fb] text-[#11223a]"
              />
              <label htmlFor="max-price" className="block mb-1 mt-4 text-[#11223a]">Preço máximo: R$</label>
              <input
                type="number"
                id="max-price"
                min={0}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded-md border p-2 border-[#cbd5e1] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f7f9fb] text-[#11223a]"
              />
            </div>

            {/* Filtro de Comportamento Social */}
            <div>
              <h3 className="font-semibold text-md sm:text-lg text-[#c7ae5d]">Comportamento Social</h3>
              <div className="flex flex-col gap-2">
                <button
                  className={`w-full p-2 border rounded-md ${selectedBehavior === 'peaceful' ? 'bg-blue-100 border-blue-500' : 'border-[#cbd5e1] hover:bg-[#cbd5e1]'} text-[#11223a]`}
                  onClick={() => setSelectedBehavior(selectedBehavior === 'peaceful' ? null : 'peaceful')}
                >
                  🕊️ Pacífico
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${selectedBehavior === 'aggressive' ? 'bg-blue-100 border-blue-500' : 'border-[#cbd5e1] hover:bg-[#cbd5e1]'} text-[#11223a]`}
                  onClick={() => setSelectedBehavior(selectedBehavior === 'aggressive' ? null : 'aggressive')}
                >
                  🦈 Agressivo
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${selectedBehavior === 'schooling' ? 'bg-blue-100 border-blue-500' : 'border-[#cbd5e1] hover:bg-[#cbd5e1]'} text-[#11223a]`}
                  onClick={() => setSelectedBehavior(selectedBehavior === 'schooling' ? null : 'schooling')}
                >
                  🐟 Em cardume
                </button>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-4 mt-6">
              <button className="flex-1 rounded bg-[#c7ae5d] px-4 py-2 text-white hover:bg-[#11223a]" onClick={handleSave}>
                Salvar
              </button>
              <button className="flex-1 rounded px-4 py-2 border border-red-600 hover:bg-red-600 text-red-600 hover:text-white" onClick={clearFilters}>
                Limpar
              </button>
            </div>
          </section>
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
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("none");
  const [priceOrder, setPriceOrder] = useState("none");
  const [loading, setLoading] = useState(true);

  useEffect(() => setTitle("Produtos"), [setTitle]);

  const loadProducts = async () => {
    const activeFilters = { ...filters, page: currentPage };
  
    if (priceOrder !== "none") {
      delete activeFilters.ordemAlfabetica;
      activeFilters.ordem = priceOrder === "asc" ? "crescente" : "decrescente";
    } else if (sortOrder !== "none") {
      activeFilters.ordem = sortOrder === "asc" ? "A-Z" : "Z-A";
    }
  
    try {
      const { products, pageCount } = await getProductByFilter(activeFilters);
      setProducts(products); // Define a lista principal de produtos
      setFilteredProducts(products); // Atualiza a lista filtrada
      setTotalPages(pageCount); // Atualiza o número total de páginas
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [filters, currentPage, sortOrder, priceOrder]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  
    // Atualiza os filtros com o termo de pesquisa
    const updatedFilters = { ...filters, name: value };

    setFilters(updatedFilters);
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

  {/* Filtros */}

  const fetchProducts = async (appliedFilters) => {
    const filteredProducts = await getProductByFilter(appliedFilters);
    setProducts(filteredProducts);
  };

  useEffect(() => {
    loadProducts(); // Carrega os produtos ao montar o componente ou atualizar filtros
  }, [filters]);

  const handleSaveFilters = (selectedFilters) => {
    setFilters(selectedFilters);
    setCurrentPage(1);
  };

  if (loading) {
    return  <div>
    <img
      src={loadingImage}
      width={40}
      height={40}
      className="mt-5"
      alt="Carregando..."
    />
  </div>;
  }
  
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
              Nome {sortOrder === "asc" ? "↓" : sortOrder === "desc" ? "↑" : "↕"}
            </span>
            <span className="font-semibold flex items-center justify-center cursor-pointer" onClick={handleSortByPrice}>
              Preço {priceOrder === "asc" ? "↓" : priceOrder === "desc" ? "↑" : "↕"}
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
        <span>{currentPage} / {totalPages} </span>
        <button
          className="action"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Próxima
          <ChevronRightIcon className="size-5" />
        </button>
      </footer>

      <AddProduct open={registerOpen} setOpen={setRegisterOpen} />
      <FilterProduct open={filteringOpen} setOpen={setFilteringOpen} onSaveFilters={handleSaveFilters} />

    </>
  );
}

export default ListagemProduto;