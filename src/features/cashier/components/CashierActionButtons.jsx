import { Check, X } from "lucide-react";
import Button from "../../../components/common/Button.jsx";
import { ORDER_STATUS } from "../../../lib/orderStatus.js";

export default function CashierActionButtons({ onAccept, onReject, status }) {
  if (status !== ORDER_STATUS.PENDING_CASHIER) {
    return null;
  }

  return (
    <div className="cashier-actions">
      <Button onClick={onAccept}>
        <Check size={18} />
        Terima Pesanan
      </Button>
      <Button onClick={onReject} variant="danger">
        <X size={18} />
        Tolak Pesanan
      </Button>
    </div>
  );
}
