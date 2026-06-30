import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button.jsx";
import PageHeader from "../../../components/common/PageHeader.jsx";
import EmptyState from "../../../components/feedback/EmptyState.jsx";
import StatusBadge from "../../../components/feedback/StatusBadge.jsx";
import { formatCurrency } from "../../../lib/formatCurrency.js";
import { ORDER_STATUS_LABEL } from "../../../lib/orderStatus.js";
import { orderStorage } from "../services/orderStorage.js";

function formatDateTime(value) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function OrderStatusPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialOrderId = location.state?.orderId;

  const order = useMemo(() => {
    if (initialOrderId) {
      return orderStorage.getOrderById(initialOrderId);
    }

    return orderStorage.getLatestOrder();
  }, [initialOrderId]);

  const handleBackToMenu = () => {
    orderStorage.clearSessionData();
    navigate("/", { replace: true });
  };

  if (!order) {
    return (
      <div className="page-stack">
        <PageHeader backTo="/" title="Status Pesanan" />
        <EmptyState
          action={
            <Link className="button button--primary" to="/">
              Pilih Menu
            </Link>
          }
          description="Belum ada pesanan yang bisa ditampilkan."
          title="Pesanan belum ada"
        />
      </div>
    );
  }

  return (
    <div className="page-stack">
      <PageHeader title="Status Pesanan" />
      <section className="status-panel">
        <span className="status-panel__id">{order.id}</span>
        <StatusBadge status={order.orderStatus} />
        <h2>{ORDER_STATUS_LABEL[order.orderStatus]}</h2>
        <p>
          {order.customerName} - Meja {order.tableNumber}
        </p>
        <div className="summary-divider" />
        <div className="summary-row">
          <span>Total item</span>
          <strong>{order.totalItems}</strong>
        </div>
        <div className="summary-row">
          <span>Total pembayaran</span>
          <strong>{formatCurrency(order.totalPrice)}</strong>
        </div>
      </section>
      <section className="receipt-card">
        <header className="receipt-card__header">
          <h2>Struk Pesanan</h2>
          <span>{formatDateTime(order.createdAt)}</span>
        </header>
        <div className="summary-stack">
          <div className="summary-row">
            <span>Order ID</span>
            <strong className="status-panel__id">{order.id}</strong>
          </div>
          <div className="summary-row">
            <span>Nama</span>
            <strong>{order.customerName}</strong>
          </div>
          <div className="summary-row">
            <span>Meja</span>
            <strong>{order.tableNumber}</strong>
          </div>
          <div className="summary-row">
            <span>Metode</span>
            <strong>{order.paymentMethod ?? "Pembayaran"}</strong>
          </div>
        </div>
        <div className="summary-divider" />
        <div className="order-detail-list">
          {order.items.map((item) => (
            <div className="receipt-item" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>
                  {item.quantity} x {formatCurrency(item.price)}
                </span>
              </div>
              <strong>{formatCurrency(item.price * item.quantity)}</strong>
            </div>
          ))}
        </div>
        <div className="summary-divider" />
        <div className="summary-row">
          <span>Total</span>
          <strong>{formatCurrency(order.totalPrice)}</strong>
        </div>
      </section>
      <Button fullWidth onClick={handleBackToMenu}>
        <ArrowLeft size={18} />
        Back to menu
      </Button>
    </div>
  );
}
