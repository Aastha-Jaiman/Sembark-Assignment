import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import {
  IoTrashOutline,
  IoAdd,
  IoRemove,
  IoCartOutline,
  IoArrowForward,
} from "react-icons/io5";
import { useState } from "react";
import { CgShoppingCart } from "react-icons/cg";

function Cart() {
  const { cart, removeFromCart, updateQty } = useCart();

  const [removing, setRemoving] = useState<number | null>(null);

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce(
    (sum, product) => sum + product.price * product.qty,
    0
  );
  const total = subtotal;

  const handleRemove = (id: number) => {
    setRemoving(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemoving(null);
    }, 300);
  };

  return (
    <div className="min-h-screen from-gray-50 to-blue-50/30 p-4 sm:p-6 lg:p-8">
      <div className="pt-20">
        
        <div className="max-w-7xl mx-auto">
          <h1 className="flex items-center gap-3 text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
            <CgShoppingCart /> Shopping Cart ({totalItems})
          </h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <IoCartOutline className="w-20 h-20 mx-auto text-gray-300 mb-4" />
              <p className="text-lg text-gray-600 mb-6">Your cart is empty</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
              >
                Continue Shopping <IoArrowForward />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4 py-4 overflow-hidden">
                {cart.map((product) => (
                  <div
                    key={product.id}
                    className={`cart-remove-animation bg-white rounded-xl shadow-md p-4 sm:p-6 transition-shadow
                    ${removing === product.id ? "remove" : ""}`}
                  >
                    <div className="flex gap-4">
                      <Link
                        to={`/product-details/${product.id}`}
                        aria-label={`View details for ${product.title}`}
                      >
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-lg p-2">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product-details/${product.id}`}
                          aria-label={`View details for ${product.title}`}
                        >
                          <h2 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">
                            {product.title}
                          </h2>
                        </Link>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                            <button
                              disabled={product.qty === 1}
                              onClick={() => updateQty(product.id, "dec")}
                              className={`w-8 h-8 flex items-center justify-center rounded transition active:scale-95
                                ${product.qty === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-200"}`}
                            >
                              <IoRemove />
                            </button>

                            <span className="font-bold text-gray-900 text-center">
                              {product.qty}
                            </span>

                            <button
                              onClick={() => updateQty(product.id, "inc")}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition active:scale-95"
                            >
                              <IoAdd />
                            </button>
                          </div>

                          <p className="text-lg sm:text-xl font-bold text-gray-900">
                            ₹{(product.price * product.qty).toFixed(2)}
                          </p>

                          <button
                            onClick={() => handleRemove(product.id)}
                            className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-medium hover:scale-105 transition"
                          >
                            <IoTrashOutline className="text-lg" />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-4 pb-4 border-b">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({totalItems} items)</span>
                      <span className="font-semibold">
                        ₹{subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-semibold">--</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span className="font-semibold">--</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mb-4 group">
                    Checkout
                    <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <Link
                    to="/"
                    className="block w-full text-center py-3 text-blue-600 font-medium hover:text-blue-700 transition"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        .cart-remove-animation {
          overflow: hidden;
          transition: opacity 0.3s ease, transform 0.3s ease, height 0.3s ease, margin 0.3s ease;
        }
        .cart-remove-animation.remove {
          opacity: 0;
          transform: translateX(100px);
          height: 0;
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}

export default Cart;
