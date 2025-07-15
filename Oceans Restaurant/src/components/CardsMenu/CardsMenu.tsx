import { useState, useEffect, useMemo } from "react";
import CardDish from "./CardDish";
import styles from "./CardsMenu.module.scss";
import { Autocomplete, TextField, Chip, Button } from "@mui/material";
import { GenericModal } from "../Modal/Modal";
import { ProductForm } from "../Modal/ProductForm";
import { fetchData } from "../../utils/fetchData";
import type { Dish } from "../../types/dishes";
import type { BaseData } from "../../types/baseData";

type GetMenuResponse = {
  success: boolean;
  data: Dish[];
};

type ApiResponse = {
  status: number;
  data: GetMenuResponse | { message: string };
};

type InfoUser = {
  active: number;
  email: string;
  id: number;
  rol: "owner" | "seller";
  user_name: string;
} | null;

function CardsMenu() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [roleUser, setRoleUser] = useState<"seller" | "owner">("seller");

  const dishTitles = useMemo(
    () => [...new Set(dishes.map((dish) => dish.name))],
    [dishes]
  );
  const filteredDishes = useMemo(
    () =>
      selectedTitles.length > 0
        ? dishes.filter((dish) => selectedTitles.includes(dish.name))
        : dishes,
    [dishes, selectedTitles]
  );

  useEffect(() => {
    const getDishes = async () => {
      setIsLoading(true);
      try {
        const res = await fetchData<GetMenuResponse>("/menu/", {
          method: "GET",
        });

        if (res.data && Array.isArray(res.data.data)) {
          setDishes(res.data.data);
        } else {
          console.error("La respuesta no tiene el formato esperado", res.data);
        }
      } catch (error) {
        console.error("Error al cargar platos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const infoString = localStorage.getItem("info");
    const info: InfoUser = infoString ? JSON.parse(infoString) : null;

    setRoleUser(info?.rol ?? "seller");

    getDishes();
  }, []);

  const handleEditingModeOn = () => {
    setIsEditing(true);
  };

  const handleEditingModeOff = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (productData: BaseData) => {
    try {
      setIsLoading(true);
      const response = await fetchData<ApiResponse>("/menu/", {
        method: "POST",
        body: productData,
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

      const updatedRes = await fetchData<GetMenuResponse>("/menu/", {
        method: "GET",
      });
      if (updatedRes.data && Array.isArray(updatedRes.data.data)) {
        setDishes(updatedRes.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <Autocomplete
          sx={{ width: "800px" }}
          multiple
          disabled={isLoading}
          options={dishTitles}
          value={selectedTitles}
          onChange={(_, newValues) => setSelectedTitles(newValues)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Filtrar por plato"
              placeholder="Escribe para buscar"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((title, index) => (
              <Chip label={title} {...getTagProps({ index })} key={title} />
            ))
          }
        />
        {roleUser === "owner" ? (
          <div className={styles.list_buttons}>
            <div className={styles.div_button}>
              <Button
                variant="contained"
                color="success"
                onClick={() => setIsModalOpen(true)}
                disabled={isLoading || isEditing}
              >
                Agregar Producto
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                disabled={isEditing}
                onClick={handleEditingModeOn}
              >
                Modo edición
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                color="error"
                disabled={!isEditing}
                onClick={handleEditingModeOff}
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : null}

        <GenericModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Nuevo Producto"
        >
          <ProductForm onSubmit={handleSubmit} type="POST" />
        </GenericModal>
      </div>

      {isLoading && dishes.length === 0 ? (
        <div>Cargando...</div>
      ) : (
        <div className={styles.menu}>
          {filteredDishes.map((dish) => (
            <CardDish
              key={`${dish.id}-${dish.name}`}
              dish={dish}
              isEditing={isEditing}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CardsMenu;
