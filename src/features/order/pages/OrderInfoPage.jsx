import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button.jsx";
import Modal from "../../../components/common/Modal.jsx";
import PageHeader from "../../../components/common/PageHeader.jsx";
import { useCart } from "../../cart/hooks/useCart.js";
import ConfirmOrderSection from "../components/ConfirmOrderSection.jsx";
import CustomerInfoForm from "../components/CustomerInfoForm.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import { orderStorage } from "../services/orderStorage.js";

const numberOnlyPattern = /^[0-9]+$/;

function validateForm(form) {
  return {
    customerName: form.customerName.trim() ? "" : "Nama pelanggan wajib diisi.",
    tableNumber: !form.tableNumber.trim()
      ? "Nomor meja wajib diisi."
      : numberOnlyPattern.test(form.tableNumber)
      ? ""
      : "Nomor meja hanya boleh angka.",
  };
}

export default function OrderInfoPage() {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice } = useCart();
  const [form, setForm] = useState({
    customerName: "",
    tableNumber: "",
  });
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const errors = useMemo(() => validateForm(form), [form]);
  const isValid = !errors.customerName && !errors.tableNumber && items.length > 0;

  const handleChange = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      setIsConfirmOpen(true);
    }
  };

  const handleContinueToPayment = () => {
    orderStorage.saveCheckoutDraft({
      customerName: form.customerName.trim(),
      tableNumber: form.tableNumber.trim(),
    });
    setIsConfirmOpen(false);
    navigate("/payment");
  };

  if (!items.length) {
    return <Navigate replace to="/cart" />;
  }

  return (
    <div className="page-stack">
      <PageHeader
        backTo="/cart"
        title="Informasi Pesanan"
      />
      <CustomerInfoForm
        errors={errors}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <OrderSummary
        items={items}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />
      <ConfirmOrderSection
        disabled={!isValid}
        onConfirm={() => setIsConfirmOpen(true)}
      />
      <Modal
        footer={
          <>
            <Button onClick={() => setIsConfirmOpen(false)} variant="secondary">
              Cek Lagi
            </Button>
            <Button onClick={handleContinueToPayment}>Lanjut Bayar</Button>
          </>
        }
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Konfirmasi pesanan"
        variant="center"
      >
        <div className="summary-stack">
          <p>
            Pesanan atas nama <strong>{form.customerName}</strong> untuk meja{" "}
            <strong>{form.tableNumber}</strong> akan masuk ke halaman
            pembayaran.
          </p>
        </div>
      </Modal>
    </div>
  );
}
