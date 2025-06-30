import Navigation from "./Navigation";
import AuthSection from "./AuthSection";
import { AnimatePresence, motion } from "framer-motion";
import { LeftArrowIcon } from "../svg/Utils";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { LayoutContext } from "../contexts/LayoutContext";
import axios from "axios";
import Logo from "./Layout/Logo";
import Hamburger from "./Header/Hamburger";
import CartButton from "./Header/CartButton";

const Header = () => {
  const {
    userDetails
  } = useContext(UserContext);

  const [headerOpened, setHeaderOpened] = useState(false);

  return (
    <>
    <AnimatePresence>
      <motion.header
        initial={{y: '-5vh'}}
        animate={{y: 0}}
        exit={{x: '-100vw'}}
        className={`
          flex
          sticky
          bg-white
          flex-row
          items-center
          top-0
          left-0
          h-[60px]
          shadow-[0_4px_3px_-5px_rgba(0,0,0,0.5)]
          z-40

          max-md:fixed
          max-md:h-full
          max-md:w-[350px]
          max-md:flex-col
          max-md:shadow-xl
          max-md:pl-5
          max-md:pt-2
          max-md:pb-5
          max-md:rounded-r-2xl
          max-md:${headerOpened ? "" : "hidden"}
        `}>
          <Logo/>
          <div className="
            flex absolute right-[15px] top-[20px] cursor-pointer
            
            md:hidden
          "
            onClick={() => setHeaderOpened(!headerOpened)}
          >
            <LeftArrowIcon width="20px" height="20px" color="#FE7800"/>
          </div>
          <Navigation></Navigation>
          <div className="
            flex
            justify-center
            md:basis-1/5
          ">
            <AuthSection></AuthSection>
            <CartButton/>
          </div>


        </motion.header>
    </AnimatePresence>
    <Hamburger headerOpened={headerOpened} setHeaderOpened={setHeaderOpened}/>
    </>
  );
}

export default Header;