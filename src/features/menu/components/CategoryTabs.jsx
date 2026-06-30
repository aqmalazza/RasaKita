import { useEffect, useRef } from "react";

export default function CategoryTabs({ activeCategory, categories, onChange }) {
  const activeButtonRef = useRef(null);

  useEffect(() => {
    activeButtonRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeCategory]);

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
          ref={activeCategory === category.id ? activeButtonRef : null}
          role="tab"
          type="button"
        >
          {category.name ?? category.label}
        </button>
      ))}
    </div>
  );
}
