import { Outlet } from "react-router-dom";
import RouteScrollReset from "../common/RouteScrollReset.jsx";

export default function CustomerLayout() {
  return (
    <div className="customer-shell">
      <RouteScrollReset />
      <main className="customer-main">
        <Outlet />
      </main>
    </div>
  );
}
