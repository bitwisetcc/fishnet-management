import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { TitleContext } from "../App";
import { Link } from "react-router-dom";
import { listAllProducts } from "../lib/query";

function TelaPerfilUser(){
    const setTitle = useContext(TitleContext);
    setTitle("Minha Conta");

return(
    <h2>Em andamento!</h2>
);
}


export default TelaPerfilUser;