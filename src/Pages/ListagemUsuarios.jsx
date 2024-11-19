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
import { listAllProducts, listUsersByRole } from "../lib/query";
import { useAuth } from "../lib/auth";


function ListagemUsuarios() {
  useAuth();
  const setTitle = useContext(TitleContext);
  setTitle("Funcionários  ");

  const [users, setUsers] = useState([]);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteringOpen, setFilteringOpen] = useState(false);

  useEffect(() => {
    listUsersByRole("staff").then(setUsers);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
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
            <span>CPF</span>
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
              <span>{user.cpf}</span>
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

export default ListagemUsuarios;
