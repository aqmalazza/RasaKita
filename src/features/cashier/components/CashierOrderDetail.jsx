import { useEffect, useState } from "react";
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
  const [visibleOrder, setVisibleOrder] = useState(order);

  useEffect(() => {
    if (order) {
      setVisibleOrder(order);
    }
  }, [order]);

  if (!visibleOrder) {
    return null;
  }

  const activeOrder = order ?? visibleOrder;

  return (
    <Modal
      footer={
        <CashierActionButtons
          onAccept={() => onAccept(activeOrder)}
          onReject={() => onReject(activeOrder)}
          status={activeOrder.orderStatus}
        />
      }
      isOpen={Boolean(order)}
      onExited={() => setVisibleOrder(null)}
      onClose={onClose}
      title="Detail pesanan"
      variant="center"
    >
      <div className="detail-stack">
        <div className="summary-stack">
          <span className="status-panel__id">{activeOrder.id}</span>
          <StatusBadge status={activeOrder.orderStatus} />
          <div className="summary-row">
            <span>Nama pelanggan</span>
            <strong>{activeOrder.customerName}</strong>
          </div>
          <div className="summary-row">
            <span>Nomor meja</span>
            <strong>{activeOrder.tableNumber}</strong>
          </div>
          <div className="summary-row">
            <span>Waktu pesanan</span>
            <strong>{formatDateTime(activeOrder.createdAt)}</strong>
          </div>
          <div className="summary-row">
            <span>Status pembayaran</span>
            <strong>
              {PAYMENT_STATUS_LABEL[activeOrder.paymentStatus] ??
                "Pembayaran Terkonfirmasi"}
            </strong>
          </div>
        </div>
        <div className="summary-divider" />
        <div className="order-detail-list">
          {activeOrder.items.map((item) => (
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
          <strong>{activeOrder.totalItems}</strong>
        </div>
        <div className="summary-row">
          <span>Total harga</span>
          <strong>{formatCurrency(activeOrder.totalPrice)}</strong>
        </div>
      </div>
    </Modal>
  );
}
