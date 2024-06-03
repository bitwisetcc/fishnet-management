import './App.css';

function App() {

  return (
    <header>
      <h1>Login do participante</h1>
        <form>
          <div>
            <label htmlFor="email">Digite o seu E-Mail:</label>
            <input type="email" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="senha">Digite a sua senha:</label>
            <input type="password" name="senha" id="senha" />
          </div>
        </form>
        <button>Entrar</button>
        <button>Limpar</button>
      
    </header>

  );

};

export default App
