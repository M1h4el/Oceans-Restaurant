import styles from './RegisterForm.module.scss';
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { fetchData } from "../../utils/fetchData";
import { CreateUserDTO } from "../../dtos/Users/CreateUserDTO";
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [formData, setFormData] = useState<CreateUserDTO>({
    username: "",
    email: "",
    password: "",
    rol: "seller"
  });

  const navigate = useNavigate();

  console.log(11111111, formData);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchData<{
        user: {
          id: number;
          user_name: string;
          email: string;
          rol: string;
        };
        token: string;
      }, CreateUserDTO>('/auth/register', {
        method: 'POST',
        body: formData
      });

      console.log('Registro exitoso:', response.data);
      
      localStorage.setItem('authToken', response.data.token);
      
      navigate('/dashboard');
      
    } catch (err: any) {
      console.error('Error en registro:', err);
      
      if (err.response?.data?.error === 'El email ya está registrado') {
        setError('Este correo electrónico ya está en uso');
      } else {
        setError(err.message || 'Error al registrar. Por favor, inténtalo de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.fields}>
        <div className={styles.title}>
          <Typography variant='h4'>REGÍSTRATE</Typography>
        </div>
        
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          noValidate
        >
          <TextField
            label="Nombre de usuario"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          
          <TextField
            label="Correo electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            inputProps={{
              autoComplete: "email"
            }}
          />
          
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            inputProps={{
              autoComplete: "new-password",
              minLength: 6
            }}
          />
          
          <Button 
            type="submit" 
            variant="contained"
            disabled={isLoading}
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            {isLoading ? 'Registrando...' : 'Crear cuenta'}
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default RegisterForm;