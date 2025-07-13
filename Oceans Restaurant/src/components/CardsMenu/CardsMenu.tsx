import * as React from 'react';
import CardDish from './CardDish';
import styles from './CardsMenu.module.scss';
import { dishes } from '../../utils/dishes';
import { Autocomplete, TextField, Chip } from '@mui/material';

function CardsMenu() {
  const [selectedTitles, setSelectedTitles] = React.useState<string[]>([]);

  // Obtener todos los títulos únicos de los platos
  const dishTitles = [...new Set(dishes.map(dish => dish.name))];

  // Filtrar platos basados en títulos seleccionados
  const filteredDishes = selectedTitles.length > 0
    ? dishes.filter(dish => selectedTitles.includes(dish.name))
    : dishes;

  return (
    <div className={styles.container}>
      {/* Autocomplete para filtrar por título */}
      <div className={styles.filterContainer}>
        <Autocomplete
          multiple
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
              <Chip
                label={title}
                {...getTagProps({ index })}
                key={title}
              />
            ))
          }
        />
      </div>

      {/* Mostrar cards filtradas */}
      <div className={styles.menu}>
        {filteredDishes.map((dish) => (
          <CardDish key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
}

export default CardsMenu;