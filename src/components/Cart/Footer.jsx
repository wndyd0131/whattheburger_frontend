import React, { useContext, useState } from 'react'
import { CloseButton, LoadingSpinner, TrashCanIcon } from '../../svg/Utils'
import { motion } from "framer-motion";
import api from '../../utils/api';
import { LayoutContext } from '../../contexts/LayoutContext';
import { CART_ACTIONS } from '../../reducers/Cart/actions';
import SignInSection from './SignInSection';
import { toast } from 'react-toastify';
import { deleteCart, deleteCartItem } from '../../api/cart';
import Cookie from "js-cookie";
import { UserContext } from '../../contexts/UserContext';
import { createOrderSession } from '../../api/order';
import { ORDER_SESSION_ACTIONS } from '../../reducers/OrderSession/action';
import { useNavigate } from 'react-router-dom';

const Footer = () => {

  const { 
    reducer: {
      rootState,
      dispatchRoot
    },
    setCartOpened
  } = useContext(LayoutContext);

  const {
    userDetails
  } = useContext(UserContext);

  const nav = useNavigate();

  const cartState = rootState.cartState;

  const [isLoading, setIsLoading] = useState(false);
  const [trashCanIconHovered, setTrashCanIconHovered] = useState(false);

  const [signInModalOpened, setSignInModalOpened] = useState(false);
  const [closeButtonHovered, setCloseButtonHovered] = useState(false);
  
  const handleClickCloseButton = () => {
    setSignInModalOpened(false);
  }
  const handleClickOrderButton = () => {
    if (userDetails?.isAuthenticated) {
      const storeId = Cookie.get("storeId");
      const orderType = Cookie.get("orderType");
      const requestBody = {
        orderType: orderType
      }
      if (storeId) {
        setIsLoading(true);
        createOrderSession(storeId, requestBody)
        .then(data => {
          dispatchRoot({
            type: ORDER_SESSION_ACTIONS.LOAD_SESSION,
            payload: {
              orderSessionResponse: data
            }
          });
          const orderSessionId = data.sessionId;
          nav(`/order-session/${orderSessionId}/store/${storeId}`);
          setCartOpened(false);
          setSignInModalOpened(false);
        })
        .catch(err => console.error(err))
        .finally(() => {
          setIsLoading(false);
        })
      }
      return;
    }
    setSignInModalOpened(true);
  }

  const handleClickTrashCanIcon = () => {
    const storeId = Cookie.get("storeId");
    deleteCart(storeId)
     .then(data => {
        const cartData = data;
        dispatchRoot({
          type: CART_ACTIONS.LOAD_ALL_PRODUCTS,
          payload: {
            cartData: cartData
          }
        });
        toast.success('Successfully deleted from cart');
      })
      .catch(
        err => {
          toast.error('Failed to delete from cart');
          console.error(err);
        });
  }

  return (
    <>
      <div className="flex relative justify-center items-center basis-1/12 w-full border-t-1 p-5 border-gray-200 gap-10">
          <motion.button
            onClick={() => handleClickOrderButton()}
            disabled={cartState.cartList.length === 0}
            className={`py-4 px-10 text-white text-lg font-['Whatthefont'] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
              ${cartState.cartList.length === 0 ? "bg-gray-300" : "bg-gradient-to-r from-[#FE7800] to-orange-500 hover:from-orange-500 hover:to-red-500 transform"}  
            `}
          >
            {isLoading ? <LoadingSpinner/> : "Order"}
          </motion.button>

        <button
          className={`
            flex absolute right-5 justify-center items-center border  font-['Whatthefont'] w-[40px] h-[40px] rounded-full whitespace-nowrap
            ${cartState.cartList.length === 0 ? "border-gray-200 bg-gray-200" : "bg-white border-[#FE7800] hover:bg-[#FE7800] hover:border-white cursor-pointer"}
            `}
          disabled={cartState.cartList.length === 0}
          onClick={() => handleClickTrashCanIcon()}
          onMouseEnter={() => setTrashCanIconHovered(true)}
          onMouseLeave={() => setTrashCanIconHovered(false)}
        >
          <TrashCanIcon width={30} height={30} color={trashCanIconHovered ? "#FFFFFF" : cartState.cartList.length === 0 ? "#999999" : "#FE7800"}/>
        </button>
      </div>
      {
        signInModalOpened &&
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{ duration: 0.3 }}
          className="flex fixed justify-center items-center w-full h-full top-0 left-0 bg-black/60 backdrop-blur-sm z-50"
        >
          <motion.div 
            initial={{y: 100, opacity: 0, scale: 0.9}}
            animate={{y: 0, opacity: 1, scale: 1}}
            exit={{y: 100, opacity: 0, scale: 0.9}}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col px-30 pb-10 pt-5 relative rounded-3xl bg-white overflow-hidden shadow-2xl border border-gray-100"
          >
            <div
              className="absolute right-5 cursor-pointer"
              onClick={() => handleClickCloseButton()}
              onMouseEnter={() => setCloseButtonHovered(true)}
              onMouseLeave={() => setCloseButtonHovered(false)}
            >
              <CloseButton
                color={closeButtonHovered ? "#FE7800" : "#000000"}
              />
            </div>
            <SignInSection signInModalOpened={signInModalOpened} setSignInModalOpened={setSignInModalOpened}/>
          </motion.div>
        </motion.div>
      }
    </>
  )
}

export default Footer