import React, { useContext } from 'react'
import { MenuContext } from '../../contexts/MenuContext'
import { motion } from 'framer-motion'
import Cookie from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { LayoutContext } from '../../contexts/LayoutContext';
const MenuHeader = () => {
  const {
    selectedCategory
  } = useContext(MenuContext);

  const {
    selectedStoreId,
    deselectStore
  } = useContext(LayoutContext);

  const nav = useNavigate();

  const handleClickOtherStoreButton = () => {
    deselectStore();
    nav("/menu");
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center items-center pt-16 px-10 pb-8"
    >
      <div className="flex self-end">
        <div className="flex flex-col text-center">
          <span className="font-[Whatthefont] text-2xl">Store <span>#{selectedStoreId}</span></span>
          <span className="font-[sans-serif] underline text-[#FE7800] cursor-pointer" onClick={() => handleClickOtherStoreButton()}>See other stores</span>
        </div>
       
      </div>
      <motion.h1 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-5xl font-bold bg-gradient-to-r from-[#FE7800] to-orange-500 bg-clip-text text-transparent font-['Whatthefont'] mb-4"
      >
        MENU
      </motion.h1>
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-2xl text-gray-600 font-medium"
      >
        {selectedCategory?.categoryName}
      </motion.h2>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "100px" }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="h-1 bg-gradient-to-r from-[#FE7800] to-orange-500 rounded-full mt-4"
      />
    </motion.div>
  )
}

export default MenuHeader