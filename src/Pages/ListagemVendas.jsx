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
import { API_URL } from "../lib/query"; // Certifique-se de que está importando corretamente

const ListagemVendas = () => {
  const setTitle = useContext(TitleContext);
  setTitle("Vendas");

  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState([10, 500]);
  const [statusFilter, setStatusFilter] = useState(""); // Para filtro de status
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");

  // Função para buscar os dados da API
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const url = new URL(`${API_URL}/sales`);

        // Adicionando filtros de busca na URL
        if (searchTerm) {
          url.searchParams.append("search", searchTerm);
        }
        if (dateFilter) {
          url.searchParams.append("date", dateFilter);
        }
        if (priceFilter) {
          url.searchParams.append("min_price", priceFilter[0]);
          url.searchParams.append("max_price", priceFilter[1]);
        }
        if (statusFilter) {
          url.searchParams.append("status", statusFilter);
        }
        if (paymentMethodFilter) {
          url.searchParams.append("payment_method", paymentMethodFilter);
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados de vendas");
        }

        const data = await response.json(); // Convertendo a resposta para JSON
        if (Array.isArray(data)) {
          setSales(data); // Armazenando os dados de vendas
          setFilteredSales(data); // Inicializa vendas filtradas
        } else {
          setError("Estrutura de dados inválida");
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [searchTerm, dateFilter, priceFilter, statusFilter, paymentMethodFilter]); // Recarregar sempre que os filtros mudarem

  const statusMessages = {
    done: "Finalizado",
    ongoing: "Pendente",
    canceled: "Cancelado",
  };

  const getReportUrl = (saleId) => {
    return `${API_URL}/reports/${saleId}`; // Altere para a URL real do relatório
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
              min="10"
              max="500"
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
                onClick={() => setStatusFilter("done")}
              >
                Finalizado
              </li>
              <li
                className="hover:text-slate-800"
                onClick={() => setStatusFilter("ongoing")}
              >
                Pendente
              </li>
              <li
                className="hover:text-slate-800"
                onClick={() => setStatusFilter("canceled")}
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
                onClick={() => setPaymentMethodFilter("Cartão de crédito")}
              >
                Cartão de crédito
              </li>
              <li
                className="hover:text-slate-800"
                onClick={() => setPaymentMethodFilter("Boleto")}
              >
                Boleto
              </li>
              <li
                className="hover:text-slate-800"
                onClick={() => setPaymentMethodFilter("Pix")}
              >
                Pix
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
            <span>Data</span>
            <span>Ações</span>
          </header>
          {filteredSales.length > 0 ? (
            filteredSales.map((sale) => (
              <section
                className="grid grid-cols-subgrid col-span-8 pl-[9px] my-3 gap-2"
                key={sale._id}
              >
                <span className="w-8">
                  <span className="bg-slate-200 rounded-lg px-2 text-slate-500 text-sm truncate w-8 max-w-8">
                    {sale._id.slice(0, 4)}...
                  </span>
                </span>
                <span>{sale.user?.name || "Cliente desconhecido"}</span>
                <span>
                  {price(sale.shipping ?? Math.random() * 40)}
                  <span className="bg-slate-100 py-0.5 px-2 rounded text-xs ml-2">
                    {sale.paymentMethod || "Não especificado"}
                  </span>
                </span>
                <span>{price(sale.total)}</span>
                <span>
                  {statusMessages[sale.status] || "Status desconhecido"}
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
            ))
          ) : (
            <p className="col-span-8">Sem vendas para exibir</p>
          )}
        </article>
      </div>
    </>
  );
};

export default ListagemVendas;
