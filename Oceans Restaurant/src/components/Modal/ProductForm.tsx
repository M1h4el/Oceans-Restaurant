import React, { useState } from 'react';
import {
  TextField,
  Button,
  Stack
} from '@mui/material';
import ImageUploader from '../ImageUploader/ImageUploader';

interface ProductFormProps {
  onSubmit: (data: {
    name: string;
    description: string;
    price: string;
    imageUrl: string;
  }) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url: string) => {
    console.log('URL de imagen subida a Firebase:', url); // ← Aquí verás la URL
    setFormData(prev => ({ ...prev, imageUrl: url }));
    setIsUploading(false); // ← Importante: Desactivar estado de carga
  };

  const handleUploadStart = () => {
    setIsUploading(true); // ← Activar al comenzar subida
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos a enviar al backend:', formData); // ← Verás todos los datos incluida la URL
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          required
        />

        <TextField
          fullWidth
          label="Precio"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          InputProps={{ startAdornment: '$' }}
          inputProps={{ min: 0, step: 0.01 }}
          required
        />

        <ImageUploader 
          onUploadComplete={handleImageUpload}
          onUploadStart={handleUploadStart} // ← Nueva prop
        />

        <Button 
          type="submit" 
          variant="contained"
          disabled={!formData.imageUrl || isUploading}
          fullWidth
          sx={{ mt: 2 }}
        >
          {isUploading ? "Subiendo imagen..." : "Guardar Producto"}
        </Button>
      </Stack>
    </form>
  );
};