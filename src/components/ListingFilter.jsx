import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";

function ListingFilter({ children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null); 

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <header ref={ref} className="bg-slate-300 border border-slate-400 shadow-sm p-4 rounded-lg relative">
      {/* Botão de Filtros (apenas para mobile) */}
      <button
        className="flex items-center justify-between w-full md:hidden gap-2 bg-slate-200 border border-[#a8accf] rounded-lg p-1 px-3 text-slate-600"
        onClick={() => setOpen(!open)}
      >
        Filtros
        <ChevronDownIcon className="size-4" />
      </button>

      {/* Lista de Filtros */}
      <ul
        className={`${open ? "block" : "hidden"} md:flex flex-col md:flex-row gap-4 mt-2 md:mt-0 md:gap-6 p-3 md:p-0 bg-slate-300 md:bg-transparent border border-slate-400 md:border-none shadow-sm md:shadow-none rounded-lg md:rounded-none absolute md:static w-full md:w-auto z-10`}
      >
        {children}
      </ul>
    </header>
  );
}

export default ListingFilter;
