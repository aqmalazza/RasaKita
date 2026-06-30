import { Outlet, useLocation } from "react-router-dom";
import RouteScrollReset from "../common/RouteScrollReset.jsx";

export default function CustomerLayout() {
  const { pathname } = useLocation();

  return (
    <div className="customer-shell">
      <RouteScrollReset />
      <main className="customer-main">
        <div className="route-transition" key={pathname}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
