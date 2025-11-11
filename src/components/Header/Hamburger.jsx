import { useContext } from "react";
import { HamburgerIcon } from "../../svg/Utils";
import { LayoutContext } from "../../contexts/LayoutContext";

const Hamburger = () => {
  const {
    hamburgerOpened,
    setHamburgerOpened
  } = useContext(LayoutContext);

  if (hamburgerOpened) {
    return null;
  }
  return (
    <div className="
          cursor-pointer

          md:hidden

          flex
          fixed
          justify-center
          items-center
          bg-white
          border-1
          border-gray-200
          rounded-r-md
          rounded-b-md
          shadow-2xl
          h-[50px]
          w-[50px]
          z-30
        "
        onClick={() => setHamburgerOpened(!hamburgerOpened)}
        >
        <HamburgerIcon width="40px" height="40px" color="#FE7800"/>
    </div>
  );
}

export default Hamburger;