import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type WishlistItem = {
  id: number;
  title: string;
  price: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  isInCart: (id: number) => boolean;
  getItemQty: (id: number) => number;
  updateQty: (id: number, type: "inc" | "dec") => void;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: number) => boolean;
};

const CartContext = createContext<CartContextType | null>(null);

const WishlistContext = createContext<WishlistContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      return existing
        ? prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const isInCart = (id: number) => cart.some((i) => i.id === id);

  const getItemQty = (id: number) => cart.find((i) => i.id === id)?.qty ?? 0;

  const updateQty = (id: number, type: "inc" | "dec") => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id !== id) return i;
          return type === "inc"
            ? { ...i, qty: i.qty + 1 }
            : { ...i, qty: i.qty - 1 };
        })
        .filter((i) => i.qty > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        isInCart,
        getItemQty,
        updateQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev?.some((i) => i.id === item.id)) return prev;
      return prev ? [...prev, item] : [item];
    });
  };

  const isInWishlist = (id: number) => wishlist?.some((i) => i.id === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useCart = () => useContext(CartContext)!;
export const useWishlist = () => useContext(WishlistContext)!;
