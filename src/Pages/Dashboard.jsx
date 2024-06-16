import { Square2StackIcon } from "@heroicons/react/24/solid";
import { TitleContext } from "../App";
import { useContext } from "react";

function Dashboard() {
  const setTitle = useContext(TitleContext);
  setTitle("Dashboard");

  return (
    <div>
      <section className="grid grid-cols-3 h-52 gap-4">
        <div className="dashboard-panel">
          <h2>Relatório Mensal</h2>
          <span>R$538.976</span>
          <p>Aumento de 7,9% em relação ao último mês</p>
        </div>
        <div className="dashboard-panel">
          <h2>Clientes Atingidos</h2>
          <ul>
            <li className="flex">
              <span>72</span> Clientes distintos{" "}
              <Square2StackIcon className="size-4" />
            </li>
            <li className="flex">
              <span>105</span> Compras realizadas{" "}
              <Square2StackIcon className="size-4" />
            </li>
          </ul>
        </div>
        <div className="dashboard-panel"></div>
      </section>
    </div>
  );
}

export default Dashboard;
