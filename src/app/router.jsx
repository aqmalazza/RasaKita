import { createBrowserRouter, Navigate } from "react-router-dom";
import CashierLayout from "../components/layout/CashierLayout.jsx";
import CustomerLayout from "../components/layout/CustomerLayout.jsx";
import CartPage from "../features/cart/pages/CartPage.jsx";
import CashierDashboardPage from "../features/cashier/pages/CashierDashboardPage.jsx";
import MenuPage from "../features/menu/pages/MenuPage.jsx";
import OrderInfoPage from "../features/order/pages/OrderInfoPage.jsx";
import OrderStatusPage from "../features/order/pages/OrderStatusPage.jsx";
import PaymentPage from "../features/payment/pages/PaymentPage.jsx";

export const router = createBrowserRouter([
  {
    element: <CustomerLayout />,
    children: [
      { path: "/", element: <MenuPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/order-info", element: <OrderInfoPage /> },
      { path: "/payment", element: <PaymentPage /> },
      { path: "/order-status", element: <OrderStatusPage /> },
    ],
  },
  {
    element: <CashierLayout />,
    children: [{ path: "/cashier", element: <CashierDashboardPage /> }],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
