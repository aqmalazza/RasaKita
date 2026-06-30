import { RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../../../components/common/Button.jsx";
import PageHeader from "../../../components/common/PageHeader.jsx";
import EmptyState from "../../../components/feedback/EmptyState.jsx";
import StatusBadge from "../../../components/feedback/StatusBadge.jsx";
import { formatCurrency } from "../../../lib/formatCurrency.js";
import { ORDER_STATUS_LABEL } from "../../../lib/orderStatus.js";
import { orderStorage } from "../services/orderStorage.js";

export default function OrderStatusPage() {
  const location = useLocation();
  const initialOrderId = location.state?.orderId;
  const [refreshKey, setRefreshKey] = useState(0);

  const order = useMemo(() => {
    if (initialOrderId) {
      return orderStorage.getOrderById(initialOrderId);
    }

    return orderStorage.getLatestOrder();
  }, [initialOrderId, refreshKey]);

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
      <PageHeader
        backTo="/"
        title="Status Pesanan"
      />
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
      <Button fullWidth onClick={() => setRefreshKey((value) => value + 1)}>
        <RefreshCw size={18} />
        Muat Ulang Status
      </Button>
    </div>
  );
}
