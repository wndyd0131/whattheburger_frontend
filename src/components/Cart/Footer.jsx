import React, { useContext, useState } from 'react'
import { TrashCanIcon } from '../../svg/Utils'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { LayoutContext } from '../../contexts/LayoutContext';
import { CART_ACTIONS } from '../../reducers/Cart/actions';
import { ORDER_ACTIONS } from '../../reducers/Order/actions';

const Footer = () => {

  const { 
    reducer: {
      rootState,
      dispatchRoot
    }
  } = useContext(LayoutContext);
  
  const nav = useNavigate();
  const [trashCanIconHovered, setTrashCanIconHovered] = useState(false);

  const handleClickStartOrderButton = () => {
    // reload Cart
    api.get(`/cart`)
      .then(response => {
        const data = response.data;
        dispatchRoot({
          type: CART_ACTIONS.LOAD_ALL_PRODUCTS,
          payload: {
            cartData: data
          }
        });
        dispatchRoot({
          type: ORDER_ACTIONS.TRANSFER_FROM_CART
        });
      })
      .catch(err => console.error(err));

      // order (totalPrice)
      // products
        // price
        // cal ?
        // quantity
        // options
          // traits
      nav("/order");
  }
  return (
    <div className="flex relative justify-center items-center basis-1/12 w-full border-t-1 border-gray-200 gap-10">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleClickStartOrderButton()}
          className="py-4 px-10 bg-gradient-to-r from-[#FE7800] to-orange-500 text-white text-lg font-['Whatthefont'] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-orange-500 hover:to-red-500 transform hover:-translate-y-1"
        >
          Order
        </motion.button>

      <button
        className="flex absolute right-5 justify-center items-center border-1 bg-white text-[#FE7800] border-[#FE7800] font-['Whatthefont'] w-[40px] h-[40px] rounded-full whitespace-nowrap cursor-pointer hover:bg-[#FE7800] hover:text-white hover:border-white"
        onMouseEnter={() => setTrashCanIconHovered(true)}
        onMouseLeave={() => setTrashCanIconHovered(false)}
      >
        <TrashCanIcon width={30} height={30} color={trashCanIconHovered ? "#FFFFFF" : "#FE7800"}/>
      </button>
    </div>
  )
}

export default Footer