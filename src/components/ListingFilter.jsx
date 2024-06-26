import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function ListingFilter({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <header className="bg-cyan-100 border border-slate-300 shadow-sm p-4 rounded-lg relative">
      <button
        className="flex items-center justify-between w-full md:hidden gap-2 bg-slate-300 border border-[#a8accf] rounded-lg p-1 px-3 text-slate-600"
        onClick={() => setOpen(!open)}
      >
        Filtros
        <ChevronDownIcon className="size-4" />
      </button>

      q
    </header>
  );
}

export default ListingFilter;
