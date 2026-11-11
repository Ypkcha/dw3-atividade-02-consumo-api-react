import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import styles from "@/components/Menu/Menu.module.css";
import Link from "next/link";

const Menu = () => {
  const [isActive, setIsActive] = useState(false);

  const activeMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Rick and Morty</Link>
      </div>
      <div className={styles.menu}>
        <ul
          className={`${styles.menuItems} ${isActive ? styles.active : ""}`}
          id={styles.menuItems}
        >
          <li>
            <Link href="/" onClick={() => setIsActive(false)}>
              Catálogo
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.menuBtn} id="menuBtn">
        {/* Ícone do React Icons */}
        <i id={styles.menuIcon} onClick={activeMenu}>
          {isActive ? <IoClose /> : <FaBars />}
        </i>
      </div>
    </nav>
  );
};

export default Menu;
