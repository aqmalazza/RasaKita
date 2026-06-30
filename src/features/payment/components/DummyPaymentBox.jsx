import { CheckCircle2 } from "lucide-react";
import Button from "../../../components/common/Button.jsx";
import { formatCurrency } from "../../../lib/formatCurrency.js";

export default function DummyPaymentBox({ onConfirm, totalPrice }) {
  return (
    <section className="payment-box">
      <div className="payment-total-row">
        <span>Total pembayaran</span>
        <strong>{formatCurrency(totalPrice)}</strong>
      </div>
      <Button fullWidth onClick={onConfirm}>
        <CheckCircle2 size={18} />
        Konfirmasi Pembayaran
      </Button>
    </section>
  );
}
