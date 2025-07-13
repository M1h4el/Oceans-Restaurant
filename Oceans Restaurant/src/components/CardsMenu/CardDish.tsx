import { useState, useEffect } from "react";
import type { Dish } from "../../utils/dishes";
import styles from "./CardDish.module.scss";

interface CardDishProps {
  dish: Dish;
}

const CardDish: React.FC<CardDishProps> = ({ dish }) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [isInCart, setIsInCart] = useState<boolean>(false);

  useEffect(() => {
    const checkCartStatus = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existing = storedCart.find((item: any) => item.id === dish.id);

      if (existing) {
        setQuantity(existing.quantity);
        setIsInCart(true);
      } else {
        setQuantity(0);
        setIsInCart(false);
      }
    };

    checkCartStatus();

    const handleCartUpdate = () => {
      checkCartStatus();
    };

    window.addEventListener("storage", handleCartUpdate);
    window.addEventListener("cartUpdated", handleCartUpdate);

    // Limpieza al desmontar
    return () => {
      window.removeEventListener("storage", handleCartUpdate);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [dish.id]);

  const handleQuantityChange = (value: number) => {
    if (isInCart) return;
    const newValue = Math.max(0, value);
    setQuantity(newValue);
  };

  const handleAddToCart = () => {
    if (isInCart || quantity <= 0) return;

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    cart = cart.filter((item: any) => item.id !== dish.id);

    cart.push({
      ...dish,
      quantity: quantity,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    setIsInCart(true);

    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("storage")); // Para sincronizar entre pestañas
  };

  return (
    <div className={styles.card}>
      <img src={dish.image} alt={dish.name} className={styles.image} />
      <div className={styles.content}>
        <h3>{dish.name}</h3>
        <p className={styles.description}>{dish.description}</p>
        <p className={styles.price}>${dish.price.toFixed(2)}</p>

        <div
          className={`${styles.quantityControl} ${
            isInCart ? styles.disabled : ""
          }`}
        >
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className={styles.quantityButton}
            disabled={isInCart}
          >
            −
          </button>
          <input
            type="number"
            min="0"
            value={quantity}
            onChange={(e) =>
              handleQuantityChange(parseInt(e.target.value) || 0)
            }
            className={styles.quantityInput}
            disabled={isInCart}
          />
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className={styles.quantityButton}
            disabled={isInCart}
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isInCart || quantity <= 0}
          className={`${styles.addButton} ${
            isInCart ? styles.added : quantity <= 0 ? styles.disabled : ""
          }`}
        >
          {isInCart
            ? "Producto agregado"
            : quantity > 0
            ? `Añadir ${quantity}`
            : "Seleccione cantidad"}
        </button>
      </div>
    </div>
  );
};

export default CardDish;
