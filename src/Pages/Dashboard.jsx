function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <section className="grid grid-cols-3 h-52 gap-4">
        <div className="rounded-lg bg-stone-100">
          <h2>Relatório Mensal</h2>
          <span>R$538.976</span>
          <p>Aumento de 7,9% em relação ao último mês</p>
        </div>
        <div className="rounded-lg bg-stone-100">
          <h2>Clientes Atingidos</h2>
          <ul>
            <li>
              <span>72</span> Clientes distintos
            </li>
            <li>
              <span>105</span> Compras realizadas
            </li>
          </ul>
        </div>
        <div className="rounded-lg bg-stone-100"></div>
      </section>
    </div>
  );
}

export default Dashboard;
