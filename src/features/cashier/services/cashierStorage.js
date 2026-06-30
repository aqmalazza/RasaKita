import { ORDER_STATUS } from "../../../lib/orderStatus.js";
import { orderStorage } from "../../order/services/orderStorage.js";

export const cashierStorage = {
  getAllOrders() {
    return orderStorage.getOrders();
  },

  getPendingOrders() {
    return this.getAllOrders().filter(
      (order) => order.orderStatus === ORDER_STATUS.PENDING_CASHIER
    );
  },

  getStats() {
    return this.getAllOrders().reduce(
      (stats, order) => ({
        ...stats,
        [order.orderStatus]: (stats[order.orderStatus] ?? 0) + 1,
      }),
      {
        [ORDER_STATUS.PENDING_CASHIER]: 0,
        [ORDER_STATUS.ACCEPTED]: 0,
        [ORDER_STATUS.REJECTED]: 0,
      }
    );
  },

  acceptOrder(orderId) {
    return orderStorage.updateOrderStatus(orderId, ORDER_STATUS.ACCEPTED);
  },

  rejectOrder(orderId) {
    return orderStorage.updateOrderStatus(orderId, ORDER_STATUS.REJECTED);
  },
};
