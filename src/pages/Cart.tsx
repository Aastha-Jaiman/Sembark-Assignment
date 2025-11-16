import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import {
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
  const cartCount = cart.length;
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
          <div className="w-full">
            {/* Large Device */}
            <div className="hidden sm:flex items-center justify-between gap-4 flex-wrap">
              <h1 className="flex items-center gap-2 md:gap-3 text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                <CgShoppingCart className="text-2xl md:text-3xl lg:text-4xl" />
                Shopping Cart
              </h1>
              <span className="text-sm md:text-base font-medium text-gray-600 bg-gray-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-gray-200">
                <span className="text-gray-700">{cartCount}</span> Products •{" "}
                <span className="text-gray-700">{totalItems}</span> Items
              </span>
            </div>

            {/* Small Devices */}
            <div className="flex sm:hidden flex-col gap-2">
              <h1 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <CgShoppingCart className="text-xl" />
                Shopping Cart
              </h1>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                <span className="bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200">
                  {cartCount} Products
                </span>
                <span className="bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200">
                  {totalItems} Items
                </span>
              </div>
            </div>
          </div>

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
                    className={`cart-remove-animation bg-white rounded-xl shadow-md p-3 sm:p-4 transition-all
  ${removing === product.id ? "remove" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-3 sm:gap-4">
                      {/* Product Image */}
                      <Link
                        to={`/product-details/${product.id}`}
                        className=" h-16 sm:h-20 bg-gray-50 rounded-lg p-2 flex items-center justify-center"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-contain"
                        />
                      </Link>

                      {/* Title + Price */}
                      <div className="flex-1 min-w-0">
                        <Link to={`/product-details/${product.id}`}>
                          <h2 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">
                            {product.title}
                          </h2>
                        </Link>

                        <p className="text-sm text-gray-600 mt-1">
                          ₹{product.price.toLocaleString("en-IN")} × {product.qty} ={" "}
                          <span className="font-semibold text-gray-900">
                             ₹{(product.price * product.qty).toLocaleString("en-IN")}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1">
                          <button
                            disabled={product.qty === 1}
                            onClick={() => updateQty(product.id, "dec")}
                            className={`w-7 h-7 flex items-center justify-center rounded
            ${
              product.qty === 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
                          >
                            <IoRemove />
                          </button>

                          <span className="font-semibold text-gray-900 text-center">
                            {product.qty}
                          </span>

                          <button
                            onClick={() => updateQty(product.id, "inc")}
                            className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded"
                          >
                            <IoAdd />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(product.id)}
                          className="bg-red-500 text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg hover:bg-red-600 transition"
                        >
                          Remove
                        </button>
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
                      <span>Shipping Charges</span>
                      <span className="font-semibold text-xl text-green-600 text-bold">
                        Free
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Charges</span>
                      <span className="font-semibold text-xl text-green-600 text-bold">
                        Free
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                    <span>To Pay</span>
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
