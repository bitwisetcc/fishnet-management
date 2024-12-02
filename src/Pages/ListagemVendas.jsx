import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  ArrowDownIcon,
  ArrowsUpDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PrinterIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Tippy from "@tippyjs/react";
import React, { useContext, useEffect, useState } from "react";
import { TitleContext } from "../App";
import ListingFilter from "../components/ListingFilter";
import { price } from "../lib/format";
import { API_URL, getSalesByFilter } from "../lib/query";
import loadingImage from "../LoadingImage.gif";

function FilterProduct({ open, setOpen, onSaveFilters }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [minData, setMinData] = useState("");
  const [maxData, setMaxData] = useState("");

  const clearFilters = () => {
    setSelectedPayment(null);
    setSelectedStatus(null);
    setMinPrice("");
    setMaxPrice("");
    setMinData("");
    setMaxData("");
  };

  const [filters, _] = useState({});

  const handleSave = () => {
    const selectedFilters = {
      ...filters,
      min_price: minPrice ? Number(minPrice) : undefined,
      max_price: maxPrice ? Number(maxPrice) : undefined,
      payment_method: selectedPayment,
      status: selectedStatus,
      min_date: minData
        ? new Date(minData).toISOString().split("T")[0]
        : undefined,
      max_date: maxData
        ? new Date(maxData).toISOString().split("T")[0]
        : undefined,
    };

    onSaveFilters(selectedFilters);
    setOpen(false);
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

            {/* Filtro de Pagamento */}
            <div>
              <h3 className="font-semibold text-md sm:text-lg text-[#c7ae5d]">
                Pagamento
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  className={`w-full p-2 border rounded-md ${
                    selectedPayment === "pix"
                      ? "bg-blue-100 border-blue-500"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedPayment(selectedPayment === "pix" ? null : "pix")
                  }
                >
                  📲 Pix
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${
                    selectedPayment === "debit"
                      ? "bg-blue-100 border-blue-500"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedPayment(
                      selectedPayment === "debit" ? null : "debit"
                    )
                  }
                >
                  💳 Débito
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${
                    selectedPayment === "credit"
                      ? "bg-blue-100 border-blue-500"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedPayment(
                      selectedPayment === "credit" ? null : "credit"
                    )
                  }
                >
                  💳 Crédito
                </button>
              </div>
            </div>

            {/* Filtro de Comportamento Social */}
            <div>
              <h3 className="font-semibold text-md sm:text-lg text-[#c7ae5d]">
                Status
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  className={`w-full p-2 border rounded-md ${
                    selectedStatus === "1"
                      ? "bg-blue-100 border-blue-500"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedStatus(selectedStatus === "1" ? null : "1")
                  }
                >
                  ✅ Finalizado
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${
                    selectedStatus === "0"
                      ? "bg-blue-100 border-blue-500"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedStatus(selectedStatus === "0" ? null : "0")
                  }
                >
                  ⏳ Pendente
                </button>
                <button
                  className={`w-full p-2 border rounded-md ${
                    selectedStatus === "2"
                      ? "bg-blue-100 border-blue-500"
                      : "border-[#cbd5e1] hover:bg-[#cbd5e1]"
                  } text-[#11223a]`}
                  onClick={() =>
                    setSelectedStatus(selectedStatus === "2" ? null : "2")
                  }
                >
                  ❌ Cancelado
                </button>
              </div>
            </div>

            {/* Filtro de datas */}
            <div>
              <h3 className="font-semibold text-md sm:text-lg text-[#c7ae5d]">
                Datas
              </h3>
              <label htmlFor="min-data" className="block mb-1 text-[#11223a]">
                Data inicial
              </label>
              <input
                type="date"
                id="min-data"
                min={0}
                step={10}
                value={minData}
                onChange={(e) => setMinData(e.target.value)}
                className="w-full rounded-md border p-2 border-[#cbd5e1] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f7f9fb] text-[#11223a]"
              />
              <label
                htmlFor="max-data"
                className="block mb-1 mt-4 text-[#11223a]"
              >
                Data final
              </label>
              <input
                type="date"
                id="max-data"
                min={0}
                step={10}
                value={maxData}
                onChange={(e) => setMaxData(e.target.value)}
                className="w-full rounded-md border p-2 border-[#cbd5e1] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f7f9fb] text-[#11223a]"
              />
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

function ListagemVendas() {
  const setTitle = useContext(TitleContext);

  useEffect(() => {
    setTitle("Vendas");
  }, [setTitle]);

  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteringOpen, setFilteringOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const [priceOrder, setPriceOrder] = useState(null);
  const [dataOrder, setDataOrder] = useState("desc");

  const processFilters = (filters) => {
    //console.log("Filtros recebidos:", filters); // Verificar os filtros aqui
    return Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== null && value !== undefined && value !== ""
      )
    );
  };

  const loadSales = async () => {
    setError(null);

    const ordering =
      dataOrder === "asc"
        ? "+date"
        : dataOrder === "desc"
        ? "-date"
        : priceOrder === "asc"
        ? "+total"
        : priceOrder === "desc"
        ? "-total"
        : sortOrder === "asc"
        ? "+customer.name"
        : sortOrder === "desc"
        ? "-customer.name"
        : "";

    const combinedFilters = processFilters({
      ...filters,
      search: searchTerm,
      ordering,
      page: currentPage,
    });

    try {
      const { sales, pageCount } = await getSalesByFilter(combinedFilters);
      setSales(sales);
      setFilteredSales(sales);
      setTotalPages(pageCount);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSales();
  }, [filters, currentPage, sortOrder, priceOrder, dataOrder, searchTerm]);

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
    setDataOrder("none");
    const newOrder =
      sortOrder === "none" ? "asc" : sortOrder === "asc" ? "desc" : "none";
    setSortOrder(newOrder);
  };

  const handleSortByPrice = () => {
    setSortOrder("none");
    setDataOrder("none");
    const newPriceOrder =
      priceOrder === "none" ? "asc" : priceOrder === "asc" ? "desc" : "none";
    setPriceOrder(newPriceOrder);
  };

  const handleSortByData = () => {
    setSortOrder("none");
    setPriceOrder("none");
    const newDataOrder =
      dataOrder === "none" ? "asc" : dataOrder === "asc" ? "desc" : "none";
    setDataOrder(newDataOrder);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Limpar o timeout anterior (se houver)
    clearTimeout(window.searchTimeout);

    // Adicionar um novo timeout para chamar a função após um atraso
    window.searchTimeout = setTimeout(() => {
      const updatedFilters = { ...filters, username: value };
      setFilters(updatedFilters);
    }, 500);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const statusMessages = ["Pendente", "Finalizado", "Cancelado"];

  const getReportUrl = (saleId) => {
    return `${API_URL}/reports/${saleId}`;
  };

  if (loading) {
    return (
      <div>
        <img
          src={loadingImage}
          width={40}
          height={40}
          className="mt-5"
          alt="Carregando..."
        />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <ListingFilter onFilterChange={handleFilterChange}>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          {/* Barra de pesquisa */}
          <span className="flex items-center text-slate-600 flex-1 gap-1 border p-2 rounded-lg relative mb-2 md:mb-0">
            <MagnifyingGlassIcon className="size-6" />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Cliente ou ID"
              maxLength={100}
              value={searchTerm}
              onChange={handleSearch}
              className="w-full placeholder:text-slate-500 focus:outline-none"
            />
          </span>

          {/* Botões */}
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 relative group cursor-pointer"
              onClick={() => setFilteringOpen(true)}
            >
              <FunnelIcon className="size-6" />
              <span className="hidden md:inline">Filtros</span>
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
            <span className="font-semibold flex items-center justify-center cursor-pointer">
              Frete
            </span>
            <span
              className="font-semibold flex items-center justify-center cursor-pointer"
              onClick={handleSortByPrice}
            >
              Total{" "}
              {priceOrder === "asc" ? (
                <ArrowDownIcon className="size-4 ml-1 mt-1" />
              ) : priceOrder === "desc" ? (
                <ArrowUpIcon className="size-4 ml-1 mt-1" />
              ) : (
                <ArrowsUpDownIcon className="size-4 ml-1 mt-1" />
              )}
            </span>
            <span className="font-semibold flex items-center justify-center cursor-pointer">
              Pagamento
            </span>
            <span className="font-semibold flex items-center justify-center cursor-pointer">
              Status
            </span>
            <span
              className="font-semibold flex items-center justify-center cursor-pointer"
              onClick={handleSortByData}
            >
              Data{" "}
              {dataOrder === "desc" ? (
                <ArrowDownIcon className="size-4 ml-1 mt-1" />
              ) : dataOrder === "asc" ? (
                <ArrowUpIcon className="size-4 ml-1 mt-1" />
              ) : (
                <ArrowsUpDownIcon className="size-4 ml-1 mt-1" />
              )}
            </span>
            <span className="font-semibold flex items-center justify-center cursor-pointer">
              Ações
            </span>
          </header>
          {filteredSales.map((sale) => (
            <section
              className="grid grid-cols-subgrid col-span-7 p-2 my-2 rounded-lg hover:bg-slate-50 transition-colors duration-200 items-center"
              key={sale._id}
            >
              {/* Ajuste de espaçamento entre colunas */}
              <span className="text-nowrap font-semibold truncate flex flex-col items-center">
                <span>{sale.customer.name}</span>
                <span className="text-sm text-gray-500">{sale._id}</span>
              </span>
              <span className="text-nowrap font-semibold truncate flex flex-col items-center">
                {price(sale.shipping ?? Math.random() * 40)}
                <span className="text-sm text-gray-500">
                  {sale.shippingProvider ?? "Correios"}
                </span>
              </span>
              <span className="font-semibold flex items-center justify-center">
                {price(sale.total)}
              </span>
              <span>
                <div className="flex items-center justify-center">
                  <span className="inline-block bg-slate-200 rounded-lg text-stone-600 font-semibold px-2 py-1">
                    {sale.payment_method}
                  </span>
                </div>
              </span>
              <span>
                <div className="flex items-center justify-center">
                  <span
                    className={`inline-block p-1 px-2 text-sm rounded-lg font-semibold shadow-sm text-black ${
                      ["bg-amber-400", "bg-lime-400", "bg-rose-500"][
                        sale.status
                      ]
                    }`}
                  >
                    {statusMessages[sale.status]}
                  </span>
                </div>
              </span>
              <span className="flex items-center justify-center">
                {new Date(sale.date).toLocaleDateString("pt-BR")}
              </span>
              <span>
                <div className="flex items-center justify-center">
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
                </div>
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
        <span>
          {currentPage} / {totalPages}{" "}
        </span>
        <button
          className="action"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Próxima
          <ChevronRightIcon className="size-5" />
        </button>
      </footer>
      <FilterProduct
        open={filteringOpen}
        setOpen={setFilteringOpen}
        onSaveFilters={handleSaveFilters}
      />
    </>
  );
}

export default ListagemVendas;
