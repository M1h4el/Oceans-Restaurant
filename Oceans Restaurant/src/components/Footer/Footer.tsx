import styles from "./Footer.module.scss";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { LiaFacebook } from "react-icons/lia";
import { IconContext } from "react-icons";

interface IconButton {
  icon: React.ReactNode;
  typeButton: "link" | "button" | "submit";
  nameButton: string;
  url?: string;
}

const iconButtons: IconButton[] = [
  {
    icon: <FaXTwitter />,
    typeButton: "link",
    nameButton: "X",
    url: "https://twitter.com"
  },
  {
    icon: <FaInstagram />,
    typeButton: "link",
    nameButton: "Instagram",
    url: "https://instagram.com"
  },
  {
    icon: <FaWhatsapp />,
    typeButton: "link",
    nameButton: "Whatsapp",
    url: "https://wa.me"
  },
  {
    icon: <LiaFacebook />,
    typeButton: "link",
    nameButton: "Facebook",
    url: "https://facebook.com"
  }
];

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.links_list}>
        <a href="#">
          <h5>About Us</h5>
        </a>
        <a href="#">
          <h5>Contact Us</h5>
        </a>
        <a href="#">
          <h5>Network</h5>
        </a>
        <a href="#">
          <h5>More Info</h5>
        </a>
      </div>
      <hr className={styles.divider} />
      <div className={styles.social_media}>
        <IconContext.Provider value={{ 
          className: styles.social_icon,
          size: "1.5em"
        }}>
          {iconButtons.map(({ icon, nameButton, url }, index) => (
            <a 
              key={`${nameButton}-${index}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social_link}
              aria-label={nameButton}
            >
              {icon}
            </a>
          ))}
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default Footer;