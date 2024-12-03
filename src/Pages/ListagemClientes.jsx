import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowsUpDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PrinterIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { TitleContext } from "../App";
import ListingFilter from "../components/ListingFilter";
import { listUsersByRole } from "../lib/query";
import { useAuth } from "../lib/auth";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

function FilterClient({ open, setOpen, onSaveFilters }) {
  const [selectedEnvironment, setSelectedEnvironment] = useState(null);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [selectedBehavior, setSelectedBehavior] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const clearFilters = () => {
    setSelectedEnvironment(null);
    setSelectedDiet(null);
    setSelectedBehavior(null);
    setMinPrice("");
    setMaxPrice("");
  };

  const [filters, setFilters] = useState({
    feeding: "",
    tankSize: "",
    // Add other filters as needed
  });

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
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center md:justify-end bg-[#11223a]/80 p-4">
        <DialogPanel className="h-full w-full sm:max-w-md md:w-[45%] lg:w-[25%] mx-0 space-y-6 rounded-lg border border-[#cbd5e1] shadow-xl bg-[#f7f9fb] p-6 md:p-8 text-[#11223a] overflow-y-auto">
          <header className="relative flex justify-between items-center mb-6">
            <DialogTitle className="font-bold text-lg sm:text-xl md:text-2xl">
              Filtros
            </DialogTitle>
            <button
              onClick={() => setOpen(false)}
              className="text-[#11223a] hover:text-[#c7ae5d]"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </header>

          {/* Seção de Filtros */}
          <section className="space-y-6">
            {/* Filtro de Ambiente */}
            <div>
              <h3 className="font-semibold text-md sm:text-lg text-[#c7ae5d]">
                Ambiente
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  className={`w-full p-2 border rounded-md ${
                    selectedEnvironment === "fresh"
                      ? "bg-blue-100 border-blue-500"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedEnvironment(
                      selectedEnvironment === "fresh" ? null : "fresh"
                    )
                  }
                >
                  🌿 Água doce
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${
                    selectedEnvironment === "salt"
                      ? "bg-blue-100 border-blue-500"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedEnvironment(
                      selectedEnvironment === "salt" ? null : "salt"
                    )
                  }
                >
                  🌊 Água salgada
                </button>
              </div>
            </div>

            {/* Filtro de Alimentação */}
            <div>
              <h3 className="font-semibold text-md sm:text-lg text-[#c7ae5d]">
                Alimentação
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  className={`w-full p-2 border rounded-md ${
                    selectedDiet === "herb"
                      ? "bg-blue-100 border-blue-500"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedDiet(selectedDiet === "herb" ? null : "herb")
                  }
                >
                  🌱 Herbívoro
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${
                    selectedDiet === "omni"
                      ? "bg-blue-100 border-blue-500"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedDiet(selectedDiet === "omni" ? null : "omni")
                  }
                >
                  🍽️ Onívoro
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${
                    selectedDiet === "carn"
                      ? "bg-blue-100 border-blue-500"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedDiet(selectedDiet === "carn" ? null : "carn")
                  }
                >
                  🍖 Carnívoro
                </button>
              </div>
            </div>

            {/* Filtro de Valores */}
            <div>
              <h3 className="font-semibold text-md sm:text-lg text-[#c7ae5d]">
                Valores
              </h3>
              <label htmlFor="min-price" className="block mb-1 text-[#11223a]">
                Preço mínimo: R$
              </label>
              <input
                type="number"
                id="min-price"
                min={0}
                step={10}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded-md border p-2 border-[#cbd5e1] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f7f9fb] text-[#11223a]"
              />
              <label
                htmlFor="max-price"
                className="block mb-1 mt-4 text-[#11223a]"
              >
                Preço máximo: R$
              </label>
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
              <h3 className="font-semibold text-md sm:text-lg text-[#c7ae5d]">
                Comportamento Social
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  className={`w-full p-2 border rounded-md ${
                    selectedBehavior === "peaceful"
                      ? "bg-blue-100 border-blue-500"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedBehavior(
                      selectedBehavior === "peaceful" ? null : "peaceful"
                    )
                  }
                >
                  🕊️ Pacífico
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${
                    selectedBehavior === "aggressive"
                      ? "bg-blue-100 border-blue-500"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedBehavior(
                      selectedBehavior === "aggressive" ? null : "aggressive"
                    )
                  }
                >
                  🦈 Agressivo
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${
                    selectedBehavior === "schooling"
                      ? "bg-blue-100 border-blue-500"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedBehavior(
                      selectedBehavior === "schooling" ? null : "schooling"
                    )
                  }
                >
                  🐟 Em cardume
                </button>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-4 mt-6">
              <button
                className="flex-1 rounded bg-[#c7ae5d] px-4 py-2 text-white hover:bg-[#11223a]"
                onClick={handleSave}
              >
                Salvar
              </button>
              <button
                className="flex-1 rounded px-4 py-2 border border-red-600 hover:bg-red-600 text-red-600 hover:text-white"
                onClick={clearFilters}
              >
                Limpar
              </button>
            </div>
          </section>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function ListagemClientes() {
  useAuth();
  const setTitle = useContext(TitleContext);
  setTitle("Clientes");

  const [activeTab, setActiveTab] = useState("Todos");
  const [users, setUsers] = useState([]);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteringOpen, setFilteringOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataOrder, setDataOrder] = useState("none");
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("none");
  const [priceOrder, setPriceOrder] = useState("none");

  useEffect(() => {
    listUsersByRole(["cpf", "cnpj"]).then(setUsers).catch(console.error);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSaveFilters = (selectedFilters) => {
    setFilters(selectedFilters);
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

  const handleSortByData = () => {
    const newDataOrder = dataOrder === "none" ? "asc" : dataOrder === "asc" ? "desc" : "none";
    setDataOrder(newDataOrder);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleTabClick = (tab, role) => {
    setActiveTab(tab);
    listUsersByRole(role).then(setUsers).catch(console.error);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex gap-2 border-b mb-4">
        <button
          onClick={() => handleTabClick("Todos", ["cpf", "cnpj"])}
          className={`px-4 py-2 text-lg ${
            activeTab === "Todos" ? "border-b-2 border-yellow-light" : ""
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => handleTabClick("Pessoa Física", ["cpf"])}
          className={`px-4 py-2 text-lg ${
            activeTab === "Pessoa Física" ? "border-b-2 border-yellow-light" : ""
          }`}
        >
          Pessoa Física
        </button>
        <button
          onClick={() => handleTabClick("Pessoa Jurídica", ["cnpj"])}
          className={`px-4 py-2 text-lg ${
            activeTab === "Pessoa Jurídica" ? "border-b-2 border-yellow-light" : ""
          }`}
        >
          Pessoa Jurídica
        </button>
      </div>

      <ListingFilter>
      <div className="flex flex-col md:flex-row md:items-center gap-2">
          {/* Barra de pesquisa */}
          <span className="flex items-center text-slate-600 flex-1 gap-1 border p-2 rounded-lg relative mb-2 md:mb-0">
            <MagnifyingGlassIcon className="size-6" />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Nome do usuário"
              maxLength={100}
              value={searchTerm}
              //onChange={handleSearch}
              className="w-full placeholder:text-slate-500 focus:outline-none"
            />
          </span>

          {/* Botões */}
          <div className="flex gap-2">
            <button className="flex items-center gap-2 relative group cursor-pointer" 
            onClick={() => setFilteringOpen(true)}
            >
              <FunnelIcon className="size-6" />
              <span className="hidden md:inline">Filtros</span>
            </button>

            <button className="action">
              <PrinterIcon className="size-5" />
              <span className="hidden md:inline">Adicionar</span>
            </button>
            <button className="action">
              <PrinterIcon className="size-5" />
              <span className="hidden md:inline">Imprimir</span>
            </button>
          </div>
        </div>
      </ListingFilter>

      <div className="md:overflow-x-hidden overflow-x-scroll">
        <article className="grid">
          <header className="listing col-span-7 flex items-center bg-slate-100 p-2 rounded-lg shadow-md">
            <span
              className="font-semibold flex items-center justify-center cursor-pointer"
              onClick={handleSortByName}
            >
              Cliente{" "}
              {sortOrder === "asc" ? (
                <ArrowDownIcon className="size-4 ml-1 mt-1" />
              ) : sortOrder === "desc" ? (
                <ArrowUpIcon className="size-4 ml-1 mt-1" />
              ) : (
                <ArrowsUpDownIcon className="size-4 ml-1 mt-1" />
              )}
            </span>
            <span className="font-semibold flex items-center justify-center">Telefone</span>
            <span className="font-semibold flex items-center justify-center">Email</span>
            <span className="font-semibold flex items-center justify-center">CPF/CNPJ</span>
            <span className="font-semibold flex items-center justify-center">Endereço</span>
            <span className="font-semibold flex items-center justify-center">UF</span>
            <span className="font-semibold flex items-center justify-center">Ações</span>
          </header>

          {filteredUsers.map((user) => (
            <section
              className="grid grid-cols-subgrid col-span-7 p-2 my-2 rounded-lg hover:bg-slate-50 transition-colors duration-200 items-center"
              key={user.id}
            >
              <span className="text-nowrap truncate flex flex-col items-center">
                <span>{user.name}</span>
                <span className="text-sm text-gray-500">{user._id}</span>
              </span>
              <span className="text-nowrap flex items-center justify-center">{user.tel}</span>
              <span className="text-nowrap flex items-center justify-center">{user.email}</span>
              <span className="text-nowrap flex items-center justify-center">{user.cpf ?? user.cnpj}</span>
              <span className="text-nowrap flex items-center justify-center">{user.addr}</span>
              <span className="text-nowrap flex items-center justify-center">{user.uf}</span>
              <span className="flex gap-2 items-center justify-center">
                <button className="hover:text-yellow-light transition-colors duration-200">
                  <LockClosedIcon className="size-5" />
                </button>
                <button className="hover:text-yellow-light transition-colors duration-200">
                  <PencilSquareIcon className="size-5" />
                </button>
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
        <span>{currentPage} / 20 </span>
        <button
          className="action"
          onClick={handleNextPage}
        >
          Próxima
          <ChevronRightIcon className="size-5" />
        </button>
      </footer>

      <FilterClient
        open={filteringOpen}
        setOpen={setFilteringOpen}
        onSaveFilters={handleSaveFilters}
      />
    </>
  );
}

export default ListagemClientes;
