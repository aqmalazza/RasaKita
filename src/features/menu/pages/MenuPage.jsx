import { useEffect, useMemo, useRef, useState } from "react";
import Toast from "../../../components/feedback/Toast.jsx";
import { brandData } from "../../../data/brandData.js";
import { categoryData } from "../../../data/categoryData.js";
import { menuData } from "../../../data/menuData.js";
import FloatingCartButton from "../../cart/components/FloatingCartButton.jsx";
import { useCart } from "../../cart/hooks/useCart.js";
import CategoryTabs from "../components/CategoryTabs.jsx";
import MenuDetailSheet from "../components/MenuDetailSheet.jsx";
import MenuGrid from "../components/MenuGrid.jsx";
import MenuHero from "../components/MenuHero.jsx";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [notice, setNotice] = useState(null);
  const sectionRefs = useRef(new Map());
  const { addItem, totalItems, totalPrice } = useCart();
  const categoryTabs = useMemo(
    () => [{ id: "all", name: "Semua" }, ...categoryData],
    []
  );

  const menuSections = useMemo(
    () =>
      categoryData.map((category) => ({
        category,
        menus: menuData.filter((menu) => menu.category === category.name),
      })),
    []
  );

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (firstEntry, secondEntry) =>
              firstEntry.boundingClientRect.top -
              secondEntry.boundingClientRect.top
          )[0];

        const categoryId = visibleEntry?.target.dataset.categoryId;

        if (categoryId) {
          setActiveCategory(categoryId);
        }
      },
      {
        rootMargin: "-112px 0px -58% 0px",
        threshold: 0.01,
      }
    );

    sectionRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, [menuSections]);

  const setSectionRef = (categoryId, node) => {
    if (!node) {
      sectionRefs.current.delete(categoryId);
      return;
    }

    sectionRefs.current.set(categoryId, node);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);

    if (categoryId === "all") {
      window.scrollTo({ behavior: "smooth", top: 0 });
      return;
    }

    sectionRefs.current
      .get(categoryId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAdd = (menu, quantity = 1) => {
    const isAdded = addItem(menu, quantity);

    setNotice({
      title: isAdded ? "Menu ditambahkan" : "Menu tidak tersedia",
      variant: isAdded ? "success" : "danger",
      message: isAdded
        ? `${quantity} ${menu.name} masuk ke keranjang.`
        : `${menu.name} sedang tidak bisa dipesan.`,
    });
  };

  return (
    <div className="page-stack">
      <MenuHero brand={brandData} />
      <CategoryTabs
        activeCategory={activeCategory}
        categories={categoryTabs}
        onChange={handleCategoryChange}
      />
      <MenuGrid
        onAdd={handleAdd}
        onSelect={setSelectedMenu}
        sections={menuSections}
        setSectionRef={setSectionRef}
      />
      <MenuDetailSheet
        menu={selectedMenu}
        onAdd={handleAdd}
        onClose={() => setSelectedMenu(null)}
      />
      <Toast
        isOpen={Boolean(notice)}
        message={notice?.message}
        onClose={() => setNotice(null)}
        title={notice?.title ?? ""}
        variant={notice?.variant}
      />
      <FloatingCartButton totalItems={totalItems} totalPrice={totalPrice} />
    </div>
  );
}
