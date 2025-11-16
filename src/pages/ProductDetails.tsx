import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  IoArrowBack,
  IoCart,
  IoStar,
  IoStarOutline,
  IoAdd,
  IoRemove,
  IoCheckmarkCircle,
} from "react-icons/io5";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, isInCart, getItemQty, updateQty } = useCart();

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        role="status"
      >
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        <span className="sr-only">Loading product details</span>
      </div>
    );
  }

  if (!product) {
    return (
      <p className="p-4 text-center text-gray-600" role="alert">
        Product not found
      </p>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < Math.floor(rating) ? (
        <IoStar key={i} className="text-yellow-500" />
      ) : (
        <IoStarOutline key={i} className="text-gray-300" />
      )
    );
  };

  return (
    <main className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8" role="main">
      <div className="pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation */}
          <nav aria-label="Breadcrumb" className="mb-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700 text-sm font-medium"
              aria-label="Go back to home page"
            >
              <IoArrowBack className="text-lg" />
              Back to Home
            </Link>
          </nav>

          {/* Product Detail */}
          <article
            className="bg-white rounded-xl shadow-sm overflow-hidden"
            aria-labelledby="product-title"
            aria-describedby="product-description"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8 lg:p-5">
              
              {/* Left: Image */}
              <figure className="flex items-center justify-center rounded-lg p-8 lg:p-12">
                <img
                  src={product.image}
                  alt={`Image of ${product.title}`}
                  className="w-full h-auto max-h-96 object-contain"
                  loading="eager"
                />
              </figure>

              {/* Right: Product Info */}
              <section className="flex flex-col justify-between space-y-4">
                
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full uppercase tracking-wide">
                  {product.category}
                </span>

                <h1 id="product-title" className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                  {product.title}
                </h1>

                {product.rating && (
                  <p
                    className="flex items-center gap-3"
                  >
                    <span className="flex items-center gap-1">
                      {renderStars(product.rating.rate)}
                    </span>
                    <span className="text-sm text-gray-600">
                      {product.rating.rate} ({product.rating.count} reviews)
                    </span>
                  </p>
                )}

                {/* Price */}
                <p className="py-4 border-y border-gray-200 text-4xl font-bold text-gray-900">
                 ₹{product.price.toLocaleString("en-IN")}
                </p>

                {/* Description */}
                <section aria-labelledby="product-description-heading">
                  <h2 id="product-description-heading" className="text-lg font-semibold text-gray-900 mb-2">
                    Product Description
                  </h2>
                  <p id="product-description" className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </section>

                {/* Cart Logic */}
                <section className="pt-4">
                  {isInCart(product.id) ? (
                    <>
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg">
                        <IoCheckmarkCircle className="text-xl" />
                        <span className="text-sm font-medium">Item added to cart</span>
                      </div>

                      <div className="flex items-center gap-4 pt-4">
                        <span className="text-sm font-medium text-gray-700">Quantity:</span>
                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                          <button
                            type="button"
                            onClick={() => updateQty(product.id, "dec")}
                            aria-label="Decrease quantity"
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-200 transition"
                          >
                            <IoRemove className="text-gray-700" />
                          </button>

                          <span aria-live="polite" className="text-lg font-bold text-gray-900">
                            {getItemQty(product.id)}
                          </span>

                          <button
                            type="button"
                            onClick={() => updateQty(product.id, "inc")}
                            aria-label="Increase quantity"
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-200 transition"
                          >
                            <IoAdd className="text-gray-700" />
                          </button>
                        </div>
                      </div>

                      {/* Go to Cart Button */}
                      <Link
                        to="/cart"
                        className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold text-lg shadow-md"
                      >
                        <IoCart className="text-2xl" />
                        Go to Cart
                      </Link>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          image: product.image,
                          qty: 1,
                        })
                      }
                      aria-label="Add product to cart"
                      className="w-full sm:w-auto flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl"
                    >
                      <IoCart className="text-2xl" />
                      Add to Cart
                    </button>
                  )}
                </section>


              </section>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
