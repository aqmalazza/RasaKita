import { MonitorCheck } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import OptimizedImage from "../common/OptimizedImage.jsx";
import RouteScrollReset from "../common/RouteScrollReset.jsx";
import { brandData } from "../../data/brandData.js";

export default function CashierLayout() {
  const { pathname } = useLocation();

  return (
    <div className="cashier-shell">
      <RouteScrollReset />
      <header className="cashier-topbar">
        <div className="cashier-topbar__inner">
          <div className="cashier-brand">
            <OptimizedImage
              alt=""
              fallbackSrc={brandData.logo}
              height={36}
              loading="eager"
              src={brandData.optimizedLogo || brandData.logo}
              width={36}
            />
            <strong>Dashboard {brandData.name}</strong>
          </div>
          <Link className="button button--ghost button--sm" to="/">
            <MonitorCheck size={16} />
            Menu
          </Link>
        </div>
      </header>
      <main className="cashier-main">
        <div className="route-transition" key={pathname}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
