function ListingFilter({ children }) {
  return (
    <header className="bg-slate-200 border border-slate-300 shadow-sm p-4 rounded-lg flex justify-between gap-4 *:bg-slate-300 *:border *:border-[#a8accf]  *:rounded-lg *:p-1 *:px-3">
      {children}
    </header>
  );
}

export default ListingFilter;
