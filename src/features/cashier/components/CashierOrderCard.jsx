import { Eye } from "lucide-react";
import Button from "../../../components/common/Button.jsx";
import StatusBadge from "../../../components/feedback/StatusBadge.jsx";
import { formatCurrency } from "../../../lib/formatCurrency.js";

export default function CashierOrderCard({ onOpen, order }) {
  return (
    <article className="cashier-card">
      <div className="cashier-card__meta">
        <span className="status-panel__id">{order.id}</span>
        <h2>{order.customerName}</h2>
        <p>Meja {order.tableNumber}</p>
      </div>
      <div className="summary-row">
        <span>{order.totalItems} item</span>
        <strong>{formatCurrency(order.totalPrice)}</strong>
      </div>
      <div className="cashier-card__footer">
        <StatusBadge status={order.orderStatus} />
        <Button onClick={() => onOpen(order)} size="sm">
          <Eye size={16} />
          Detail
        </Button>
      </div>
    </article>
  );
}
