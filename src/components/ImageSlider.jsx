import { useEffect, useState } from "react";
import Banner1 from "../assets/slideshow/whataburger_banner_1.jpg";
import Banner2 from "../assets/slideshow/whataburger_banner_2.jpg";
import Banner3 from "../assets/slideshow/whataburger_banner_3.jpg";
import Banner4 from "../assets/slideshow/whataburger_banner_4.jpg";

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
    <>
      <img className="slideshow-image" src={images[index]}/>
      <div className="slide-button">
        <button className="slide-left-button" onClick={() => changeImage(0)}>
          <img src="icons/image-slider-left-button.svg"/>
        </button>
        <button className="slide-right-button" onClick={() => changeImage(1)}>
          <img src="icons/image-slider-right-button.svg"/>
        </button>
      </div>
      <div className="index-selector">
        {images.map((_, index_) => 
          <div key={index_} className={`index-button ${index_ === index ? "active" : ""}`}></div>
        )}
      </div>
    </>
  );
}

export default ImageSlider;