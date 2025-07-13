import styles from './RegisterForm.module.scss'
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { CreateUserDTO } from "../../dtos/Users/CreateUserDTO";

function RegisterForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dto = new CreateUserDTO(userName, email, password);
    console.log(1111111, dto);
  }
  return (
    <div className={styles.container}>
      <div className={styles.fields}>
        <div className={styles.title}>
            <Typography variant='h4'>REGISTRATE</Typography>
        </div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Nombre"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Sign Up
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default RegisterForm;
