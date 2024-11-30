import React, { useState, useContext, useEffect } from "react";
import {
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PrinterIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { TitleContext } from "../App";
import ListingFilter from "../components/ListingFilter";
import { listUsersByRole } from "../lib/query";
import { useAuth } from "../lib/auth";

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
            <span className="font-semibold flex items-center justify-center cursor-pointer" onClick={handleSortByName}>
              Nome {sortOrder === "asc" ? "↓" : sortOrder === "desc" ? "↑" : ""}
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
    </>
  );
}

export default ListagemClientes;
