import styles from "/src/styles/HomePage.module.css";

import Whattheburger from "/src/assets/private/menu/Whattheburger35.png"
import ChickenFajita from "/src/assets/private/menu/ChickenFajitaTaco29.png";
import HoneyBBQ from "/src/assets/private/menu/HoneyBBQ-alacarte1.png";
import PattyMelt from "/src/assets/private/menu/PattyMelt-alacarte1.png";
import ChickenStrips from "/src/assets/private/menu/Whatthechickn-3strips1.png"

const MenuList = () => {
  return (
    <div className={styles.menuListContainer}>
      <div className={styles.menuListBox}>
        <a className={styles.popularMenuBox}>
          <img src={Whattheburger}></img>
        </a>
        <a className={styles.popularMenuBox}>
          <img src={ChickenFajita}></img>
        </a>
        <a className={styles.popularMenuBox}>
          <img src={HoneyBBQ}></img>
        </a>
        <a className={styles.popularMenuBox}>
          <img src={PattyMelt}></img>
        </a>
        <a className={styles.popularMenuBox}>
          <img src={ChickenStrips}></img>
        </a>
      </div>
    </div>
  );
}

export default MenuList;