import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../../components/common/Button.jsx";
import Modal from "../../../components/common/Modal.jsx";
import OptimizedImage from "../../../components/common/OptimizedImage.jsx";
import QuantityControl from "../../../components/common/QuantityControl.jsx";
import { DEFAULT_MENU_IMAGE } from "../../../data/menuData.js";
import { formatCurrency } from "../../../lib/formatCurrency.js";

export default function MenuDetailSheet({ menu, onAdd, onClose }) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [menu?.id]);

  if (!menu) {
    return null;
  }

  const handleAdd = () => {
    onAdd(menu, quantity);
    onClose();
  };

  return (
    <Modal
      footer={
        <>
          <QuantityControl
            min={1}
            onDecrease={() => setQuantity((value) => Math.max(1, value - 1))}
            onIncrease={() => setQuantity((value) => value + 1)}
            quantity={quantity}
          />
          <Button disabled={!menu.isAvailable} onClick={handleAdd}>
            <ShoppingCart size={18} />
            Tambah
          </Button>
        </>
      }
      isOpen={Boolean(menu)}
      onClose={onClose}
      title={menu.name}
    >
      <div className="detail-stack">
        <div className="sheet-image">
          <OptimizedImage
            alt={menu.name}
            fallbackSrc={menu.fallbackImage || DEFAULT_MENU_IMAGE}
            height={500}
            loading="lazy"
            src={menu.optimizedImage || menu.image}
            width={800}
          />
        </div>
        <div className="summary-stack">
          <p>{menu.description}</p>
          {menu.note ? <p>{menu.note}</p> : null}
          <strong className="price-text">{formatCurrency(menu.price)}</strong>
          {!menu.isAvailable ? (
            <span className="status-badge status-badge--rejected">
              Tidak tersedia
            </span>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}
