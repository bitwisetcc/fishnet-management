import {
  Square2StackIcon,
  ArrowTopRightOnSquareIcon as LinkIcon,
} from "@heroicons/react/24/solid";
import { TitleContext } from "../App";
import { useContext } from "react";
import graph from "../plot.png";

function Dashboard() {
  const setTitle = useContext(TitleContext);
  setTitle("Dashboard");

  return (
    <div>
      <section className="grid grid-cols-3 h-44 gap-4 mb-5">
        <div className="dashboard-panel">
          <h2>Relatório Mensal</h2>
          <span className="text-3xl">R$538.976</span>
          <p className="text-sm">Aumento de 7,9% em relação ao último mês</p>
        </div>

        <div className="dashboard-panel">
          <h2>Clientes Atingidos</h2>
          <p className="flex items-center text-sm justify-between">
            <span className="text-3xl">72</span> Clientes distintos{" "}
            <span className="flex items-center gap-1">
              <Square2StackIcon className="size-4 inline" />5
            </span>
          </p>
          <p className="flex items-center text-sm justify-between mb-4">
            <span className="text-3xl">105</span> Compras realizadas{" "}
            <span className="flex items-center gap-1">
              <Square2StackIcon className="size-4 inline" />5
            </span>
          </p>
        </div>

        <div className="dashboard-panel">
          <h2>Atalhos</h2>
          <p className="flex items-center justify-between text-lg">
            Backup de Dados
            <LinkIcon className="size-4 inline hover:text-[#2EC4B6] transition-colors duration-300" />
          </p>
          <p className="flex items-center justify-between text-lg mb-5">
            Exportar dados
            <LinkIcon className="size-4 inline hover:text-[#2EC4B6] transition-colors duration-300" />
          </p>
        </div>
      </section>
      <section>
        <div className="dashboard-panel">
          <h2 className="mb-2">Relatório Anual</h2>
          <img src={graph} alt="gráfico de vendas anual" />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
