export const ORDER_STATUS = {
  PENDING_CASHIER: "pending_cashier",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
};

export const ORDER_STATUS_LABEL = {
  [ORDER_STATUS.PENDING_CASHIER]: "Menunggu Konfirmasi Kasir",
  [ORDER_STATUS.ACCEPTED]: "Pesanan Diterima",
  [ORDER_STATUS.REJECTED]: "Pesanan Ditolak",
};

export const PAYMENT_STATUS = {
  PAID_DUMMY: "paid_dummy",
};

export const PAYMENT_STATUS_LABEL = {
  [PAYMENT_STATUS.PAID_DUMMY]: "Pembayaran Dummy Terkonfirmasi",
};
