import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function Home() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const q = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "";
  const catParam = searchParams.get("cat") || "";
  const selectedCats = catParam ? catParam.split(",").filter(Boolean) : [];

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      if (selectedCats.length === 0) {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        const formatted: Product[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          category: item.category,
          description: item.description,
          rating: item.rating,
        }));

        setProducts(formatted);
      } else {
        const requests = selectedCats.map((cat) =>
          fetch(
            `https://fakestoreapi.com/products/category/${encodeURIComponent(
              cat
            )}`
          ).then((r) => r.json())
        );

        const all = await Promise.all(requests);
        const merged = all.flat();

        const formatted: Product[] = merged.map((item: any) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          category: item.category,
          description: item.description,
          rating: item.rating,
        }));

        const unique = Array.from(
          new Map(formatted.map((p) => [p.id, p])).values()
        );
        setProducts(unique);
      }
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [selectedCats.length, catParam]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, catParam]);

  const filtered = products
    .filter((p) => p.title.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      return 0;
    });

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8" role="main">
      <div className="pt-20">
        <div className="max-w-8xl mx-auto">
          <div className="grid gap-6 lg:grid-cols-4">
            <section
              className="block lg:hidden order-1"
              aria-labelledby="results-heading"
            >
              <header className="bg-white rounded-lg shadow-sm p-4 mb-2">
                <h1
                  id="results-heading"
                  className="text-xl font-bold text-gray-900"
                >
                  {q ? `Results for "${q}"` : "Total Products"}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold text-fuchsia-600">
                    {filtered.length}
                  </span>{" "}
                  products found
                </p>
              </header>
            </section>

            <aside
              className="lg:col-span-1 bg-white rounded-lg shadow-sm order-2 lg:order-1"
              aria-label="Product Filters"
            >
              <FilterBar onChange={() => {}} />
            </aside>

            {/* PRODUCTS SECTION */}
            <section
              className="lg:col-span-3 order-3 lg:order-2"
              aria-labelledby="results-heading"
            >
              <header className="hidden lg:block bg-white rounded-lg shadow-sm p-4 mb-6">
                <h1
                  id="results-heading"
                  className="text-xl font-bold text-gray-900"
                >
                  {q ? `Results for "${q}"` : "Total Products"}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold text-fuchsia-600">
                    {filtered.length}
                  </span>{" "}
                  products found
                </p>
              </header>

              {error && (
                <div
                  role="alert"
                  className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
                >
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {loading && (
                <div role="status" className="flex justify-center py-20">
                  <div className="w-12 h-12 border-4 border-gray-200 border-t-fuchsia-600 rounded-full animate-spin" />
                  <span className="sr-only">Loading products</span>
                </div>
              )}

              {!loading &&
                !error &&
                (filtered.length === 0 ? (
                  <div
                    role="status"
                    className="bg-white rounded-lg shadow-sm p-12 text-center"
                  >
                    <p className="text-gray-600">
                      {q
                        ? `No products found for "${q}"`
                        : "No products match your filters"}
                    </p>
                  </div>
                ) : (
                  <ul
                    className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    role="list"
                  >
                    {filtered.map((p) => (
                      <li
                        key={p.id}
                        className="transition-transform hover:scale-105"
                      >
                        <ProductCard product={p} />
                      </li>
                    ))}
                  </ul>
                ))}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
