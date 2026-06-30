import EmptyState from "../../../components/feedback/EmptyState.jsx";
import MenuCard from "./MenuCard.jsx";

export default function MenuGrid({ menus, onAdd, onSelect }) {
  if (!menus.length) {
    return (
      <EmptyState
        description="Kategori ini belum memiliki menu."
        title="Menu belum tersedia"
      />
    );
  }

  return (
    <div className="menu-grid">
      {menus.map((menu) => (
        <MenuCard key={menu.id} menu={menu} onAdd={onAdd} onSelect={onSelect} />
      ))}
    </div>
  );
}
