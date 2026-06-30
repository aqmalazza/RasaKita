import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Button from "../../../components/common/Button.jsx";
import Modal from "../../../components/common/Modal.jsx";
import PageHeader from "../../../components/common/PageHeader.jsx";
import EmptyState from "../../../components/feedback/EmptyState.jsx";
import { ORDER_STATUS } from "../../../lib/orderStatus.js";
import CashierOrderCard from "../components/CashierOrderCard.jsx";
import CashierOrderDetail from "../components/CashierOrderDetail.jsx";
import CashierStats from "../components/CashierStats.jsx";
import { cashierStorage } from "../services/cashierStorage.js";

const actionCopy = {
  accept: {
    title: "Terima pesanan",
    message: "Pesanan akan berubah menjadi diterima.",
    confirmLabel: "Terima",
  },
  reject: {
    title: "Tolak pesanan",
    message: "Pesanan akan berubah menjadi ditolak.",
    confirmLabel: "Tolak",
  },
};

export default function CashierDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(() => cashierStorage.getStats());
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const loadOrders = useCallback(() => {
    setOrders(cashierStorage.getPendingOrders());
    setStats(cashierStorage.getStats());
  }, []);

  useEffect(() => {
    loadOrders();
    window.addEventListener("local-storage:update", loadOrders);
    window.addEventListener("storage", loadOrders);

    return () => {
      window.removeEventListener("local-storage:update", loadOrders);
      window.removeEventListener("storage", loadOrders);
    };
  }, [loadOrders]);

  const openConfirmation = (type, order) => {
    setConfirmation({ type, order });
  };

  const handleConfirmAction = () => {
    if (!confirmation) {
      return;
    }

    if (confirmation.type === "accept") {
      cashierStorage.acceptOrder(confirmation.order.id);
    } else {
      cashierStorage.rejectOrder(confirmation.order.id);
    }

    setConfirmation(null);
    setSelectedOrder(null);
    loadOrders();
  };

  const selectedActionCopy = confirmation
    ? actionCopy[confirmation.type]
    : null;

  return (
    <div className="page-stack">
      <PageHeader
        description="Kelola pesanan pelanggan yang sudah melewati pembayaran."
        title="Pesanan Masuk"
      />
      <CashierStats stats={stats} />
      <Button onClick={loadOrders} variant="secondary">
        <RefreshCw size={18} />
        Muat Ulang
      </Button>
      {!orders.length ? (
        <EmptyState
          description="Pesanan yang perlu ditinjau akan tampil di sini."
          title="Belum ada pesanan masuk"
        />
      ) : (
        <div className="cashier-grid">
          {orders.map((order) => (
            <CashierOrderCard
              key={order.id}
              onOpen={setSelectedOrder}
              order={order}
            />
          ))}
        </div>
      )}
      <CashierOrderDetail
        onAccept={(order) => openConfirmation("accept", order)}
        onClose={() => setSelectedOrder(null)}
        onReject={(order) => openConfirmation("reject", order)}
        order={selectedOrder}
      />
      <Modal
        footer={
          selectedActionCopy ? (
            <>
              <Button onClick={() => setConfirmation(null)} variant="secondary">
                Batal
              </Button>
              <Button
                onClick={handleConfirmAction}
                variant={
                  confirmation?.type === "reject" ? "danger" : "primary"
                }
              >
                {selectedActionCopy.confirmLabel}
              </Button>
            </>
          ) : null
        }
        isOpen={Boolean(confirmation)}
        onClose={() => setConfirmation(null)}
        title={selectedActionCopy?.title ?? ""}
        variant="center"
      >
        <p>{selectedActionCopy?.message}</p>
        {confirmation?.order.orderStatus === ORDER_STATUS.PENDING_CASHIER ? (
          <p>
            Order <strong>{confirmation.order.id}</strong> untuk meja{" "}
            <strong>{confirmation.order.tableNumber}</strong>.
          </p>
        ) : null}
      </Modal>
    </div>
  );
}
