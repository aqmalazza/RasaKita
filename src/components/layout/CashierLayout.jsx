import { MonitorCheck } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { brandData } from "../../data/brandData.js";

export default function CashierLayout() {
  return (
    <div className="cashier-shell">
      <header className="cashier-topbar">
        <div className="cashier-topbar__inner">
          <div className="cashier-brand">
            <img alt="" src={brandData.logo} />
            <strong>Dashboard {brandData.name}</strong>
          </div>
          <Link className="button button--ghost button--sm" to="/">
            <MonitorCheck size={16} />
            Menu
          </Link>
        </div>
      </header>
      <main className="cashier-main">
        <Outlet />
      </main>
    </div>
  );
}
