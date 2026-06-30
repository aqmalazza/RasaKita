import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../lib/formatCurrency.js";

export default function FloatingCartButton({ totalItems, totalPrice }) {
  if (!totalItems) {
    return null;
  }

  return (
    <Link className="floating-cart" to="/cart">
      <span>
        <strong>{totalItems} item</strong>
        <span>{formatCurrency(totalPrice)}</span>
      </span>
      <ShoppingCart aria-hidden="true" size={22} />
    </Link>
  );
}
