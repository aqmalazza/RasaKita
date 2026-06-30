import { formatCurrency } from "../../../lib/formatCurrency.js";

export default function OrderSummary({ items, totalItems, totalPrice }) {
  return (
    <section className="summary-card">
      <h2>Ringkasan Pesanan</h2>
      <div className="order-detail-list">
        {items.map((item) => (
          <div className="order-line" key={item.id}>
            <div>
              <strong>{item.name}</strong>
              <p>
                {item.quantity} x {formatCurrency(item.price)}
              </p>
            </div>
            <strong>{formatCurrency(item.price * item.quantity)}</strong>
          </div>
        ))}
      </div>
      <div className="summary-divider" />
      <div className="summary-row">
        <span>Total item</span>
        <strong>{totalItems}</strong>
      </div>
      <div className="summary-row">
        <span>Total pembayaran</span>
        <strong>{formatCurrency(totalPrice)}</strong>
      </div>
    </section>
  );
}
