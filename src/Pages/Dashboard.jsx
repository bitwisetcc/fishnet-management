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
    <div>
      <section className="grid md:grid-cols-3 *:h-36 md:*:h-44 gap-4 mb-5">
        <div className="dashboard-panel">
          <h2>Relatório Mensal</h2>
          <span className="text-2xl md:text-3xl">R$538.976</span>
          <p className="text-sm">Aumento de 7,9% em relação ao último mês</p>
        </div>
        <div className="dashboard-panel">
          <h2>Clientes Atingidos</h2>
          <p className="flex items-center text-sm justify-between">
            <span className="text-lg md:text-3xl">72</span> Clientes distintos{" "}
            <span className="flex items-center gap-1">
              <Square2StackIcon className="size-4 inline" />5
            </span>
          </p>
          <p className="flex items-center text-sm justify-between mb-4">
            <span className="text-lg md:text-3xl">105</span> Compras realizadas{" "}
            <span className="flex items-center gap-1">
              <Square2StackIcon className="size-4 inline" />5
            </span>
          </p>
        </div>

        <div className="dashboard-panel">
          <h2>Atalhos</h2>
          <p className="flex items-center justify-between text-lg">
            Backup de Dados
            <LinkIcon className="size-4 inline hover:text-[#E29578] transition-colors duration-300" />
          </p>
          <p className="flex items-center justify-between text-lg mb-5">
            Exportar dados
            <LinkIcon className="size-4 inline hover:text-[#E29578] transition-colors duration-300" />
          </p>
        </div>
      </section>

      <section>
        <div className="dashboard-panel">
          <h2 className="mb-2">Relatório Anual</h2>
          <img src={graph} className="rounded shadow-1xl" alt="gráfico de vendas anual" />
        </div>
      </section>

      <section className="my-9">
        <header className="flex justify-between mb-3">
          <h2 className="text-lg">Melhores vendas</h2>
          <button className="p-1 px-3 bg-slate-300 border border-slate-300 shadow-sm rounded-lg relative group">
            Filtrar por: {timeFilter}
            <div className="panel right-0 top-10 px-10 text-left ">
              <ul className="flex flex-col gap-1 ">
                {timeFilters.map((filter) => (
                  <li
                    className="hover:text-sombra"
                    onClick={() => setTimeFilter(filter)}
                  >
                    {filter}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        </header>

        <section className="flex flex-col gap-4 overflow-x-scroll md:overflow-x-hidden max-w-[calc(100vw-3rem)]">
          {clients.map((client) => (
            <div className="flex w-max md:w-auto" key={client.id}>
              <img
                src={avatarApi.replace("$", client.name + 91)}
                alt="Avatar de alguém"
                className="rounded-full size-14 border border-slate-100 mr-5"
              />
              <div className="grid grid-cols-5 content-center flex-1 bg-slate-300 border border-slate-100 rounded-lg shadow-sm px-4 gap-x-3">
                <span>{client.name}</span>
                <span>{price(client.total)}</span>
                <span>
                  {new Date(client.date).toLocaleString("pt-BR").split(",")[0]}
                </span>
                <span>
                  <span
                    className={`p-1 px-2 text-sm rounded-lg font-semibold shadow-sm  ${
                      [
                        "bg-lime-400 text-lime-900",
                        "bg-amber-400 text-amber-800",
                        "bg-rose-500 text-rose-900",
                      ][client.status]
                    }`}
                  >
                    {statusMessages[client.status]}
                  </span>
                </span>
                <span className="justify-self-end">
                  <Link to="/vendas">
                    <ArrowTopRightOnSquareIcon className="size-6 hover:text-sombra  " />
                  </Link>
                </span>
              </div>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
}

export default Dashboard;
