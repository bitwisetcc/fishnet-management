import {
  CheckCircleIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import Tippy from "@tippyjs/react";
import React, { useContext, useEffect, useState } from "react";
import { TitleContext } from "../App";
import ListingFilter from "../components/ListingFilter";
import { price } from "../lib/format";
import { API_URL } from "../lib/query"; // Importando API_URL

const ListagemVendas = () => {
  const setTitle = useContext(TitleContext);
  setTitle("Vendas");

  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Função para buscar os dados da API
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(`${API_URL}/sales/filter`); // Usando fetch para buscar dados
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados de vendas");
        }
        const data = await response.json(); // Convertendo a resposta para JSON
        setSales(data); // Armazenando os dados de vendas
        setFilteredSales(data); // Inicializa vendas filtradas
        console.log(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  const statusMessages = ["Pendente", "Finalizado", "Cancelado"];

  useEffect(() => {
    const filtered = sales.filter((sale) => {
      const matchesName = sale.customer.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDate = dateFilter
        ? new Date(sale.date).toLocaleDateString("pt-BR") === dateFilter
        : true;
      return matchesName && matchesDate;
    });
    setFilteredSales(filtered);
  }, [searchTerm, dateFilter, sales]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const getReportUrl = (saleId) => {
    return `${API_URL}/reports/${saleId}`; // Altere para a URL real do relatório
  };

  return (
    <>
      <ListingFilter>
        <span className="flex items-center text-slate-600 flex-1 gap-1">
          <MagnifyingGlassIcon className="size-4" />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Nome do cliente"
            maxLength={90}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full placeholder:text-slate-500 focus:outline-none"
          />
        </span>
        <input
          type="date"
          name="date"
          id="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
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
          <CheckCircleIcon className="size-4" />
          <span>Status</span>
          <ChevronDownIcon className="size-4 ml-4" />
          <div className="panel left-0 top-10">
            <ul className="flex flex-col gap-1 text-left">
              <li className="hover:text-slate-800">Finalizado</li>
              <li className="hover:text-slate-800">Pendente</li>
              <li className="hover:text-slate-800">Cancelado</li>
            </ul>
          </div>
        </button>

        <button className="flex items-center text-slate-600 gap-1 relative group cursor-pointer">
          <FunnelIcon className="size-4" />
          <span className="text-nowrap">Outros filtros</span>
          <ChevronDownIcon className="size-4 ml-4" />
          <div className="panel right-0 top-10 px-10 text-left">
            <ul className="flex flex-col gap-1">
              <li className="hover:text-slate-800">Pagamento</li>
              <li className="hover:text-slate-800">Frete</li>
              <li className="hover:text-slate-800">Empresa</li>
              <li className="hover:text-slate-800">Pessoal</li>
            </ul>
          </div>
        </button>
      </ListingFilter>

      <header className="flex justify-end gap-3 my-4">
        <button className="action">
          <PrinterIcon className="size-5" />
          Imprimir
        </button>
      </header>

      <div className="overflow-x-scroll md:overflow-x-hidden">
        <article className="grid grid-cols-[60px_repeat(6,1fr)_70px] gap-4">
          {" "}
          {/* Ajuste de espaçamento entre colunas */}
          <header className="listing col-span-8 text-slate-500">
            <span>
              <span className="bg-slate-200 rounded-lg px-2">#</span>
            </span>
            <span>Cliente</span>
            <span>Frete</span>
            <span>Total</span>
            <span>Pagamento</span>
            <span>Status</span>
            <span>Data</span>
            <span>Ações</span>
          </header>
          {filteredSales.map((sale) => (
            <section
              className="grid grid-cols-subgrid col-span-8 pl-[9px] my-3 gap-2"
              key={sale._id}
            >
              {" "}
              {/* Ajuste de espaçamento entre colunas */}
              <span className="w-8">
                <span className="bg-slate-200 rounded-lg px-2 text-slate-500 text-sm truncate w-8 max-w-8">
                  {sale._id.slice(0, 4)}...
                </span>
              </span>
              <span>{sale.customer.name}</span>
              <span>
                {price(sale.shipping ?? Math.random() * 40)}
                <span className="bg-slate-200 text-stone-600 text-sm rounded-lg px-2 ml-1">
                  {sale.shippingProvider ?? "Correios"}
                </span>
              </span>
              <span>{price(sale.total)}</span>
              <span>
                <span className="bg-slate-200 rounded-lg px-2 text-stone-600">
                  {sale.payment_provider ?? sale.payment_method}
                </span>
              </span>
              <span>
                <span
                  className={`p-1 px-2 text-sm rounded-lg font-semibold shadow-sm text-black ${
                    ["bg-lime-400", "bg-amber-400", "bg-rose-500"][sale.status]
                  }`}
                >
                  {statusMessages[sale.status]}
                </span>
              </span>
              <span>
                {new Date(sale.date).toLocaleString("pt-BR").split(",")[0]}
              </span>
              <span className="flex gap-2">
                <a
                  href={getReportUrl(sale._id)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DocumentTextIcon className="size-5" />
                </a>
                <button>
                  <Tippy placement="left" content="Copiar e-mail">
                    <EnvelopeIcon className="size-5" />
                  </Tippy>
                </button>
              </span>
            </section>
          ))}
        </article>
      </div>
    </>
  );
};

export default ListagemVendas;
