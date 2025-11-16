import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Footer() {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalValue = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <footer className="mt-10 bg-[#31326F] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Brand */}
          <Link
            to="/"
            aria-label="Go to Home page"
            className="flex items-center gap-2"
          >
            <img
              src="/Sembark-Logo.png"
              alt="Sembark Logo"
              className="w-8 sm:w-10 object-contain"
            />
            <h2 className="font-bold text-lg tracking-wide">SEMBARK</h2>
          </Link>

          {/* Cart Summary */}
          <Link
            to="/cart"
            aria-label="Go to Cart page"
            className="text-sm sm:text-base font-medium text-center hover:underline"
          >
            Cart:{" "}
            <span className="font-semibold">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
            {" | "}
            Total:{" "}
            <span className="font-semibold">
              ₹{totalValue.toLocaleString("en-IN")}
            </span>
          </Link>
        </div>

        <hr className="border-gray-400/30 w-full" />
        
        <p className="text-xs sm:text-sm opacity-90 text-center md:text-left">
          © {new Date().getFullYear()} Sembark Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
