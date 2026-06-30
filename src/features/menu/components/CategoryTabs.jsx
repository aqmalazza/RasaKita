export default function CategoryTabs({ activeCategory, categories, onChange }) {
  return (
    <div aria-label="Kategori menu" className="category-tabs" role="tablist">
      {categories.map((category) => (
        <button
          aria-selected={activeCategory === category.id}
          className={[
            "category-tab",
            activeCategory === category.id ? "category-tab--active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          key={category.id}
          onClick={() => onChange(category.id)}
          role="tab"
          type="button"
        >
          {category.name ?? category.label}
        </button>
      ))}
    </div>
  );
}
