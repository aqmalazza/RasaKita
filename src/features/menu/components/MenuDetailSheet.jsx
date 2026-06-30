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
  const [visibleMenu, setVisibleMenu] = useState(menu);

  useEffect(() => {
    if (menu) {
      setQuantity(1);
      setVisibleMenu(menu);
    }
  }, [menu]);

  if (!visibleMenu) {
    return null;
  }

  const activeMenu = menu ?? visibleMenu;

  const handleAdd = () => {
    onAdd(activeMenu, quantity);
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
          <Button disabled={!activeMenu.isAvailable} onClick={handleAdd}>
            <ShoppingCart size={18} />
            Tambah
          </Button>
        </>
      }
      isOpen={Boolean(menu)}
      onExited={() => setVisibleMenu(null)}
      onClose={onClose}
      title={activeMenu.name}
      variant="center"
    >
      <div className="detail-stack">
        <div className="sheet-image">
          <OptimizedImage
            alt={activeMenu.name}
            fallbackSrc={activeMenu.fallbackImage || DEFAULT_MENU_IMAGE}
            height={500}
            loading="lazy"
            src={activeMenu.optimizedImage || activeMenu.image}
            width={800}
          />
        </div>
        <div className="summary-stack">
          <p>{activeMenu.description}</p>
          {activeMenu.note ? <p>{activeMenu.note}</p> : null}
          <strong className="price-text">
            {formatCurrency(activeMenu.price)}
          </strong>
          {!activeMenu.isAvailable ? (
            <span className="status-badge status-badge--rejected">
              Tidak tersedia
            </span>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}
