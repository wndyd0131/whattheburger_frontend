import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

import Banner1 from "/src/assets/private/slideshow/whatheburger_banner_1.webp";
import Banner2 from "/src/assets/private/slideshow/whatheburger_banner_2.webp";
import Banner3 from "/src/assets/private/slideshow/whatheburger_banner_3.webp";

const images = [Banner1, Banner2, Banner3];

const ImageSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(
    () => {
      const interval = setInterval(
        () => {
          setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
      return () => clearInterval(interval);
    }, []);

  const changeImage = (direction) => {
    const left = 0;
    setIndex(prev =>
      direction === left
      ? (prev - 1 + images.length) % images.length // left
      : (prev + 1) % images.length // right
    );
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 30}}
      whileInView={{opacity: 1, y: 0}}
      transition={{ duration: 1.5, ease: "easeInOut"}}
      className="flex relative justify-center items-center overflow-hidden">
      <img className="block w-[1000px] h-auto object-contain rounded-[10px]" src={images[index]}/>
      <div>
        <button className="flex absolute justify-center border-1 border-[rgba(0,0,0,0.05)] rounded-[30px] bg-[rgba(0,0,0,0.4)] w-[50px] h-[50px] translate-y-[-50%] top-[50%] left-0 ml-[20px] cursor-pointer" onClick={() => changeImage(0)}>
          <img src="icons/image-slider-left-button.svg"/>
        </button>
        <button className="flex absolute justify-center border-1 border-[rgba(0,0,0,0.05)] rounded-[30px] bg-[rgba(0,0,0,0.4)] w-[50px] h-[50px] translate-y-[-50%] top-[50%] right-0 ml-[20px] cursor-pointer" onClick={() => changeImage(1)}>
          <img src="icons/image-slider-right-button.svg"/>
        </button>
      </div>
      <div className="flex absolute justify-center items-center px-[5px] py-[10px] max-w-[100px] translate-x-[-50%] h-[12px] border-1 border-[rgba(0,0,0,0.05)] bg-[rgba(0,0,0,0.4)] rounded-[30px] left-[50%] bottom-[30px] gap-[6px]">
        {images.map((_, index_) => 
          <div key={index_} className={`w-[5px] h-[5px] rounded-full cursor-pointer ${index_ === index ? "bg-white" : "bg-gray-500"}`}></div>
        )}
      </div>
    </motion.div>
  );
};

export default ImageSlider;