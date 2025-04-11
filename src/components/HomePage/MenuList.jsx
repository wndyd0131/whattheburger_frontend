import Whataburger from "/src/assets/private/menu/Whataburger35.png"
import ChickenFajita from "/src/assets/private/menu/ChickenFajitaTaco29.png";
import HoneyBBQ from "/src/assets/private/menu/HoneyBBQ-alacarte1.png";
import PattyMelt from "/src/assets/private/menu/PattyMelt-alacarte1.png";
import ChickenStrips from "/src/assets/private/menu/Whatachickn-3strips1.png"
const MenuList = () => {
  return (
    <div className="menu-list-box">
      <a className="popular-menu-box">
        <img src={Whataburger}></img>
      </a>
      <a className="popular-menu-box">
        <img src={ChickenFajita}></img>
      </a>
      <a className="popular-menu-box">
        <img src={HoneyBBQ}></img>
      </a>
      <a className="popular-menu-box">
        <img src={PattyMelt}></img>
      </a>
      <a className="popular-menu-box">
        <img src={ChickenStrips}></img>
      </a>
    </div>
  );
}

export default MenuList;