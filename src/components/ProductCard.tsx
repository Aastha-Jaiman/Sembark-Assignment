import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { BiCartAdd, BiStar } from "react-icons/bi";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  rating?: { rate: number; count: number };
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, isInCart, getItemQty, updateQty } = useCart();

  const inCart = isInCart(product.id);
  const qty = getItemQty(product.id);

  return (
    <article
      className="group block border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-xl hover:border-fuchsia-200 transition-all duration-300 relative"
    >
      <div className="absolute top-2 right-2 z-20">
        {!inCart ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                qty: 1,
              });
            }}
            className="bg-gray-200 text-black p-2 rounded-full shadow hover:bg-gray-300 transition"
            aria-label="Add to cart"
          >
            <BiCartAdd size={20} />
          </button>
        ) : (
          <div className="flex items-center bg-white shadow rounded-full px-2 py-1 gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                updateQty(product.id, "dec");
              }}
              className="px-2 font-bold"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <output aria-live="polite" className="text-sm font-semibold">
              {qty}
            </output>

            <button
              onClick={(e) => {
                e.preventDefault();
                updateQty(product.id, "inc");
              }}
              className="px-2 font-bold"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}
      </div>

      <Link
        to={`/product-details/${product.id}`}
      >
        <figure className="relative p-4 flex items-center justify-center h-44 from-gray-50 to-white overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-36 object-contain group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </figure>

        <div className="p-4 space-y-3">
          <h3
            id={`product-title-${product.id}`}
            className="text-sm font-semibold text-gray-800 line-clamp-2 h-10 leading-5"
          >
            {product.title}
          </h3>

          <footer className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price.toFixed(2)}
            </span>

            {product.rating ? (
              <div
                className="flex items-center gap-1 text-xs bg-yellow-50 px-2 py-1 rounded-full"
                >
                <span className="text-yellow-500"><BiStar /></span>
                <span className="font-semibold text-gray-700">
                  {product.rating.rate}
                </span>
                <span className="text-gray-500">({product.rating.count})</span>
              </div>
            ) : (
              <span className="text-xs text-gray-400 italic">No reviews</span>
            )}
          </footer>
        </div>
      </Link>
    </article>
  );
}
