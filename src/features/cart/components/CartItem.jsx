import { Trash2 } from "lucide-react";
import Button from "../../../components/common/Button.jsx";
import OptimizedImage from "../../../components/common/OptimizedImage.jsx";
import QuantityControl from "../../../components/common/QuantityControl.jsx";
import { DEFAULT_MENU_IMAGE } from "../../../data/menuData.js";
import { formatCurrency } from "../../../lib/formatCurrency.js";

export default function CartItem({ item, onDecrease, onIncrease, onRemove }) {
  return (
    <article className="cart-item">
      <OptimizedImage
        alt={item.name}
        fallbackSrc={item.fallbackImage || DEFAULT_MENU_IMAGE}
        height={72}
        loading="lazy"
        src={item.optimizedImage || item.image}
        width={72}
      />
      <div className="cart-item__body">
        <div className="cart-item__title-row">
          <div>
            <h2>{item.name}</h2>
            <p>{formatCurrency(item.price)}</p>
          </div>
          <Button
            aria-label={`Hapus ${item.name}`}
            className="button--icon"
            onClick={() => onRemove(item.id)}
            size="sm"
            variant="ghost"
          >
            <Trash2 size={16} />
          </Button>
        </div>
        <div className="cart-item__actions">
          <QuantityControl
            onDecrease={() => onDecrease(item.id)}
            onIncrease={() => onIncrease(item)}
            quantity={item.quantity}
          />
          <strong>{formatCurrency(item.price * item.quantity)}</strong>
        </div>
      </div>
    </article>
  );
}
