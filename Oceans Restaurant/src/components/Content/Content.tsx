import { Typography } from "@mui/material";
import RegisterForm from "../RegisterForm/RegisterForm";
import styles from "./Content.module.scss";

function Content() {
  return (
    <>
      <div className={styles.cont_container}>
        <div className={styles.logo}>
          <Typography variant="h6" sx={{width: "550px", textAlign: "left"}}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias,
            error. Expedita saepe in laborum id repellendus veniam, odio ipsum
            libero sint cupiditate doloremque fugiat enim minima deserunt
            recusandae aliquid at?
          </Typography>
        </div>
        <div className={styles.register_form}>
          <RegisterForm />
        </div>
      </div>
    </>
  );
}

export default Content;
