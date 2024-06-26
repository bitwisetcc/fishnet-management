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

      <ul
        className={`${
          open ? "top-14 block z-10" : "-left-10 hidden md:block"
        } flex flex-col md:flex-row *:w-full md:*:w-auto bg-slate-200 border border-slate-300 shadow-sm p-3 rounded-lg md:bg-none md:border-none md:shadow-none md:p-0 md:w-auto absolute md:static justify-between gap-2 md:gap-4 *:bg-slate-300 *:border *:border-[#a8accf]  *:rounded-lg *:p-1 *:px-3 text-slate-600`}
      >
        {children}
      </ul>
    </header>
  );
}

export default ListingFilter;
