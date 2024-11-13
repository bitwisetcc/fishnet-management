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
import { API_URL } from "../lib/query";

const ListagemVendas = () => {
  const setTitle = useContext(TitleContext);
  useEffect(() => {
    console.log("Executando setTitle");
    setTitle((prevTitle) => {
      if (prevTitle !== "Vendas") {
        return "Vendas";
      }
      return prevTitle;
    });
  }, [setTitle]);

  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState([10, 500]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [dataOrder, setDataOrder] = useState("none");


  // Função para buscar os dados da API
  useEffect(() => {
    const fetchSalesData = async () => {
      // Condiciona o ordering para ser adicionado apenas quando for +date ou -date
      const ordering = (dataOrder === "asc") ? "-date" : (dataOrder === "desc" ? "+date" : "");
  
      try {
        // Só inclui o parâmetro ordering na URL se ele tiver valor
        const url = ordering ? `${API_URL}/sales/filter?ordering=${ordering}` : `${API_URL}/sales/filter`;
  
        const response = await fetch(url);
        console.log(response);
  
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados de vendas");
        }
  
        const data = await response.json();
        setSales(data);
        setFilteredSales(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchSalesData();
  }, [dataOrder]);

  const statusMessages = ["Pendente", "Finalizado", "Cancelado"];

  const getReportUrl = (saleId) => {
    return `${API_URL}/reports/${saleId}`; 
  };

  const handleSortByData = () => {
    const newDataOrder = dataOrder === "none" ? "asc" : dataOrder === "asc" ? "desc" : "none";
    setDataOrder(newDataOrder);
  };

  
  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
          name="minDate"
          id="minDate"
          value={minDate}
          onChange={(e) => setMinDate(e.target.value)}
          className="empty:text-slate-500"
        />

        <input
          type="date"
          name="maxDate"
          id="maxDate"
          value={maxDate}
          onChange={(e) => setMaxDate(e.target.value)}
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
              min="10"
              max="1000"
              value={priceFilter[1]}
              onChange={(e) =>
                setPriceFilter([priceFilter[0], parseInt(e.target.value)])
              }
              className="accent-alt-dimm"
            />
            <div className="flex justify-between text-sm">
              <span>R$ {priceFilter[0]}</span>
              <span>R$ {priceFilter[1]}</span>
            </div>
          </div>
        </button>

        <button className="flex items-center text-slate-600 gap-1 relative group cursor-pointer">
          <CheckCircleIcon className="size-4" />
          <span>Status</span>
          <ChevronDownIcon className="size-4 ml-4" />
          <div className="panel left-0 top-10">
            <ul className="flex flex-col gap-1 text-left">
              <li
                className="hover:text-slate-800"
                onClick={() => setStatusFilter(1)}
              >
                Finalizado
              </li>
              <li
                className="hover:text-slate-800"
                onClick={() => setStatusFilter(0)}
              >
                Pendente
              </li>
              <li
                className="hover:text-slate-800"
                onClick={() => setStatusFilter(2)}
              >
                Cancelado
              </li>
            </ul>
          </div>
        </button>

        <button className="flex items-center text-slate-600 gap-1 relative group cursor-pointer">
          <FunnelIcon className="size-4" />
          <span className="text-nowrap">Outros filtros</span>
          <ChevronDownIcon className="size-4 ml-4" />
          <div className="panel right-0 top-10 px-10 text-left">
            <ul className="flex flex-col gap-1">
              <li
                className="hover:text-slate-800"
                onClick={() => setPaymentMethodFilter("mastercard")}
              >
                mastercard
              </li>
              <li
                className="hover:text-slate-800"
                onClick={() => setPaymentMethodFilter("visa")}
              >
                visa
              </li>
              <li
                className="hover:text-slate-800"
                onClick={() => setPaymentMethodFilter("pix")}
              >
                pix
              </li>
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
          <header className="listing col-span-8 text-slate-500">
            <span>
              <span className="bg-slate-200 rounded-lg px-2">#</span>
            </span>
            <span>Cliente</span>
            <span>Frete</span>
            <span>Total</span>
            <span>Pagamento</span>
            <span>Status</span>
            <span className="font-semibold cursor-pointer" onClick={handleSortByData}>
              Data {dataOrder === "desc" ? "↓" : dataOrder === "asc" ? "↑" : "↕"}
            </span>
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
                    ["bg-amber-400", "bg-lime-400", "bg-rose-500"][sale.status]
                  }`}
                >
                  {statusMessages[sale.status]}
                </span>
              </span>
              <span>{new Date(sale.date).toLocaleDateString("pt-BR")}</span>
              <span>
                <Tippy content="Relatório">
                  <a
                    className="action"
                    href={getReportUrl(sale._id)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <DocumentTextIcon className="size-5" />
                  </a>
                </Tippy>
              </span>
            </section>
          ))}
        </article>
      </div>

      {/*<footer className="flex justify-between my-8 items-center">
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
      </footer> */}
    </>
  );
};

export default ListagemVendas;
