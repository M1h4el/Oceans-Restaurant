import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { IconContext } from "react-icons";
import styles from "./Icons.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

interface IconInfoProps {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  children: ReactNode;
  size?: string;
  label?: string;
  displayable?: boolean;
  typeButton?: string;
  nameButton: string;
}

const IconInfo: React.FC<IconInfoProps> = ({
  setScreen,
  children,
  size = "25",
  label,
  displayable = false,
  typeButton,
  nameButton,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const {logout} = useAuth()

  const handleClick = () => {
    if (displayable) {
      setOpen((prev) => !prev);
    }
    if (typeButton === "link") {
      navigate(`${nameButton}`, { replace: true });
      setScreen(`${nameButton}`)
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <IconContext.Provider value={{ size: String(size) }}>
      <div
        ref={menuRef}
        className={`${styles.list} ${open ? styles.active : ""}`}
        onClick={handleClick}
      >
        {children}
        {label && <p>{label}</p>}

        {displayable && open && typeButton !== "link" && (
          <div className={styles.dropdown}>
            <a href="#">Opción 1</a>
            <a href="#">Ver Perfil</a>
            <a onClick={() => logout()}>Cerrar Sesión</a>
          </div>
        )}
      </div>
    </IconContext.Provider>
  );
};

export default IconInfo;
