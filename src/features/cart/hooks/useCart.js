import { useCallback, useMemo } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import { calculateCartTotal } from "../../../lib/calculateCartTotal.js";
import { STORAGE_KEYS } from "../../../lib/storageKeys.js";

function normalizeCartItem(menuItem, quantity) {
  return {
    id: menuItem.id,
    name: menuItem.name,
    category: menuItem.category,
    price: menuItem.price,
    image: menuItem.image,
    optimizedImage: menuItem.optimizedImage,
    fallbackImage: menuItem.fallbackImage,
    description: menuItem.description,
    note: menuItem.note,
    isAvailable: menuItem.isAvailable !== false,
    quantity,
  };
}

function isOrderable(item) {
  return Boolean(item?.id) && item.isAvailable !== false;
}

export function useCart() {
  const [items, setItems] = useLocalStorage(STORAGE_KEYS.cart, []);
  const totals = useMemo(() => calculateCartTotal(items), [items]);

  const addItem = useCallback(
    (menuItem, quantity = 1) => {
      if (!isOrderable(menuItem)) {
        return false;
      }

      setItems((currentItems) => {
        const existingItem = currentItems.find((item) => item.id === menuItem.id);

        if (!existingItem) {
          return [...currentItems, normalizeCartItem(menuItem, quantity)];
        }

        return currentItems.map((item) =>
          item.id === menuItem.id
            ? {
                ...item,
                isAvailable: item.isAvailable !== false,
                quantity: item.quantity + quantity,
              }
            : item
        );
      });

      return true;
    },
    [setItems]
  );

  const increaseItem = useCallback(
    (cartItem) => {
      if (!isOrderable(cartItem)) {
        return false;
      }

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === cartItem.id
            ? {
                ...item,
                isAvailable: item.isAvailable !== false,
                quantity: item.quantity + 1,
              }
            : item
        )
      );

      return true;
    },
    [setItems]
  );

  const decreaseItem = useCallback(
    (itemId) => {
      setItems((currentItems) =>
        currentItems
          .map((item) =>
            item.id === itemId
              ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    },
    [setItems]
  );

  const removeItem = useCallback(
    (itemId) => {
      setItems((currentItems) =>
        currentItems.filter((item) => item.id !== itemId)
      );
    },
    [setItems]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const getItemQuantity = useCallback(
    (itemId) => items.find((item) => item.id === itemId)?.quantity ?? 0,
    [items]
  );

  return {
    addItem,
    clearCart,
    decreaseItem,
    getItemQuantity,
    increaseItem,
    items,
    removeItem,
    subtotal: totals.totalPrice,
    totalItems: totals.totalItems,
    totalPrice: totals.totalPrice,
  };
}
