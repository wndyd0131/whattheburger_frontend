import { useEffect, useState } from "react";
import Banner1 from "../assets/slideshow/web_banner_1.webp";
import Banner2 from "../assets/slideshow/web_banner_2.webp";
import Banner3 from "../assets/slideshow/web_banner_3.webp";
import Banner4 from "../assets/slideshow/web_banner_4.webp";

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
    <div className="image-slider">
      <img className="slideshow-image" src={images[index]}/>
      <div className="slide-button">
        <button className="slide-left-button" onClick={() => changeImage(0)}></button>
        <button className="slide-right-button" onClick={() => changeImage(1)}></button>
      </div>
    </div>
  );
}

export default ImageSlider;