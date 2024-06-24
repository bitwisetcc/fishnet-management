function ListingFilter({ children }) {
  return (
    <header className="bg-cyan-100 border border-slate-300 shadow-sm p-4 rounded-lg flex justify-between gap-4 *:bg-backnav-light *:border *:border-[#caf0f8]  *:rounded-lg *:p-1 *:px-3">
      {children}
    </header>
  );
}

export default ListingFilter;
