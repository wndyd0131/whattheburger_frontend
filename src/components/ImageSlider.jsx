import React, { useEffect, useState } from "react";
import styles from "../styles/HomePage.module.css";
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
      className={styles.imageSliderContainer}>
      <img className={styles.slideshowImage} src={images[index]}/>
      <div className={styles.slideButton}>
        <button className={styles.slideLeftButton} onClick={() => changeImage(0)}>
          <img src="icons/image-slider-left-button.svg"/>
        </button>
        <button className={styles.slideRightButton} onClick={() => changeImage(1)}>
          <img src="icons/image-slider-right-button.svg"/>
        </button>
      </div>
      <div className={styles.indexSelector}>
        {images.map((_, index_) => 
          <div key={index_} className={`${styles.indexButton} ${index_ === index ? styles.active : ""}`}></div>
        )}
      </div>
    </motion.div>
  );
};

export default ImageSlider;