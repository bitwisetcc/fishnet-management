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
import { listAllProducts } from "../lib/query";

function ListagemUsuarios() {
  const setTitle = useContext(TitleContext);
  setTitle("Usuários");

  // const [products, setProds] = useState([]);
  // useEffect(() => {
  //   listAllProducts().then(setProds);
  // }, []);
  
  const users = [
    { id: "1", name: "John Doe", tel: "1234567890", email: "john@example.com", cpf: "123456789", addr: "123 Main St", uf: "CA" },
    { id: "2", name: "Jane Smith", tel: "9876543210", email: "jane@example.com", cpf: "987654321", addr: "456 Elm St", uf: "NY" },
    { id: "3", name: "Bob Johnson", tel: "5555555555", email: "bob@example.com", cpf: "555555555", addr: "789 Oak St", uf: "TX" },
    { id: "4", name: "Alice Williams", tel: "1111111111", email: "alice@example.com", cpf: "111111111", addr: "321 Pine St", uf: "FL" },
    { id: "5", name: "Mike Davis", tel: "9999999999", email: "mike@example.com", cpf: "999999999", addr: "654 Cedar St", uf: "WA" },
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
            maxLength={100}
            className="w-full placeholder:text-slate-500"
          />
        </span>
      </ListingFilter>

      <header className="flex justify-end gap-3 my-4">
        <button className="action">
          <PrinterIcon className="size-5" />
          Imprimir
        </button>
      </header>

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
            {/* <span>Insights</span> */}
            <span>Ações</span>
          </header>

          {users.map((user) => (
            <section className="grid grid-cols-subgrid col-span-8 pl-[9px] my-3 *:ml-2">
              <span className="w-8">
                <span className="bg-slate-200 rounded-lg px-2 text-slate-500 text-sm truncate w-8 max-w-8">
                  {user.id.slice(0, 6)}...
                </span>
              </span>
              <span className="text-nowrap truncate">{user.name}</span>
              <span>R${user.tel}</span>
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
