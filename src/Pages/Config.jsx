import { useContext } from "react";
import { TitleContext } from "../App";

function Config() {
  const setTitle = useContext(TitleContext);
  setTitle("Configuração");

  return (
    <>
      <h1>Em desenvolvimento</h1>
    </>
  );
}

export default Config;
