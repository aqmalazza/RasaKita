import { Outlet } from "react-router-dom";

export default function CustomerLayout() {
  return (
    <div className="customer-shell">
      <main className="customer-main">
        <Outlet />
      </main>
    </div>
  );
}
