import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button.jsx";
import Modal from "../../../components/common/Modal.jsx";
import PageHeader from "../../../components/common/PageHeader.jsx";
import { paymentData } from "../../../data/paymentData.js";
import { generateOrderId } from "../../../lib/generateOrderId.js";
import { ORDER_STATUS, PAYMENT_STATUS } from "../../../lib/orderStatus.js";
import { useCart } from "../../cart/hooks/useCart.js";
import { orderStorage } from "../../order/services/orderStorage.js";
import DummyPaymentBox from "../components/DummyPaymentBox.jsx";
import PaymentMethodCard from "../components/PaymentMethodCard.jsx";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { clearCart, items, totalItems, totalPrice } = useCart();
  const [selectedMethod, setSelectedMethod] = useState(paymentData[0].id);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const checkoutDraft = orderStorage.getCheckoutDraft();

  if (!items.length) {
    return <Navigate replace to="/cart" />;
  }

  if (!checkoutDraft) {
    return <Navigate replace to="/order-info" />;
  }

  const handleCreateOrder = () => {
    const timestamp = new Date().toISOString();
    const order = {
      id: generateOrderId(),
      customerName: checkoutDraft.customerName,
      tableNumber: checkoutDraft.tableNumber,
      items,
      totalItems,
      totalPrice,
      paymentStatus: PAYMENT_STATUS.PAID_DUMMY,
      orderStatus: ORDER_STATUS.PENDING_CASHIER,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    orderStorage.saveOrder(order);
    orderStorage.clearCheckoutDraft();
    clearCart();
    setIsConfirmOpen(false);
    navigate("/order-status", { replace: true, state: { orderId: order.id } });
  };

  return (
    <div className="page-stack">
      <PageHeader
        backTo="/order-info"
        description="Simulasi pembayaran sebelum pesanan masuk ke kasir."
        title="Pembayaran"
      />
      <div className="payment-method-list">
        {paymentData.map((method) => (
          <PaymentMethodCard
            checked={selectedMethod === method.id}
            key={method.id}
            method={method}
            onChange={setSelectedMethod}
          />
        ))}
      </div>
      <DummyPaymentBox
        onConfirm={() => setIsConfirmOpen(true)}
        totalPrice={totalPrice}
      />
      <Modal
        footer={
          <>
            <Button onClick={() => setIsConfirmOpen(false)} variant="secondary">
              Batal
            </Button>
            <Button onClick={handleCreateOrder}>Ya, Simpan Pesanan</Button>
          </>
        }
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Konfirmasi pembayaran"
        variant="center"
      >
        <p>
          Setelah pembayaran dikonfirmasi, pesanan akan dikirim ke dashboard
          kasir dengan status menunggu konfirmasi.
        </p>
      </Modal>
    </div>
  );
}
