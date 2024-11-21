import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon as LinkIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TitleContext } from "../App";
import { useAuth } from "../lib/auth";
import { price } from "../lib/format";
import { Bar } from "react-chartjs-2";
import { Chart, LinearScale, registerables } from "chart.js";
import { API_URL } from "../lib/query";

function Dashboard() {
  useAuth();
  Chart.register(LinearScale);
  Chart.register(...registerables);
  const setTitle = useContext(TitleContext);

  const [relatorio, setRelatorio] = useState({
    total_vendas: 0,
    aumento_em_porcentagem: 0,
    clientes_atingidos: 0,
    total_compras_realizadas: 0,
  });

  const [topSales, setTopSales] = useState([]);
  const [timeFilter, setTimeFilter] = useState("Mês");
  const [annualData, setAnnualData] = useState({ labels: [], data: [] });

  useEffect(() => {
    let temp = new Date()
    let minDate = new Date(0);
    let maxDate = new Date(); // right now

    switch (timeFilter) {
      case "Hoje": {
        temp.setHours(0, 0, 0, 0);
        minDate = temp;
        break;
      }
      case "Ontem": {
        temp.setHours(0, 0, 0, 0);
        maxDate = temp;
        temp.setDate(temp.getDate() - 1);
        minDate = temp;
        break;
      }
      case "Semana": {
        temp.setDate(temp.getDate() - 7);
        minDate = temp;
        break;
      }
      case "Mês": {
        temp.setMonth(temp.getMonth() - 1);
        minDate = temp;
        break;
      }
      case "Mês Passado": {
        temp.setHours(0, 0, 0, 0);
        temp.setDate(1);
        maxDate = temp;
        temp.setMonth(temp.getMonth() - 1);
        minDate = temp;
        break;
      }
      case "Ano": {
        minDate = new Date(temp.getFullYear(), 0, 0);
        break;
      }
      case "Ano passado": {
        minDate = new Date(temp.getFullYear() - 1, 0, 0);
        maxDate = new Date(temp.getFullYear(), 0, 0);
        break;
      }
      default: {
        break;
      }
    }

    const fetchData = async (url, setState) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setState(data);
      } catch (error) {
        console.error(`Erro ao buscar dados de ${url}:`, error);
      }
    };

    fetchData(`${API_URL}/dash/order`, setRelatorio);
    fetchData(
      `${API_URL}/sales/filter?count=3&ordering=-total&min_date=${minDate.getTime()}&max_date=${maxDate.getTime()}`,
      setTopSales
    );
    fetchAnnualSalesData();
  }, [timeFilter]);

  useEffect(() => {
    setTitle("Painel");
  }, [setTitle]);

  const fetchAnnualSalesData = () => {
    fetch(`${API_URL}/dash/annual-sales`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        const labels = Object.keys(data);
        const salesData = Object.values(data);
        setAnnualData({ labels, data: salesData });
      })
      .catch((error) => console.error("Erro ao buscar dados anuais:", error));
  };

  const chartData = {
    labels: annualData.labels,
    datasets: [
      {
        label: "Total de Vendas",
        data: annualData.data,
        backgroundColor: "rgba(30, 144, 255, 0.6)",
        borderColor: "rgba(255, 215, 0, 1)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "rgba(0, 0, 0, 1)",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "rgba(0, 0, 0, 1)",
        bodyColor: "rgba(255, 255, 255, 0.9)",
        callbacks: {
          label: (tooltipItem) => `R$ ${price(tooltipItem.raw)}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(0, 0, 0, 0.5)",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Vendas (R$)",
          color: "rgba(0, 0, 0, 1)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(0, 0, 0, 0.8)",
        },
      },
    },
  };

  return (
    <div className="p-5">
      <section className="grid md:grid-cols-3 gap-4 mb-5">
        <DashboardPanel
          title="Relatório Mensal"
          content={`R$ ${relatorio.total_vendas}`}
          description={`Variação de ${relatorio.aumento_em_porcentagem.toFixed(
            2
          )}% em relação ao último mês`}
        />
        <DashboardPanel title="Clientes Atingidos">
          <ClientStats
            count={relatorio.clientes_atingidos}
            label="Clientes Atingidos"
          />
          <ClientStats
            count={relatorio.total_compras_realizadas}
            label="Total de Compras"
          />
        </DashboardPanel>
        <DashboardPanel title="Atalhos">
          <Shortcut label="Backup de Dados" />
          <Shortcut label="Exportar dados" />
        </DashboardPanel>
      </section>

      <section>
        <DashboardPanel title="Relatório Anual">
          <Bar data={chartData} options={chartOptions} />
        </DashboardPanel>
      </section>

      <section className="my-9">
        <header className="flex justify-between mb-3">
          <h2 className="text-lg">Melhores vendas</h2>
          <FilterDropdown
            selectedFilter={timeFilter}
            onFilterChange={setTimeFilter}
            filters={[
              "Hoje",
              "Ontem",
              "Semana",
              "Mês",
              "Mês passado",
              "Este ano",
              "Ano passado",
            ]}
          />
        </header>
        <ClientList
          clients={topSales}
          avatarApi="https://api.dicebear.com/9.x/adventurer/svg?seed=$flip=true&radius=50&earringsProbability=25&glassesProbability=25&backgroundColor=d1d4f9,b6e3f4,c0aede,ffd5dc"
          statusMessages={["Pendente", "Finalizado", "Cancelado"]}
        />
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
    <button className="p-1 px-3 bg-slate-200 border border-slate-100 shadow-sm rounded-lg relative group">
      Filtrar por: {selectedFilter}
      <div className="panel right-0 top-10 px-10 text-left">
        <ul className="flex flex-col gap-1 ">
          {filters.map((filter) => (
            <li
              key={filter}
              className="hover:text-slate-800 cursor-pointer"
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

function ClientList({ clients: orders, avatarApi, statusMessages }) {
  return (
    <section className="flex flex-col gap-4 overflow-x-auto md:overflow-x-hidden max-w-[calc(100vw-3rem)]">
      {orders.map((order) => (
        <div className="flex w-full md:w-auto items-center" key={order._id}>
          <img
            src={avatarApi.replace("$", order.customer.name)}
            alt={`Avatar de ${order.customer.name}`}
            className="rounded-full w-14 h-14 border border-slate-100 mr-5"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 content-center flex-1 bg-branco-perolado border border-slate-400 shadow-xl rounded-lg px-4 py-2 gap-y-2 sm:gap-y-0 sm:gap-x-3">
            <span>{order.customer.name}</span>
            <span>{price(order.total)}</span>
            <span>{new Date(order.date).toLocaleDateString("pt-BR")}</span>
            <StatusBadge status={order.status} messages={statusMessages} />
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
    "bg-amber-400 text-black",
    "bg-lime-400 text-black",
    "bg-rose-500 text-black",
  ];

  return (
    <div className={`flex`}>
      <span
        className={`p-1 px-2 text-sm rounded-lg font-semibold shadow-sm ${statusStyles[status]}`}
      >
        {messages[status]}
      </span>
    </div>
  );
}

export default Dashboard;
