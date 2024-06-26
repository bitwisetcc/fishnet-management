import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import CadastroProdutos from "./Pages/CadastroProdutos";
import ListagemVendas from "./Pages/ListagemVendas";
import ListagemProduto from "./Pages/ListagemProduto";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Header from "./components/Header";

export const TitleContext = createContext("");

const App = () => {
  const [title, setTitle] = useState("");
  const escapeLayout = title === "Login";

  return (
    <Router>
      <TitleContext.Provider value={setTitle}>
        <div className="flex min-h-[100vh] items-stretch bg-backnav-light">
          {escapeLayout || <NavBar />}
          <div className="flex-1">
            {escapeLayout || <Header title={title} />}
            <main className={escapeLayout ? "" : "mx-7 md:ml-0 md:mr-8"}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* <Route path="/users" element={<ListagemUsuarios />} />
                <Route path="/users/new" element={<CadastroUsuarios />} /> */}
                <Route path="/prods" element={<ListagemProduto />} />
                <Route path="/prods/new" element={<CadastroProdutos />} />
                <Route path="/vendas" element={<ListagemVendas />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<h1>Página não encontrada</h1>} />
              </Routes>
            </main>
          </div>
        </div>
      </TitleContext.Provider>
    </Router>
  );
};

const Header = ({ title }) => {
  return (
    <header className="flex flex-row items-center justify-between mr-7 my-6">
      <h1 className="text-4xl  font-bold text-white">{title}</h1>
      <img
        className="rounded-full size-14 shadow-sm object-cover"
        src={perfilphoto}
        alt="Perfil"
      />
    </header>
  );
};   

export default App;
