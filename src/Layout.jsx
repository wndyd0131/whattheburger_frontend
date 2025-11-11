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
import { CART_ACTIONS } from "./reducers/Cart/actions";
import api from "./utils/api";
import { Outlet, useLocation } from "react-router-dom";
import Cookie from "js-cookie";
import { fetchCart } from "./api/cart";

const Layout = () => { {/* nested components */}
  const {
    userDetails
  } = useContext(UserContext);

  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: "smooth"});
  }, [pathname, hash])

  const {
    cartOpened,
    selectedStoreId,
    setSelectedStoreId,
    reducer
  } = useContext(LayoutContext);

  const {
    rootState,
    dispatchRoot
  } = reducer;


  useEffect(() => {
    const storeId = Cookie.get("storeId");
    if (storeId) {
      fetchCart(storeId)
        .then(data => {
          dispatchRoot({
            type: CART_ACTIONS.LOAD_ALL_PRODUCTS,
            payload: {
              cartData: data
            }
          });
          setSelectedStoreId(storeId);
        })
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <div>
      <Header></Header>
      <main className="flex flex-col flex-grow min-h-screen">
        <Outlet/>
      </main> {/* inserting nested components as dynamic content */}
      
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
    </div>
  );
}

export default Layout;