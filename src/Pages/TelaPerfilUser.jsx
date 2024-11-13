import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Tippy from "@tippyjs/react";
import React, { useContext, useEffect, useState } from "react";
import { TitleContext } from "../App";
import { useAuth } from "../lib/auth";
import { API_URL } from "../lib/query";

function TelaPerfilUser() {
  const setTitle = useContext(TitleContext);
  const [profile, setProfile] = useState({});
  const [pictureDialogOpen, setPictureDialogOpen] = useState(false);
  useAuth();

  function changeProfilePicture(profilePic) {
    fetch(`${API_URL}/users/me`, {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ picture: profilePic }),
    })
      .then((res) => {
        profile.picture = profilePic;
        setProfile(profile);
      })
      .catch(console.error);
  }

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
        <Tippy
          content="Trocar foto de perfil"
          placement="bottom"
          delay={50}
          arrow
        >
          <button onClick={() => setPictureDialogOpen(true)}>
            <img
              src={profile.picture}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          </button>
        </Tippy>
      </div>

      <div className="md:ml-8 mt-6 md:mt-0 flex-1">
        <h2 className="text-3xl font-bold text-blue-dark">{profile.name}</h2>
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

      <Dialog
        open={pictureDialogOpen}
        onClose={() => setPictureDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-stone-900/40">
          <DialogPanel className="w-3/4 lg:w-2/5 space-y-4 border bg-white p-5 rounded-lg">
            <div className="flex justify-between">
              <DialogTitle className="font-bold">
                Nova foto de perfil
              </DialogTitle>
              <button onClick={() => setPictureDialogOpen(false)}>
                <XMarkIcon className="size-5" />
              </button>
            </div>

            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                changeProfilePicture(e.target.pfp.value);
              }}
            >
              <input
                type="url"
                name="pfp"
                id="pfp"
                className="border border-stone-300 rounded shadow-sm py-1 px-2 flex-1"
              />
              <button type="submit" className="bg-alt rounded shadow p-2">
                <PaperAirplaneIcon className="size-5 text-stone-200" />
              </button>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

export default TelaPerfilUser;
