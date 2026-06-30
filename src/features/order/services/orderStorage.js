import { STORAGE_KEYS } from "../../../lib/storageKeys.js";

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
    return readJson(STORAGE_KEYS.orders, []);
  },

  saveOrder(order) {
    const orders = this.getOrders();
    const nextOrders = [order, ...orders];
    writeJson(STORAGE_KEYS.orders, nextOrders);
    writeJson(STORAGE_KEYS.lastOrderId, order.id);
    return order;
  },

  getOrderById(orderId) {
    return this.getOrders().find((order) => order.id === orderId) ?? null;
  },

  getLatestOrder() {
    const lastOrderId = readJson(STORAGE_KEYS.lastOrderId, null);
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

    writeJson(STORAGE_KEYS.orders, nextOrders);
    return updatedOrder;
  },

  saveCheckoutDraft(draft) {
    writeJson(STORAGE_KEYS.checkoutDraft, draft);
  },

  getCheckoutDraft() {
    return readJson(STORAGE_KEYS.checkoutDraft, null);
  },

  clearCheckoutDraft() {
    window.localStorage.removeItem(STORAGE_KEYS.checkoutDraft);
    window.dispatchEvent(
      new CustomEvent("local-storage:update", {
        detail: { key: STORAGE_KEYS.checkoutDraft, value: null },
      })
    );
  },

  clearSessionData() {
    if (typeof window === "undefined") {
      return;
    }

    const clearedValues = {
      [STORAGE_KEYS.cart]: [],
      [STORAGE_KEYS.checkoutDraft]: null,
      [STORAGE_KEYS.lastOrderId]: null,
      [STORAGE_KEYS.orders]: [],
    };

    Object.entries(clearedValues).forEach(([key, value]) => {
      window.localStorage.removeItem(key);
      window.dispatchEvent(
        new CustomEvent("local-storage:update", {
          detail: { key, value },
        })
      );
    });
  },
};
