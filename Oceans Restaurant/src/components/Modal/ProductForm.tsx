import React, { useState } from 'react';
import {
  TextField,
  Button,
  Stack
} from '@mui/material';
import type {BaseData} from '../../types/baseData'
import ImageUploader from '../ImageUploader/ImageUploader';

type ProductFormProps =
  | {
      type: "POST";
      onSubmit: (data: BaseData) => void;
    }
  | {
      type: "PUT";
      initialData: Partial<BaseData>;
      onSubmit: (data: Partial<BaseData>) => void;
    };

export const ProductForm: React.FC<ProductFormProps> = (props) => {
  const isPost = props.type === "POST";

  const [formData, setFormData] = useState<BaseData>({
    name: isPost ? '' : props.initialData.name || '',
    description: isPost ? '' : props.initialData.description || '',
    price: isPost ? 0 : props.initialData.price ?? 0,
    image: isPost ? '' : props.initialData.image || ''
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({ ...prev, image: url }));
    setIsUploading(false);
  };

  const handleUploadStart = () => {
    setIsUploading(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isPost) {
      props.onSubmit(formData);
    } else {
      const partialData = Object.fromEntries(
        Object.entries(formData).filter(([_, v]) => v !== '')
      );
      props.onSubmit(partialData);
    }
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
          required={isPost}
        />

        <TextField
          fullWidth
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          required={isPost}
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
          required={isPost}
        />

        <ImageUploader 
          onUploadComplete={handleImageUpload}
          onUploadStart={handleUploadStart}
        />

        <Button 
          type="submit" 
          variant="contained"
          disabled={isUploading}
          fullWidth
          sx={{ mt: 2 }}
        >
          {isUploading ? "Subiendo imagen..." : "Guardar Producto"}
        </Button>
      </Stack>
    </form>
  );
};
