import React from 'react'
import { motion } from "framer-motion";

const Button1 = ({children, fontFamily='sans-serif', ...props}) => {
  return (
    <motion.button 
      {...props}
      style={{fontFamily: fontFamily}}
      className={`bg-white text-[#FE7800] border-2 border-[#FE7800] hover:bg-orange-50 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200`} 
    >
      {children}
    </motion.button>
  )
}

export default Button1;