import { useMemo, useState } from "react";
import Modal from "../../../components/common/Modal.jsx";
import PageHeader from "../../../components/common/PageHeader.jsx";
import { categoryData } from "../../../data/categoryData.js";
import { menuData } from "../../../data/menuData.js";
import FloatingCartButton from "../../cart/components/FloatingCartButton.jsx";
import { useCart } from "../../cart/hooks/useCart.js";
import CategoryTabs from "../components/CategoryTabs.jsx";
import MenuDetailSheet from "../components/MenuDetailSheet.jsx";
import MenuGrid from "../components/MenuGrid.jsx";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [notice, setNotice] = useState(null);
  const { addItem, totalItems, totalPrice } = useCart();

  const filteredMenus = useMemo(() => {
    if (activeCategory === "all") {
      return menuData;
    }

    return menuData.filter((menu) => menu.category === activeCategory);
  }, [activeCategory]);

  const handleAdd = (menu, quantity = 1) => {
    const isAdded = addItem(menu, quantity);

    setNotice({
      title: isAdded ? "Menu ditambahkan" : "Menu tidak tersedia",
      message: isAdded
        ? `${quantity} ${menu.name} masuk ke keranjang.`
        : `${menu.name} sedang tidak bisa dipesan.`,
    });
  };

  return (
    <div className="page-stack">
      <PageHeader
        description="Pilih menu, atur jumlah, lalu lanjutkan ke keranjang."
        title="Pesanan Ilkom 25"
      />
      <CategoryTabs
        activeCategory={activeCategory}
        categories={categoryData}
        onChange={setActiveCategory}
      />
      <MenuGrid
        menus={filteredMenus}
        onAdd={handleAdd}
        onSelect={setSelectedMenu}
      />
      <MenuDetailSheet
        menu={selectedMenu}
        onAdd={handleAdd}
        onClose={() => setSelectedMenu(null)}
      />
      <Modal
        footer={null}
        isOpen={Boolean(notice)}
        onClose={() => setNotice(null)}
        title={notice?.title ?? ""}
        variant="center"
      >
        <p>{notice?.message}</p>
      </Modal>
      <FloatingCartButton totalItems={totalItems} totalPrice={totalPrice} />
    </div>
  );
}
