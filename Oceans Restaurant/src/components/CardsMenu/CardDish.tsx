import { useState, useEffect } from "react";
import type { Dish } from "../../types/dishes";
import styles from "./CardDish.module.scss";
import { Button, Typography } from "@mui/material";
import { GenericModal } from "../Modal/Modal";
import { ProductForm } from "../Modal/ProductForm";
import type { BaseData as InitialProductState } from "../../types/baseData";
import { fetchData } from "../../utils/fetchData";

interface CardDishProps {
  dish: Dish;
  isEditing: boolean;
}

const CardDish: React.FC<CardDishProps> = ({ dish, isEditing }) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<boolean>(false);
  const [initialProduct, setInitialProduct] = useState<InitialProductState>({
    name: "",
    description: "",
    price: 0,
    image: "",
  });

  const handleEditProd = () => {
    setTypeModal(true);
    setInitialProduct(() => ({
      name: dish.name,
      description: dish.description,
      price: dish.price,
      image: "",
    }));
    setIsModalOpen(true);
  };

  const handleUpdate = async (data: Partial<typeof initialProduct>) => {
    setTypeModal(true);
    setIsLoading(true);

    try {
      const response = await fetchData(`/menu/${dish.id}`, {
        method: "PUT",
        body: data,
      });

      if (response.status >= 400) {
        const errorMessage =
          typeof response.data === "object" &&
          response.data !== null &&
          "message" in response.data
            ? (response.data as { message: string }).message
            : "Error al crear producto";
        throw new Error(errorMessage);
      }

      setIsLoading(false);

      alert("Se ha modificado satisfactoriamente");

      console.log("Producto modificado", response.data);

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error interno del servidor", error);
    }
  };

  const handleDelete = async () => {
    setTypeModal(false);
    setIsLoading(true);

    try {
      const res = await fetchData(`/menu/${dish.id}/deactivate`, {
        method: "PUT",
      });

      if (res.ok) {
        alert("Producto borrado satisfactoriamente");
      } else {
        throw new Error("Error en el servidor");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

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
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className={styles.card}>
      <img src={dish.image} alt={dish.name} className={styles.image} />
      <div className={styles.content}>
        <h3>{dish.name}</h3>
        <p className={styles.description}>{dish.description}</p>
        <p className={styles.price}>${Number(dish.price).toFixed(2)}</p>

        {isEditing ? (
          <>
            <div className={styles.cont_editing}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditProd}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setTypeModal(false);
                  setIsModalOpen(true);
                }}
              >
                Eliminar
              </Button>
            </div>
            <GenericModal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Editar Producto"
            >
              {typeModal ? (
                <ProductForm
                  type="PUT"
                  onSubmit={handleUpdate}
                  initialData={initialProduct}
                />
              ) : (
                <div className={styles.container_delete}>
                  <Typography sx={{ color: "black" }} variant="h6">
                    ¿Seguro que deseas eliminar {dish.name}?
                  </Typography>
                  <div className={styles.confirm_delete}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleDelete}
                    >
                      Confirmar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </GenericModal>
          </>
        ) : (
          <>
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

            <Button
              variant="contained"
              color="primary"
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
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CardDish;
