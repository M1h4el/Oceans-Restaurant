import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./LogBar.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUserDTO } from "../../dtos/Users/GetUserDTO";
import { fetchData } from "../../utils/fetchData";

function LogBar() {
  const [formData, setFormData] = useState<GetUserDTO>({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      }>('/auth/login', {
        method: 'POST',
        body: formData
      });

      console.log("response", response)

      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('info', JSON.stringify(response.data.user))
      navigate('/dashboard');

    } catch (err: any) {
      console.error('Error en login:', err);
      setError(err.response?.data?.error || 'Credenciales incorrectas');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.Logbar}>
      <div className={styles.Logo}>
        <Typography variant="h6" component="div">
          Logo
        </Typography>
      </div>
      
      <div className={styles.menu_buttons}>
        <Box 
          component="form"
          onSubmit={handleSubmit}
          sx={{ 
            display: 'flex', 
            flexDirection: 'row', 
            gap: 2, 
            alignItems: 'center',
            marginRight: 2
          }}
        >
          {error && (
            <Typography color="error" sx={{ mr: 2 }}>
              {error}
            </Typography>
          )}
          
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            size="small"
            autoComplete="email"
          />
          
          <TextField
            label="Contraseña"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            size="small"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          
          <Button 
            type="submit" 
            variant="contained"
            disabled={isLoading}
            size="medium"
          >
            {isLoading ? 'Ingresando...' : 'Sign In'}
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default LogBar;