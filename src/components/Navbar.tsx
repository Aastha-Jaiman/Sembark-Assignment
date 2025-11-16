import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { BiShoppingBag } from "react-icons/bi";

function Navbar() {
  const { cart } = useCart();
  // const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCount = cart.length;

  return (
    <nav
      className="bg-[#31326F] text-white fixed top-0 left-0 w-full z-50 shadow-md"
      aria-label="Main Navigation"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          aria-label="Go to Home page"
          className="flex items-center gap-2 sm:gap-3"
        >
          <img
            src="/Sembark-Logo.png"
            alt="Sembark Logo"
            className="w-8 sm:w-10 md:w-10 object-contain"
          />
          <h2 className="font-bold text-lg sm:text-xl tracking-wide">
            SEMBARK
          </h2>
        </Link>

        <div className="flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm sm:text-base font-medium transition ${
                isActive
                  ? "underline underline-offset-4"
                  : "hover:text-gray-200"
              }`
            }
            aria-label="Navigate to Home"
          >
            Home
          </NavLink>

          <NavLink to="/cart" className="relative">
            <span className="text-2xl font-bold">
              <BiShoppingBag />
            </span>

            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full"
                aria-live="polite"
              >
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
