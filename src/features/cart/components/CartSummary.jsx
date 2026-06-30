import { formatCurrency } from "../../../lib/formatCurrency.js";

export default function CartSummary({ totalItems, totalPrice }) {
  return (
    <section className="summary-card">
      <h2>Ringkasan Pesanan</h2>
      <div className="summary-stack">
        <div className="summary-row">
          <span>Total item</span>
          <strong>{totalItems}</strong>
        </div>
        <div className="summary-divider" />
        <div className="summary-row">
          <span>Total harga</span>
          <strong>{formatCurrency(totalPrice)}</strong>
        </div>
      </div>
    </section>
  );
}
