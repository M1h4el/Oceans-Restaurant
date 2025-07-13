import styles from "./Footer.module.scss";

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
      <hr />
      <div className={styles.social_media}>
        <div>Inst</div>
        <div>Tw</div>
        <div>Face</div>
        <div>Whats</div>
        <div>Phone</div>
      </div>
    </div>
  );
}

export default Footer;
