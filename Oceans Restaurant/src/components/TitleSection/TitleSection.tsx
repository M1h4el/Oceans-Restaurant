import { useState } from "react";
import { GenericModal } from "../Modal/Modal";
import styles from "./TitleSection.module.scss";
import { ProductForm } from "../Modal/ProductForm";

interface TitleSectionProps {
  title: string;
}

function TitleSection({ title }: TitleSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = (productData: {
    name: string;
    description: string;
    price: string;
    imageUrl: string;
  }) => {
    console.log("Producto a guardar:", productData);
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title_section}>
          <h1>{title}</h1>
          {title === "Home" ? (
            <>
              <button onClick={() => setIsModalOpen((prev) => !prev)}>
                Agregar Producto
              </button>
              <GenericModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Nuevo Producto"
              >
                <ProductForm onSubmit={handleSubmit} />
              </GenericModal>
            </>
          ) : null}
        </div>
        <hr />
      </div>
    </>
  );
}

export default TitleSection;
