import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";

function ListingProducts({ children }) {
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
    <header ref={ref} className="bg-white bg-opacity-85 shadow-sm p-5 rounded-lg relative mb-3 ">
        {/* Lista de Produtos */}
        <div className={`${open ? "block" : "block"} `}>
            {children}
        </div>
    </header>
  );
}

export default ListingProducts;
