import EmptyState from "../../../components/feedback/EmptyState.jsx";
import MenuCard from "./MenuCard.jsx";

export default function MenuGrid({
  menus = [],
  onAdd,
  onSelect,
  sections,
  setSectionRef,
}) {
  if (sections) {
    return (
      <div className="menu-sections">
        {sections.map((section) => (
          <section
            className="menu-section"
            data-category-id={section.category.id}
            key={section.category.id}
            ref={(node) => setSectionRef?.(section.category.id, node)}
          >
            <header className="menu-section__header">
              <h2>{section.category.name}</h2>
              <p>{section.category.description}</p>
            </header>
            <div className="menu-grid">
              {section.menus.map((menu) => (
                <MenuCard
                  key={menu.id}
                  menu={menu}
                  onAdd={onAdd}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

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
