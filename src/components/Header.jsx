import Navigation from "./Navigation";
import AuthSection from "./AuthSection";
import { motion } from "framer-motion";

const Header = () => {
  return (
      <motion.header
        initial={{y: '-5vh'}}
        animate={{y: 0}}
        className="flex sticky bg-white flex-row items-center top-0 h-[60px] shadow-[0_4px_3px_-5px_rgba(0,0,0,0.5)] z-50">
          <div className="flex basis-1/5 justify-start pl-5">
            <a className="flex" href="/">
              <img className="h-18" src="public/private/logo/whattheburger-logo.png"/>
              <p className="self-center font-['Whatthefont'] text-[#FE7800] text-2xl">Whattheburger</p>
            </a>
          </div>
          <Navigation></Navigation>
          <div className="flex justify-end pr-5 basis-1/5">
            <AuthSection></AuthSection>
          </div>
      </motion.header>
  );
}

export default Header;