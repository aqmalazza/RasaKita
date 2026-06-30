import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { orderStorage } from "../features/order/services/orderStorage.js";
import { router } from "./router.jsx";

export default function App() {
  useEffect(() => {
    const isMenuPage = () => window.location.pathname === "/";

    const clearOrderDataOnExit = () => {
      if (isMenuPage()) {
        orderStorage.clearSessionData();
      }
    };

    if (isMenuPage()) {
      orderStorage.clearSessionData();
    }

    window.addEventListener("beforeunload", clearOrderDataOnExit);
    window.addEventListener("pagehide", clearOrderDataOnExit);

    return () => {
      window.removeEventListener("beforeunload", clearOrderDataOnExit);
      window.removeEventListener("pagehide", clearOrderDataOnExit);
    };
  }, []);

  return <RouterProvider router={router} />;
}
