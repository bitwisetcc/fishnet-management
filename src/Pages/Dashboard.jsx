import {
  ArrowTopRightOnSquareIcon as LinkIcon,
  Square2StackIcon,
} from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { TitleContext } from "../App";
import graph from "../plot.png";
import { Link } from "react-router-dom";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { price } from "../lib/format";

function Dashboard() {
  const setTitle = useContext(TitleContext);
  setTitle("Dashboard");

  const avatarApi =
    "https://api.dicebear.com/9.x/adventurer/svg?seed=$flip=true&radius=50&earringsProbability=25&glassesProbability=25&backgroundColor=d1d4f9,b6e3f4,c0aede,ffd5dc";

  const statusMessages = ["Finalizado", "Pendente", "Cancelado"];

  const clients = [
    { id: 1, name: "Gabriel", total: 450, date: "2021-09-01", status: 0 },
    { id: 2, name: "Minos", total: 450, date: "2021-09-01", status: 0 },
    { id: 3, name: "Charlie", total: 450, date: "2021-09-01", status: 1 },
  ];

  const timeFilters = [
    "Hoje",
    "Ontem",
    "Semana",
    "Mês",
    "Mês passado",
    "Este ano",
    "Ano passado",
  ];

  const [timeFilter, setTimeFilter] = useState("Mês");

  return (
    <div className="p-5">
      <section className="grid md:grid-cols-3 gap-4 mb-5">
        <DashboardPanel title="Relatório Mensal" content="R$538.976" description="Aumento de 7,9% em relação ao último mês" />
        <DashboardPanel title="Clientes Atingidos">
          <ClientStats count={72} label="Clientes distintos" />
          <ClientStats count={105} label="Compras realizadas" />
        </DashboardPanel>
        <DashboardPanel title="Atalhos">
          <Shortcut label="Backup de Dados" />
          <Shortcut label="Exportar dados" />
        </DashboardPanel>
      </section>

      <section>
        <DashboardPanel title="Relatório Anual">
          <img src={graph} className="rounded shadow-1xl w-full" alt="gráfico de vendas anual" />
        </DashboardPanel>
      </section>

      <section className="my-9">
        <header className="flex justify-between mb-3">
          <h2 className="text-lg">Melhores vendas</h2>
          <FilterDropdown selectedFilter={timeFilter} onFilterChange={setTimeFilter} filters={timeFilters} />
        </header>
        <ClientList clients={clients} avatarApi={avatarApi} statusMessages={statusMessages} />
      </section>
    </div>
  );
}

function DashboardPanel({ title, content, description, children }) {
  return (
    <div className="dashboard-panel bg-blue-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {content && <span className="text-2xl md:text-3xl">{content}</span>}
      {description && <p className="text-sm">{description}</p>}
      {children}
    </div>
  );
}

function ClientStats({ count, label }) {
  return (
    <p className="flex items-center justify-between text-sm mb-2">
      <span className="text-lg md:text-3xl">{count}</span> {label}
    </p>
  );
}

function Shortcut({ label }) {
  return (
    <p className="flex items-center justify-between text-lg mb-5">
      {label}
      <LinkIcon className="size-4 inline text-black hover:text-yellow-light transition-colors duration-300" />
    </p>
  );
}

function FilterDropdown({ selectedFilter, onFilterChange, filters }) {
  return (
    <button className="p-1 px-3 bg-slate-300 border border-slate-300 shadow-sm rounded-lg relative group">
      Filtrar por: {selectedFilter}
      <div className="panel right-0 top-10 px-10 text-left">
        <ul className="flex flex-col gap-1">
          {filters.map((filter) => (
            <li
              key={filter}
              className="hover:text-yellow-light cursor-pointer"
              onClick={() => onFilterChange(filter)}
            >
              {filter}
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}

function ClientList({ clients, avatarApi, statusMessages }) {
  return (
    <section className="flex flex-col gap-4 overflow-x-auto md:overflow-x-hidden max-w-[calc(100vw-3rem)]">
      {clients.map((client) => (
        <div className="flex w-full md:w-auto items-center" key={client.id}>
          <img
            src={avatarApi.replace("$", client.name + 91)}
            alt={`Avatar de ${client.name}`}
            className="rounded-full w-14 h-14 border border-slate-100 mr-5"
          />
          <div className="grid grid-cols-5 content-center flex-1 bg-slate-300 border border-slate-100 rounded-lg shadow-sm px-4 gap-x-3">
            <span>{client.name}</span>
            <span>{price(client.total)}</span>
            <span>{new Date(client.date).toLocaleDateString("pt-BR")}</span>
            <StatusBadge status={client.status} messages={statusMessages} />
            <span className="justify-self-end">
              <Link to="/vendas">
                <ArrowTopRightOnSquareIcon className="size-6 text-black hover:text-yellow-light" />
              </Link>
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}

function StatusBadge({ status, messages }) {
  const statusStyles = [
    "bg-lime-400 text-lime-900",
    "bg-amber-400 text-amber-800",
    "bg-rose-500 text-rose-900",
  ];

  return (
    <span
      className={`p-1 px-2 text-sm rounded-lg font-semibold shadow-sm ${statusStyles[status]}`}
    >
      {messages[status]}
    </span>
  );
}

export default Dashboard;
