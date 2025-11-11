import { useContext } from "react";
import { Link } from "react-router-dom";
import { LayoutContext } from "../../contexts/LayoutContext";
const Logo = () => {

  const {
    setHamburgerOpened
  } = useContext(LayoutContext);

  const handleClickLogo = () => {
    setHamburgerOpened(false);
  }

  return (
    <div className="
      flex
      basis-1/5
      justify-start

      max-md:basis-0
      max-md:mt-5
      max-md:mb-15
      max-md:self-start
    ">
      <Link className="flex items-center" to="/" onClick={handleClickLogo}>
        <img className="h-18 min-w-18" src="/logos/whattheburger-logo.png"/>
        <p className="flex font-['Whatthefont'] text-[#FE7800] text-2xl">Whattheburger</p>
      </Link>
    </div>
  )
}

export default Logo;