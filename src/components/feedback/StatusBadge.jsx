import { ORDER_STATUS_LABEL } from "../../lib/orderStatus.js";

export default function StatusBadge({ status }) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      {ORDER_STATUS_LABEL[status] ?? status}
    </span>
  );
}
