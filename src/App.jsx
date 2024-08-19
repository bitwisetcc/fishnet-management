import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import CadastroProdutos from "./Pages/CadastroProdutos";
import ListagemVendas from "./Pages/ListagemVendas";
import ListagemProduto from "./Pages/ListagemProduto";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Header from "./components/Header";
import ListagemUsuarios from "./Pages/ListagemUsuarios";
import Config from "./Pages/Config";

export const TitleContext = createContext("");

const App = () => {
  const [title, setTitle] = useState("");
  const escapeLayout = title === "Login";

  return (
    <Router>
      <TitleContext.Provider value={setTitle}>
        <div className="flex min-h-[100vh] items-stretch bg-slate-300">
          {escapeLayout || <NavBar />}
          <div className="flex-1">
            {escapeLayout || <Header title={title} />}
            <main className={escapeLayout ? "" : "mx-7 md:ml-0 md:mr-8"}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<ListagemUsuarios />} />
                {/* <Route path="/users/new" element={<CadastroUsuarios />} /> */}
                <Route path="/prods" element={<ListagemProduto />} />
                <Route path="/prods/new" element={<CadastroProdutos />} />
                <Route path="/vendas" element={<ListagemVendas />} />
                <Route path="/login" element={<Login />} />
                <Route path="/config" element={<Config />} />
                <Route path="*" element={<h1>Página não encontrada</h1>} />
              </Routes>
            </main>
          </div>
        </div>
      </TitleContext.Provider>
    </Router>
  );
};

export default App;
