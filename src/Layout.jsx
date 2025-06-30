import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/Common.styles.css"
import { AnimatePresence, motion } from "motion/react";
import { ChatbotIcon } from "./svg/Utils";
import Cart from "./components/Cart/Cart";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { LayoutContext } from "./contexts/LayoutContext";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { CART_ACTIONS } from "./reducers/Cart/actions";
import api from "./utils/api";

const Layout = ({ children }) => { {/* nested components */}
  const {
    userDetails
  } = useContext(UserContext);

  const {
    cartOpened,
    reducer
  } = useContext(LayoutContext);

  const {
    dispatchRoot
  } = reducer;

  useEffect(() => {
    api.get("/cart")
    .then(response => {
      console.log("CART_RESPONSE", response.data);
      const cartData = response.data;
      dispatchRoot({
        type: CART_ACTIONS.HYDRATE,
        payload: {
          cartData: cartData
        }
      })
    })
    .catch(err => console.error(err));
  }, [])

  return (
    <>
      <Header></Header>
      <main className="flex flex-col flex-grow min-h-screen">{children}</main> {/* inserting nested components as dynamic content */}
      
      <AnimatePresence>
        {cartOpened && <Cart/>}
      </AnimatePresence>
      
      <ToastContainer
          position="bottom-right"
          autoClose={2000}
          theme="light"
      />
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