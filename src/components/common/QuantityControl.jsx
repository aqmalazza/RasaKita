import { Minus, Plus } from "lucide-react";

export default function QuantityControl({
  min = 0,
  onDecrease,
  onIncrease,
  quantity,
}) {
  return (
    <div className="quantity-control" aria-label="Kontrol jumlah">
      <button
        aria-label="Kurangi jumlah"
        className="quantity-control__button"
        disabled={quantity <= min}
        onClick={onDecrease}
        type="button"
      >
        <Minus size={16} />
      </button>
      <span className="quantity-control__value">{quantity}</span>
      <button
        aria-label="Tambah jumlah"
        className="quantity-control__button"
        onClick={onIncrease}
        type="button"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
