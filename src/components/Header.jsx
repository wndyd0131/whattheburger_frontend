import Navigation from "./Navigation";
import AuthSection from "./AuthSection";
import { motion } from "framer-motion";

const Header = () => {
  return (
      <motion.header
        initial={{y: '-100vh'}}
        animate={{y: 0}}
        className="flex sticky bg-white flex-row items-center top-0 h-[60px] shadow-[0_4px_3px_-5px_rgba(0,0,0,0.5)] z-50">
          <div className="logo-container">
            <a href="/">
              <img src="private/whatthe-logo.svg"/>
              <h1>Whattheburger</h1>
            </a>
          </div>
          <Navigation></Navigation>
          <div className="misc-container">
            <AuthSection></AuthSection>
          </div>
      </motion.header>
  );
}

export default Header;