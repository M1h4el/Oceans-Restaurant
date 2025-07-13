import { useState, useEffect } from "react";
import styles from "./SideBar.module.scss";
import { FaCartPlus } from "react-icons/fa";
import { IconContext } from "react-icons";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(storedCart);
    };

    loadCart();

    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener("storage", handleCartUpdate);
    window.addEventListener("cartUpdated", handleCartUpdate); // Nuevo evento

    return () => {
      window.removeEventListener("storage", handleCartUpdate);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleRemove = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id);
    updateCart(newCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleIncrement = (id: number) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    updateCart(newCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDecrement = (id: number) => {
    const newCart = cart
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity - 1;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean);
    updateCart(newCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateCart = (newCart: any[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const invoice = {
      id: Date.now(),
      products: cart,
      total,
      createdAt: new Date().toISOString(),
    };

    console.table(333333, invoice.products)
    localStorage.setItem("invoice", JSON.stringify(invoice));
    localStorage.removeItem("cart");
    setCart([]);
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Compra realizada ✅");
  };

  return (
    <>
      <button
        className={`${styles.toggleBtn} ${isOpen ? styles.open : ""}`}
        onClick={handleToggle}
      >
        <IconContext.Provider value={{ size: '25' }}>
          <FaCartPlus />
        </IconContext.Provider>
        {cart.length > 0 && (
          <span className={styles.cartCounter}>{cart.length}</span>
        )}
      </button>

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        {cart.length !== 0 && <div className={styles.stickyHeader}>
          <h4>Total: ${total.toFixed(2)}</h4>
        </div>}

        <div className={styles.cartList}>
          {cart.length === 0 ? (
            <p className={styles.emptyCart}>Carrito vacío</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.name} />
                <div className={styles.itemDetails}>
                  <p>{item.name}</p>
                  <div className={styles.itemActions}>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    <span>Cant: {item.quantity}</span>
                    <div className={styles.quantityControls}>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleDecrement(item.id)}
                      >
                        -
                      </button>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleIncrement(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      onClick={() => handleRemove(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <button className={styles.checkoutBtn} onClick={handleCheckout}>
            Finalizar compra (${total.toFixed(2)})
          </button>
        )}
      </div>
    </>
  );
};

export default SideBar;
