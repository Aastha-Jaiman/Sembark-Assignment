import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IoClose, IoSearchOutline, IoChevronDown } from "react-icons/io5";

type Props = {
  onChange: () => void;
};

export default function FilterBar({ onChange }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categories, setCategories] = useState<string[]>([]);
  const [loadingCats, setLoadingCats] = useState(false);

  const [openSearch, setOpenSearch] = useState(false);
  const [openCats, setOpenCats] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  const [mobileFiltersActive, setMobileFiltersActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const selected = (searchParams.get("cat") || "").split(",").filter(Boolean);
  const sort = searchParams.get("sort") || "";
  const q = searchParams.get("q") || "";
  const hasFilters = selected.length > 0 || sort || q;

  // Handle responsive check
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Fetch categories
  useEffect(() => {
    setLoadingCats(true);
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then(setCategories)
      .finally(() => setLoadingCats(false));
  }, []);

  // Helpers
  const updateParam = (key: string, value?: string) => {
    value ? searchParams.set(key, value) : searchParams.delete(key);
    setSearchParams(searchParams);
    onChange();
  };

  const toggleCategory = (cat: string) => {
    const updated = new Set(selected);
    updated.has(cat) ? updated.delete(cat) : updated.add(cat);
    updateParam("cat", [...updated].join(",") || undefined);
  };

  const clearAll = () => {
    ["cat", "sort", "q"].forEach((key) => searchParams.delete(key));
    setSearchParams(searchParams);
    onChange();
    setMobileFiltersActive(false);
    setOpenSearch(false);
    setOpenCats(false);
    setOpenSort(false);
  };

  const showFilters = !isMobile || mobileFiltersActive;

  return (
    <aside className="bg-white rounded-xl p-4 space-y-5">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 pb-2 mt-2">
          Filters
        </h2>

        {isMobile && !mobileFiltersActive && (
          <button
            onClick={() => setMobileFiltersActive(true)}
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700"
          >
            Apply Filters
          </button>
        )}

        {hasFilters && showFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 ml-3"
          >
            <IoClose /> Clear All
          </button>
        )}
      </header>

      <hr className="border-gray-200" />

      {/* Sections visible  */}
      {showFilters && (
        <>
          {/* Search */}
          <section>
            {isMobile ? (
              <button
                onClick={() => setOpenSearch(!openSearch)}
                className="flex justify-between items-center w-full text-sm font-semibold py-2"
              >
                Search
                <IoChevronDown
                  className={`transition-transform ${
                    openSearch ? "rotate-180" : ""
                  }`}
                />
              </button>
            ) : (
              <p className="font-semibold text-sm">Search</p>
            )}

            {(openSearch || !isMobile) && (
              <div className="mt-2 relative">
                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  defaultValue={q}
                  onChange={(e) => updateParam("q", e.target.value)}
                  placeholder="Search products"
                  className="w-full border border-gray-300 pl-10 pr-3 py-2.5 rounded-lg focus:border-gray-900 text-sm"
                />
              </div>
            )}
          </section>

          {/* Categories */}
          <div>
            {isMobile ? (
              <button
                onClick={() => setOpenCats(!openCats)}
                className="flex justify-between items-center w-full text-sm font-semibold py-2"
              >
                Categories
                <IoChevronDown
                  className={`transition-transform ${
                    openCats ? "rotate-180" : ""
                  }`}
                />
              </button>
            ) : (
              <p className="font-semibold text-sm">Categories</p>
            )}

            {(openCats || !isMobile) && (
              <div className="mt-2 space-y-2">
                {loadingCats ? (
                  <p className="text-xs text-gray-500">Loading...</p>
                ) : (
                  categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selected.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 accent-gray-900"
                      />
                      <span className="capitalize text-sm text-gray-700">
                        {cat}
                      </span>
                    </label>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Selected Categories */}
          {selected.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selected.map((cat) => (
                <span
                  key={cat}
                  className="flex items-center gap-1 px-2.5 py-1 bg-gray-900 text-white text-xs rounded-full"
                >
                  {cat}
                  <button onClick={() => toggleCategory(cat)}>
                    <IoClose className="text-sm" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Sort */}
          <section>
            {isMobile ? (
              <button
                onClick={() => setOpenSort(!openSort)}
                className="flex justify-between items-center w-full text-sm font-semibold py-2"
              >
                Sort By
                <IoChevronDown
                  className={`transition-transform ${
                    openSort ? "rotate-180" : ""
                  }`}
                />
              </button>
            ) : (
              <p className="font-semibold text-sm">Sort By</p>
            )}

            {(openSort || !isMobile) && (
              <select
                value={sort}
                onChange={(e) => updateParam("sort", e.target.value)}
                className="mt-2 w-full border border-gray-300 px-3 py-2.5 rounded-lg text-sm focus:border-gray-900"
              >
                <option value="">Default Order</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
              </select>
            )}
          </section>
        </>
      )}
    </aside>
  );
}
