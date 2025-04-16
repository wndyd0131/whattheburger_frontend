import { useEffect, useState } from "react";
import styles from "../styles/HomePage.module.css";

import Banner1 from "/src/assets/private/slideshow/whataburger_banner_1.jpg";
import Banner2 from "/src/assets/private/slideshow/whataburger_banner_2.jpg";
import Banner3 from "/src/assets/private/slideshow/whataburger_banner_3.jpg";
import Banner4 from "/src/assets/private/slideshow/whataburger_banner_4.jpg";

const images = [Banner1, Banner2, Banner3, Banner4];

const ImageSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(
    () => {
      const interval = setInterval(
        () => {
          setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000
      );
      return () => clearInterval(interval);
    }, [index]
  );

  const changeImage = (direction) => {
    if (direction == 0) {
      if (index == 0) {
        setIndex(images.length - 1);
      } else {
        setIndex(index - 1);
      }
    } else {
        setIndex((index + 1) % images.length);
    }
  }

  return (
    <div className={styles.imageSliderContainer}>
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
    </div>
  );
}

export default ImageSlider;