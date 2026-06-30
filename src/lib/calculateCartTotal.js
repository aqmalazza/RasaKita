export function calculateCartTotal(items = []) {
  return items.reduce(
    (summary, item) => {
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;

      return {
        totalItems: summary.totalItems + quantity,
        totalPrice: summary.totalPrice + price * quantity,
      };
    },
    { totalItems: 0, totalPrice: 0 }
  );
}
