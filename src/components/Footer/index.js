import styles from "@/components/Footer/Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerContent}>
        {/* FOOTER LEFT */}
        <div className={styles.footerLeft}>
          <ul className={styles.footerItems}>
            <li>Fatec Registro</li>
            <li>DSM</li>
            <li>Desenvolvimento Web III</li>
          </ul>
        </div>
        {/* FOOTER RIGHT */}
        <div className={styles.footerRight}>
          <ul>
            <li>
              Dados: <a href="https://rickandmortyapi.com" target="_blank" rel="noreferrer">The Rick and Morty API</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
