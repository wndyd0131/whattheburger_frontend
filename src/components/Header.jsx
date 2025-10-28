import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useMediaQuery } from "@mui/material";

const Header = () => {
  const {
    userDetails
  } = useContext(UserContext);
  const isMobile = useMediaQuery('(max-width: 48rem)');

  const [headerOpened, setHeaderOpened] = useState(false);

  return (
    <>
    <AnimatePresence>
      {!isMobile &&
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
        `}
      >
        <Logo/>
        <Navigation></Navigation>
        <div className="
          flex
          justify-center
          basis-1/5
        ">
          <AuthSection></AuthSection>
          <CartButton/>
        </div>
      </motion.header>
      }
      {isMobile && headerOpened &&
      <motion.header
        initial={{y: '-5vh'}}
        animate={{y: 0}}
        exit={{x: '-100vw'}}
        className={`
          fixed
          h-full
          bg-white
          w-[350px]
          flex-col
          shadow-xl
          pl-5
          pt-2
          pb-5
          rounded-r-2xl
          z-100
        `}>
          <Logo/>
          <div className="
            flex absolute right-[15px] top-[20px] cursor-pointer
          "
            onClick={() => setHeaderOpened(false)}
          >
            <LeftArrowIcon width="20px" height="20px" color="#FE7800"/>
          </div>
          <Navigation></Navigation>
          <div className="
            flex
            justify-center
          ">
            <AuthSection></AuthSection>
            <CartButton/>
          </div>


      </motion.header>
      }
    </AnimatePresence>
    {isMobile && !headerOpened &&
      <Hamburger headerOpened={headerOpened} setHeaderOpened={setHeaderOpened}/>
    }
    </>
  );
}

export default Header;