import React, { useContext } from "react";
import { TitleContext } from "../App";

const CadastroUsuarios = () => {
  const setTitle = useContext(TitleContext);
  setTitle("Cadastro de Usuários");
  return <h1>Isso é somente um teste</h1>;
};

export default CadastroUsuarios;
