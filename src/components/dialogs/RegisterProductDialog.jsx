import { useState } from "react";
import { API_URL } from "../../lib/query";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function RegisterProductDialog({ open, setOpen }) {
  const [images, setImages] = useState([""]);

  function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.pictures = [];

    for (const key in data) {
      if (key.startsWith("image-")) {
        data.pictures.push(data[key]);
        delete data[key];
      }
    }

    fetch(`${API_URL}/prods/new`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center bg-zinc-800/50 p-4">
        <DialogPanel className="h-[calc(100vh-4rem)] w-full mx-44 space-y-4 rounded-lg border border-slate-500 shadow-lg bg-slate-300 p-12 text-slate-800">
          <header className="relative">
            <DialogTitle className="font-bold">Cadastrar produto</DialogTitle>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-0 right-0"
            >
              <XMarkIcon className="size-5 text-slate-800" />
            </button>
          </header>

          <form
            className="flex flex-col gap-4 text-stone-900 overflow-y-scroll max-h-[67vh] lg:max-h-[60vh] px-2"
            onSubmit={submit}
          >
            <div className="field">
              <label htmlFor="txt-name">Nome do Peixe</label>
              <input
                type="text"
                name="name"
                id="txt-name"
                placeholder="Glowlight Tetra"
                maxLength={80}
              />
            </div>
            <div className="field">
              <label htmlFor="txt-scientificName">Nome científico</label>
              <input
                type="text"
                name="scientificName"
                id="txt-scientificName"
                placeholder="Hemigrammus erythrozonus"
                maxLength={80}
              />
            </div>
            <div className="field">
              <label htmlFor="txt-price">Preço</label>
              <input
                type="number"
                name="price"
                id="txt-price"
                min={0}
                max={9999}
                step={0.01}
                placeholder="29.95"
              />
            </div>
            <div className="field">
              <label htmlFor="txt-origin">Origem</label>
              <input
                type="text"
                name="origin"
                id="txt-origin"
                placeholder="Guiana"
                maxLength={50}
              />
            </div>
            <div className="field">
              <label htmlFor="txt-ph">pH ideal do ambiente</label>
              <input
                type="text"
                name="ph"
                id="txt-ph"
                placeholder="5.5 - 7.5"
                maxLength={12}
              />
            </div>
            <div className="field">
              <label htmlFor="txt-ph">Tamanho mínimo de tanque</label>
              <input
                type="text"
                name="tank_size"
                id="txt-tank_size"
                placeholder="6L"
                maxLength={7}
              />
            </div>
            <div className="field">
              <label htmlFor="txt-temperature">Temperatura</label>
              <input
                type="text"
                name="temperature"
                id="txt-temperature"
                placeholder="15 - 20ºC"
                maxLength={12}
              />
            </div>
            <div className="field">
              <label htmlFor="txt-expectancy">
                Expectativa de vida (meses)
              </label>
              <input
                type="number"
                name="expectancy"
                id="txt-expectancy"
                placeholder="30"
                max={1000}
              />
            </div>
            <div className="field">
              <label htmlFor="size">Tamanho Adulto</label>
              <input
                type="text"
                name="size"
                id="size"
                placeholder="1.3 - 2.5cm"
                maxLength={20}
              />
            </div>
            <div className="field">
              <label htmlFor="sl-feeding">Alimentação</label>
              <select name="feeding" id="sl-feeding">
                <option value="Omnivorous">Onívoro</option>
                <option value="Carnivorous">Carnívoro</option>
                <option value="Herbivorous">Herbívoro</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="txt-desc">Descrição</label>
              <input type="text" name="desc" id="txt-desc" />
            </div>

            <div className="field">
              <label>Imagens</label>
              {images.map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="url"
                    name={`image-${i}`}
                    id={`txt-img-${i}`}
                    placeholder="URL da imagem"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = images.slice();
                      newImages.splice(i, 1); // Remove a imagem da lista
                      setImages(newImages);
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Remover
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setImages([...images, ""])}
                className="mt-2 flex items-center gap-1 text-blue-dark hover:text-sky-800 transition-colors"
              >
                <PlusIcon className="size-4" />
                Adicionar Imagem
              </button>
            </div>
            <div className="flex flex-row justify-end gap-4 mt-2">
              <button className="action" type="submit">
                Cadastrar
              </button>
              <button className="alternate" type="reset">
                Limpar
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
