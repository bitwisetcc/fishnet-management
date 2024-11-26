import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  CameraIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useState } from "react";
import { TitleContext } from "../App";
import { useAuth } from "../lib/auth";
import { API_URL } from "../lib/query";
import { cpf } from "../lib/format";

export default function TelaPerfilUser() {
  const setTitle = useContext(TitleContext);
  const [profile, setProfile] = useState({
    cpf: "",
    email: "",
    birthdate: Date(),
    tel: "",
  });
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
  }, [setTitle]);

  useEffect(() => {
    fetch(`${API_URL}/users/me`, {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch(console.error);
  }, []);

  return (
    <article className="flex flex-col gap-5 mb-20">
      <section className="grid md:grid-cols-2 gap-5">
        <div className="bg-slate-100 rounded-lg border border-slate-400 shadow p-4 flex flex-col md:flex-row gap-6">
          <div className="relative">
            <img
              src={profile.picture}
              alt="Foto de perfil"
              className="w-36 object-cover aspect-square rounded-full border-[3px] border-blue-dark m-auto"
            />
            <button
              onClick={() => setPictureDialogOpen(true)}
              className="bg-yellow-light p-2 absolute right-16 md:right-1 top-24 rounded-full border-2 border-blue-dark text-blue-dark"
            >
              <CameraIcon className="size-5" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-lg mb-2">{profile.name}</h2>
            <div className="flex flex-col gap-1 mb-3">
              <span className="font-semibold">E-mail:</span>
              <input
                type="email"
                name="email"
                id="email"
                className="border border-slate-300 rounded px-2 py-1"
                value={profile.email}
                onInput={(e) => {
                  profile.email = e.target.value;
                  setProfile(profile);
                }}
              />
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <span className="font-semibold">CPF:</span>
              <input
                type="text"
                name="cpf"
                id="cpf"
                className="border border-slate-300 rounded px-2 py-1"
                value={cpf(profile.cpf)}
                onInput={(e) => {
                  profile.cpf = e.target.value;
                  setProfile(profile);
                }}
              />
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <span className="font-semibold">Telefone:</span>
              <input
                type="tel"
                name="tel"
                id="tel"
                className="border border-slate-300 rounded px-2 py-1"
                value={profile.tel}
                onInput={(e) => {
                  profile.tel = e.target.value;
                  setProfile(profile);
                }}
              />
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <span className="font-semibold">Nascimento:</span>
              <input
                type="date"
                name="birthdate"
                id="birthdate"
                className="border border-slate-300 rounded px-2 py-1"
                value={profile.birthdate}
                onInput={(e) => {
                  profile.birthdate = e.target.value;
                  setProfile(profile);
                }}
              />
            </div>
          </div>
        </div>
        <div className="bg-slate-100 rounded-lg border border-slate-400 shadow p-4">
          <div className="flex flex-col gap-1 mb-3">
            <span className="font-semibold">Endereço:</span>
            <input
              type="text"
              name="addr"
              id="addr"
              className="border border-slate-300 rounded px-2 py-1"
              value={profile.addr}
              onInput={(e) => {
                profile.addr = e.target.value;
                setProfile(profile);
              }}
            />
          </div>
          <div className="flex flex-col gap-1 mb-3">
            <span className="font-semibold">Número:</span>
            <input
              type="number"
              name="number"
              id="number"
              step={1}
              max={10000}
              min={1}
              className="border border-slate-300 rounded px-2 py-1"
              value={profile.number || 1}
              onInput={(e) => {
                profile.number = e.target.value;
                setProfile(profile);
              }}
            />
          </div>
          <div className="flex flex-col gap-1 mb-3">
            <span className="font-semibold">Cidade:</span>
            <input
              type="text"
              name="city"
              id="city"
              className="border border-slate-300 rounded px-2 py-1"
              value={profile.city}
              onInput={(e) => {
                profile.city = e.target.value;
                setProfile(profile);
              }}
            />
          </div>
          <div className="flex flex-col gap-1 mb-3">
            <span className="font-semibold">Estado:</span>
            <select
              value={profile.state}
              name="state"
              id="state"
              className="border border-slate-300 rounded px-2 py-1 bg-slate-100"
            >
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>
        </div>
      </section>

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
    </article>
  );
}
