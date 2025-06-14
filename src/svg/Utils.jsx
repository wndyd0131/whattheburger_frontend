import { motion } from "motion/react";
import { useState } from "react";

export const CloseButton = ({color="#000000"}) => {
  return (
  <svg width="18px" height="18px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21.32L21 3.32001" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 3.32001L21 21.32" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  );
}

export const Cart = ({width, height, cartHovered, setCartHovered}) => {
  return (
    <>
      {cartHovered === false ? 
        <motion.svg className="cursor-pointer" onHoverStart={() => setCartHovered(true)} width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#FE7800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </motion.svg>
        :
        <motion.svg className="cursor-pointer" onHoverEnd={() => setCartHovered(false)} width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z" stroke="#FE7800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </motion.svg>
      }

    </>

    
  );
}

export const TrashCanIcon = ({width, height, color}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export const ChatbotIcon = () => {
  return (
    <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 5V20.7929C3 21.2383 3.53857 21.4614 3.85355 21.1464L7.70711 17.2929C7.89464 17.1054 8.149 17 8.41421 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5Z" stroke="#FE7800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 12C14.2005 12.6224 13.1502 13 12 13C10.8498 13 9.79952 12.6224 9 12" stroke="#FE7800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 8.01953V8" stroke="#FE7800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 8.01953V8" stroke="#FE7800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export const RightArrowIcon = ({width="50px", height="50px", color="#000000"}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 7L15 12L10 17" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}