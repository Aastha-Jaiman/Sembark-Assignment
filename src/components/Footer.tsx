import { useCart } from "../context/CartContext";

export default function Footer() {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalValue = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <footer
      className="text-center font-semibold mt-6 p-3 bg-[#31326F] text-white"
      role="contentinfo"
    >
      <p>
        <span>
          Cart: {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
        {" | "}
        <span>
          Total: ${totalValue.toFixed(2)}
        </span>
      </p>
    </footer>
  );
}
