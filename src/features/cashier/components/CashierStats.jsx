import { ORDER_STATUS } from "../../../lib/orderStatus.js";

export default function CashierStats({ stats }) {
  return (
    <section className="stats-grid" aria-label="Statistik pesanan">
      <div className="stats-card">
        <span>Menunggu</span>
        <strong>{stats[ORDER_STATUS.PENDING_CASHIER] ?? 0}</strong>
      </div>
      <div className="stats-card">
        <span>Diterima</span>
        <strong>{stats[ORDER_STATUS.ACCEPTED] ?? 0}</strong>
      </div>
      <div className="stats-card">
        <span>Ditolak</span>
        <strong>{stats[ORDER_STATUS.REJECTED] ?? 0}</strong>
      </div>
    </section>
  );
}
