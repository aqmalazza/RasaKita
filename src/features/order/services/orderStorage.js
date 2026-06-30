const ORDERS_STORAGE_KEY = "food-menu-orders";
const CHECKOUT_DRAFT_KEY = "food-menu-checkout-draft";
const LAST_ORDER_ID_KEY = "food-menu-last-order-id";

function readJson(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(
    new CustomEvent("local-storage:update", { detail: { key, value } })
  );
}

export const orderStorage = {
  getOrders() {
    return readJson(ORDERS_STORAGE_KEY, []);
  },

  saveOrder(order) {
    const orders = this.getOrders();
    const nextOrders = [order, ...orders];
    writeJson(ORDERS_STORAGE_KEY, nextOrders);
    writeJson(LAST_ORDER_ID_KEY, order.id);
    return order;
  },

  getOrderById(orderId) {
    return this.getOrders().find((order) => order.id === orderId) ?? null;
  },

  getLatestOrder() {
    const lastOrderId = readJson(LAST_ORDER_ID_KEY, null);
    return lastOrderId ? this.getOrderById(lastOrderId) : this.getOrders()[0] ?? null;
  },

  updateOrderStatus(orderId, orderStatus) {
    let updatedOrder = null;
    const nextOrders = this.getOrders().map((order) => {
      if (order.id !== orderId) {
        return order;
      }

      updatedOrder = {
        ...order,
        orderStatus,
        updatedAt: new Date().toISOString(),
      };
      return updatedOrder;
    });

    writeJson(ORDERS_STORAGE_KEY, nextOrders);
    return updatedOrder;
  },

  saveCheckoutDraft(draft) {
    writeJson(CHECKOUT_DRAFT_KEY, draft);
  },

  getCheckoutDraft() {
    return readJson(CHECKOUT_DRAFT_KEY, null);
  },

  clearCheckoutDraft() {
    window.localStorage.removeItem(CHECKOUT_DRAFT_KEY);
    window.dispatchEvent(
      new CustomEvent("local-storage:update", {
        detail: { key: CHECKOUT_DRAFT_KEY, value: null },
      })
    );
  },
};
