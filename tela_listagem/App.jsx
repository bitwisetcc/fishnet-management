import './App.css';

function App() {

  return (
    <header>
      <h1>Cadastro de Produtos</h1>
      <nav>
        <h1>menu</h1>

        <link rel="icon" href="peixe.png" type="image/png"/>
        <li><a href="">Cadastro de produto</a></li>
        <li><a href="">Listagem de usuário</a></li>
        <li><a href="">Listagem de venda</a></li>
        <li><a href="">Destalhes do produto</a></li>
      </nav>
      <section>
          <h1>Lista de venda de produtos</h1>
          <form className='titulo'>
            <div>
              <label htmlFor="codigo">Código</label>
              <label htmlFor="nome_produto">Nome do produto</label>
              <label htmlFor="quantidade">Quantidade</label>
              <label htmlFor="preco">Preço</label>
              <label htmlFor="nome_cliente">Nome do cliente</label>
              <label htmlFor="status">Status</label>
            </div>
            </form>

            <form className="exemplo">
            <div>
              <label htmlFor="">#1234</label>
              <label htmlFor="">Peixe palhaço</label>
              <label htmlFor="">2 unidades</label>
              <label htmlFor="">R$80,00</label>
              <label htmlFor="">Cyenton marques</label>
              <label htmlFor="">Em processo</label>
            </div>
            </form>

            <form className="exemplo">
            <div>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
            </div>
            </form>

            <form className="exemplo">
            <div>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
            </div>
            </form>

            <form className="exemplo">
            <div>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
            </div>
            </form>

            <form className="exemplo">
            <div>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
              <label htmlFor=""></label>
            </div>
            </form>
      </section>
    </header>

  );

};

export default App
