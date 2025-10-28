import Whattheburger from "/src/assets/private/menu/Whattheburger35.png"
import ChickenFajita from "/src/assets/private/menu/ChickenFajitaTaco29.png";
import HoneyBBQ from "/src/assets/private/menu/HoneyBBQ-alacarte1.png";
import PattyMelt from "/src/assets/private/menu/PattyMelt-alacarte1.png";
import ChickenStrips from "/src/assets/private/menu/Whatthechickn-3strips1.png"

const MenuMarquee = () => {

  const popularMenuList = [
    Whattheburger,
    ChickenFajita,
    HoneyBBQ,
    PattyMelt,
    ChickenStrips,
    Whattheburger,
    ChickenFajita,
    HoneyBBQ,
    PattyMelt,
    ChickenStrips
  ];
  
  return (
    <div
      className="flex min-h-[150px] w-full">
      <div
        className="flex w-full bg-gray-100">
        <Marquee>
        {popularMenuList.map((popularMenu, idx) => {
          return (
            <a key={idx} className="flex w-[200px] h-[170px]">
              <img className="object-cover" src={popularMenu}></img>
            </a>
          );
        })}
        </Marquee>
      </div>
    </div>
  );
}

export default MenuMarquee;