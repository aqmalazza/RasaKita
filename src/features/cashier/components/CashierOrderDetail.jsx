import Modal from "../../../components/common/Modal.jsx";
import StatusBadge from "../../../components/feedback/StatusBadge.jsx";
import { formatCurrency } from "../../../lib/formatCurrency.js";
import { PAYMENT_STATUS_LABEL } from "../../../lib/orderStatus.js";
import CashierActionButtons from "./CashierActionButtons.jsx";

function formatDateTime(value) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function CashierOrderDetail({
  onAccept,
  onClose,
  onReject,
  order,
}) {
  if (!order) {
    return null;
  }

  return (
    <Modal
      footer={
        <CashierActionButtons
          onAccept={() => onAccept(order)}
          onReject={() => onReject(order)}
          status={order.orderStatus}
        />
      }
      isOpen={Boolean(order)}
      onClose={onClose}
      title="Detail pesanan"
      variant="center"
    >
      <div className="detail-stack">
        <div className="summary-stack">
          <span className="status-panel__id">{order.id}</span>
          <StatusBadge status={order.orderStatus} />
          <div className="summary-row">
            <span>Nama pelanggan</span>
            <strong>{order.customerName}</strong>
          </div>
          <div className="summary-row">
            <span>Nomor meja</span>
            <strong>{order.tableNumber}</strong>
          </div>
          <div className="summary-row">
            <span>Waktu pesanan</span>
            <strong>{formatDateTime(order.createdAt)}</strong>
          </div>
          <div className="summary-row">
            <span>Status pembayaran</span>
            <strong>{PAYMENT_STATUS_LABEL[order.paymentStatus]}</strong>
          </div>
        </div>
        <div className="summary-divider" />
        <div className="order-detail-list">
          {order.items.map((item) => (
            <div className="order-detail-item" key={item.id}>
              <div className="order-line">
                <strong>{item.name}</strong>
                <strong>{formatCurrency(item.price * item.quantity)}</strong>
              </div>
              <small>
                {item.quantity} x {formatCurrency(item.price)}
              </small>
            </div>
          ))}
        </div>
        <div className="summary-divider" />
        <div className="summary-row">
          <span>Total item</span>
          <strong>{order.totalItems}</strong>
        </div>
        <div className="summary-row">
          <span>Total harga</span>
          <strong>{formatCurrency(order.totalPrice)}</strong>
        </div>
      </div>
    </Modal>
  );
}
