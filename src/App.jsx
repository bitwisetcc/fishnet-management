import { createContext, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import CadastroUsuarios from "./Pages/CadastroUsuarios";
import Config from "./Pages/Config";
import Dashboard from "./Pages/Dashboard";
import ListagemClientes from "./Pages/ListagemClientes";
import ListagemProduto from "./Pages/ListagemProduto";
import ListagemUsuarios from "./Pages/ListagemUsuarios";
import ListagemVendas from "./Pages/ListagemVendas";
import Login from "./Pages/Login";
import TelaPerfilUser from "./Pages/TelaPerfilUser";

export const TitleContext = createContext("");
export const ProfileContext = createContext({ name: "", picture: "" });

const App = () => {
  const [title, setTitle] = useState("");
  const [profile, setProfile] = useState({ name: "", picture: "" });
  const escapeLayout = title === null;

  return (
    <Router>
  <TitleContext.Provider value={setTitle}>
    <ProfileContext.Provider value={setProfile}>
      <div className="flex min-h-[100vh] bg-gray-light">
        {/* Ajusta a Navbar para que ela não seja achatada no desktop */}
        <div className="flex-shrink-0">
          {escapeLayout || <NavBar />}
        </div>
        
        <div className="flex-1 overflow-x-auto sm:overflow-x-hidden">
          {/* Ajusta a rolagem apenas no mobile */}
          {escapeLayout || <Header title={title} profile={profile} />}
          
          <main className={escapeLayout ? "" : "mx-7"}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<ListagemUsuarios />} />
              <Route path="/client" element={<ListagemClientes />} />
              <Route path="/prods" element={<ListagemProduto />} />
              <Route path="/users/new" element={<CadastroUsuarios />} />
              <Route path="/vendas" element={<ListagemVendas />} />
              <Route path="/profile" element={<TelaPerfilUser />} />
              <Route path="/login" element={<Login />} />
              <Route path="/config" element={<Config />} />
              <Route path="*" element={<h1>Página não encontrada</h1>} />
            </Routes>
          </main>
        </div>
      </div>
    </ProfileContext.Provider>
  </TitleContext.Provider>
</Router>

  );
};

export default App;
