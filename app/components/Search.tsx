"use client";
import { useSearch } from "@/hooks/useSearch";
const Search = () => {
  const {
    search,
    suggests,
    setSearch,
    setTheLocation,
    lastElementRef,
    autoSuggest,
  } = useSearch();

  return (
    <main className="flex w-full text-black px-10">
      <div className="relative w-full">
        <div className="mt-5">
          <input
            type="text"
            className={`w-full h-full text-lg text-black rounded-[20px] p-3 outline-none ${
              suggests.length > 0 ? "" : "border"
            }`}
            placeholder="Search Locality"
            value={search}
            onChange={autoSuggest}
          />

          {suggests.length > 0 && (
            <ul className="absolute top-full w-full -mt-2 bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto text-black z-10">
              {suggests.map((item, index) => (
                <li
                  key={item.locality_id}
                  className="p-2  cursor-pointer hover:bg-gray-100"
                  onClick={() => setTheLocation(item.area, item.locality_id)}
                  ref={index === suggests.length - 1 ? lastElementRef : null}
                >
                  {item.area}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
};

export default Search;
