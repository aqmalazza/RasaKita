import { CreditCard } from "lucide-react";
import Button from "../../../components/common/Button.jsx";

export default function ConfirmOrderSection({ disabled, onConfirm }) {
  return (
    <Button disabled={disabled} fullWidth onClick={onConfirm}>
      <CreditCard size={18} />
      Konfirmasi Pesanan
    </Button>
  );
}
