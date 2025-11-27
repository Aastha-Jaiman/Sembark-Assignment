import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetails";
import Navbar from "./components/Navbar";

import { CartProvider, WishlistProvider } from "./context/CartContext";
import Footer from "./components/Footer";

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product-details/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
