import { motion } from "motion/react";
import Header from "./Header";
import OrderList from "./OrderList";
import Footer from "./Footer";
import { useContext, useEffect, useRef } from "react";
import { LayoutContext } from "../../contexts/LayoutContext";
const Cart = () => {

  const {
    setCartOpened,
  } = useContext(LayoutContext);

  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      console.log(ref.current);
      console.log(e.target);
      if (!ref.current?.contains(e.target)) { // if current element does not contain target element
        setCartOpened(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  return (
      <motion.div
        initial={{x: "100vw", opacity: 0}}
        animate={{x: 0, opacity: 1}}
        exit={{x: "100vw", opacity: 0}}
        transition={{type: 'tween'}}
        ref={ref}
        className="fixed flex flex-col bg-white w-[700px] right-0 top-[60px] bottom-0 rounded-l-4xl h-[calc(100vh-60px)] border-1 border-gray-200 shadow-2xl z-30"
      >
        <Header/>
        <OrderList/>
        <Footer/>
      </motion.div>
  )
}

export default Cart