import React, { useContext, useEffect, useState } from "react";
import { TitleContext } from "../App";
import { API_URL } from "../lib/query";
import { useAuth } from "../lib/auth";

function TelaPerfilUser() {
  const setTitle = useContext(TitleContext);
  const [profile, setProfile] = useState({});
  useAuth(setProfile);

  useEffect(() => {
    setTitle("Minha Conta");
    fetch(`${API_URL}/users/me`, {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch(console.error);
  }, [setTitle]);

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-8 flex flex-col md:flex-row items-center border-2 border-gray-light mx-auto">
      <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-blue-dark">
        <img
          src={profile.picture}
          alt="Foto de perfil"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="md:ml-8 mt-6 md:mt-0 flex-1">
        <h2 className="text-3xl font-bold text-blue-dark">
          {profile.name}
        </h2>
        <p className="text-gray-700 mt-2">
          Vendo peixes ornamentais há mais de 20 anos, tenho bastante
          experiência no mercado.
        </p>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-blue-dark mb-4">
            Informações de Contato
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <strong className="text-yellow-light">E-mail:</strong>{" "}
              {profile.email}
            </li>
            <li>
              <strong className="text-yellow-light">Telefone:</strong> +1
              536-870-4273
            </li>
            <li>
              <strong className="text-yellow-light">Data de Nascimento:</strong>{" "}
              21/07/1983
            </li>
            <li>
              <strong className="text-yellow-light">CPF ou CNPJ:</strong>{" "}
              {profile.cpf}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TelaPerfilUser;
