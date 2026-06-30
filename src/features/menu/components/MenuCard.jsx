import { ShoppingCart } from "lucide-react";
import Button from "../../../components/common/Button.jsx";
import { DEFAULT_MENU_IMAGE } from "../../../data/menuData.js";
import { formatCurrency } from "../../../lib/formatCurrency.js";

export default function MenuCard({ menu, onAdd, onSelect }) {
  return (
    <article className="menu-card">
      <button
        className="menu-card__image"
        onClick={() => onSelect(menu)}
        type="button"
      >
        <img
          alt={menu.name}
          onError={(event) => {
            event.currentTarget.src = DEFAULT_MENU_IMAGE;
          }}
          src={menu.image || DEFAULT_MENU_IMAGE}
        />
        {!menu.isAvailable ? (
          <span className="menu-card__unavailable">Habis</span>
        ) : null}
      </button>
      <div className="menu-card__body">
        <button
          className="menu-card__text-button"
          onClick={() => onSelect(menu)}
          type="button"
        >
          <h2>{menu.name}</h2>
          <p>{menu.description}</p>
        </button>
        <div className="menu-card__price-row">
          <span className="price-text">{formatCurrency(menu.price)}</span>
          <Button
            aria-label={`Tambah ${menu.name}`}
            className="button--icon"
            disabled={!menu.isAvailable}
            onClick={() => onAdd(menu, 1)}
            size="sm"
          >
            <ShoppingCart size={16} />
          </Button>
        </div>
      </div>
    </article>
  );
}
