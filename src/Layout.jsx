import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/Common.styles.css"
import { AnimatePresence, motion } from "motion/react";
import { ChatbotIcon } from "./svg/Utils";
import Cart from "./components/Cart/Cart";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { LayoutContext } from "./contexts/LayoutContext";

const Layout = ({ children }) => { {/* nested components */}
  const {
    userDetails
  } = useContext(UserContext);

  const {
    cartOpened,
  } = useContext(LayoutContext);

  return (
    <>
      <Header></Header>
      <main className="flex flex-col flex-grow min-h-screen">{children}</main> {/* inserting nested components as dynamic content */}
      {userDetails.isAuthenticated &&
        <AnimatePresence>
          {cartOpened && <Cart/>}
        </AnimatePresence>
      }

      <Footer></Footer>
      <motion.div
        className="flex justify-center items-center fixed bottom-15 right-10 h-[70px] w-[70px] shadow-md cursor-pointer rounded-full bg-gray-100 z-20"
        whileHover={{scale: 1.1}}
      >
        <ChatbotIcon/>
      </motion.div>
    </>
  );
}

export default Layout;