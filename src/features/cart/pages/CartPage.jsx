import { ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/common/PageHeader.jsx";
import EmptyState from "../../../components/feedback/EmptyState.jsx";
import CartItem from "../components/CartItem.jsx";
import CartSummary from "../components/CartSummary.jsx";
import { useCart } from "../hooks/useCart.js";

export default function CartPage() {
  const {
    decreaseItem,
    increaseItem,
    items,
    removeItem,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <div className="page-stack">
      <PageHeader backTo="/" title="Keranjang" />

      {!items.length ? (
        <EmptyState
          action={
            <Link className="button button--primary" to="/">
              Pilih Menu
            </Link>
          }
          description="Tambahkan menu terlebih dahulu sebelum lanjut."
          title="Keranjang masih kosong"
        />
      ) : (
        <>
          <div className="cart-list">
            {items.map((item) => (
              <CartItem
                item={item}
                key={item.id}
                onDecrease={decreaseItem}
                onIncrease={increaseItem}
                onRemove={removeItem}
              />
            ))}
          </div>
          <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
          <Link className="button button--primary button--full" to="/order-info">
            <ClipboardList size={18} />
            Isi Informasi Pesanan
          </Link>
        </>
      )}
    </div>
  );
}
