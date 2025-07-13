import { Box, Button, TextField } from "@mui/material";
import styles from "./LogBar.module.scss";
import { useState } from "react";
import { GetUserDTO } from "../../dtos/Users/GetUserDTO";

function LogBar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dto = new GetUserDTO(email, password);
    console.log(1111111, dto);
    window.location.href = '/dashboard';
  }

  return (
    <div className={styles.Logbar}>
      <div className={styles.Logo}>Logo</div>
      <div className={styles.menu_buttons}>
        <Box 
          component='form'
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'row', gap: 5, marginRight: 5}}
        >
          <TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <TextField label='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" variant="contained">Sign In</Button>
        </Box>
      </div>
    </div>
  );
}

export default LogBar;
