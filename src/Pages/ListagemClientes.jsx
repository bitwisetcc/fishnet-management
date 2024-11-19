import React, { useState, useContext, useEffect } from "react";
import {
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

  useEffect(() => {
    listUsersByRole(["cpf", "cnpj"]).then(setUsers).catch(console.error);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
              placeholder="Produto ou ID"
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
        <article className="grid grid-cols-[90px_minmax(150px,1fr)_120px_minmax(180px,1fr)_150px_minmax(200px,1fr)_120px_90px_...]">
          <header className="listing col-span-8 text-slate-500">
            <span>
              <span className="bg-slate-200 rounded-lg px-2">#</span>
            </span>
            <span>Nome</span>
            <span>Tel</span>
            <span>Email</span>
            <span>CPF/CNPJ</span>
            <span>Endereço</span>
            <span>Cidade/UF</span>
            <span>Ações</span>
          </header>

          {filteredUsers.map((user) => (
            <section
              className="grid grid-cols-subgrid col-span-8 pl-[9px] my-3 *:ml-2"
              key={user._id}
            >
              <span className="w-8">
                <span className="bg-slate-200 rounded-lg px-2 text-slate-500 text-sm truncate w-8 max-w-8">
                  {user._id.slice(0, 6)}...
                </span>
              </span>
              <span className="text-nowrap truncate">{user.name}</span>
              <span>{user.tel}</span>
              <span>{user.email}</span>
              <span>{user.cpf || user.cnpj}</span>
              <span>{user.addr}</span>
              <span>{user.uf}</span>
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

export default ListagemClientes;
