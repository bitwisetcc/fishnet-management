import { useEffect, useState } from "react";
import { API_URL } from "../../lib/query";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function InsightsDialog({ open, setOpen, id }) {
  const [insights, setInsights] = useState({ total_sold: 0 });

  useEffect(() => {
    fetch(`${API_URL}/prods/getotal?product_id=${id}`)
      .then((res) => res.json())
      .then(setInsights)
      .catch(console.error);
  }, [id]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 pl-96 flex w-screen items-center justify-center bg-zinc-800/10 p-3">
        <DialogPanel className="p-6 mx-44 space-y-4 rounded-lg shadow bg-slate-300 text-slate-800 border border-slate-600">
          <header className="relative flex">
            <DialogTitle className="mr-20">
              <span className="font-bold">Insights de produto</span>
              <span className="bg-slate-400 text-sm rounded-lg font-mono p-1 px-2 ml-3">
                {id}
              </span>
            </DialogTitle>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-0 right-0"
            >
              <XMarkIcon className="size-5 text-slate-800" />
            </button>
          </header>

          <article>
            <p>Total de vendas: {insights.total_sold}</p>
          </article>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
