import { useEffect, useState } from "react";
import HomePageSection from "../components/HomePage/HomePageSection.jsx";
import MenuMarquee from "../components/HomePage/MenuMarquee.jsx";
import ImageSlider from "../components/ImageSlider";
import axios from "axios";
import FeaturedCategory from "../components/HomePage/FeaturedCategory.jsx";
import GoOrderButton from "../components/HomePage/GoOrderButton.jsx";
import {motion} from "motion/react";
import { ChatbotIcon } from "../svg/Utils.jsx";

const HomePage = () => {

  const [goOrderButtonHovered, setGoOrderButtonHovered] = useState(false);

  return (
    <>
      <HomePageSection
      flexDirection="column"
      backgroundColor="#FE7800"
      >
        <ImageSlider/>
      </HomePageSection>
      <motion.h1
        className="flex justify-center text-7xl w-full text-[#FE7800] p-[100px] font-['Whatthefont']">
        Welcome to Whattheburger
      </motion.h1>
      <HomePageSection 
        flexDirection="column"
      >
        <motion.div
          className={`relative flex justify-center h-50 gap-10 overflow-hidden transition-colors bg-gray-100 duration-500 ease-in-out ${goOrderButtonHovered ? "bg-orange-400" : ""}`}
          onHoverEnd={() => setGoOrderButtonHovered(false)}
        >
          <GoOrderButton
            goOrderButtonHovered={goOrderButtonHovered}
            setGoOrderButtonHovered={setGoOrderButtonHovered}
          />
          <motion.div
            initial={{x: "100vw"}}
            animate={{x: goOrderButtonHovered ? 0 : "100vw"}}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            transition={{ type: "spring", ease: [0.25, 0.1, 0.25, 1], duration: 0.8}}
            className={`flex justify-center self-center h-auto w-40 shadow-lg items-center border-1 border-[#FE7800] rounded-[50px] bg-white font-['Whatthefont'] text-[#FE7800] p-[20px] text-[25px] min-w-[90px] cursor-pointer ${goOrderButtonHovered ? "" : "absolute"}`}>
            Pick Up
          </motion.div>
          <motion.div
            initial={{x: "100vw"}}
            animate={{x: goOrderButtonHovered ? 0 : "100vw"}}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            transition={{ type: "spring", ease: [0.25, 0.1, 0.25, 1], duration: 0.8}}
            className={`flex justify-center self-center h-auto w-40 shadow-lg items-center border-1 border-[#FE7800] rounded-[50px] bg-white font-['Whatthefont'] text-[#FE7800] p-[20px] text-[25px] min-w-[90px] cursor-pointer ${goOrderButtonHovered ? "" : "absolute"}`}>
            Delivery
          </motion.div>
        </motion.div>
      </HomePageSection>
      <HomePageSection
        flexDirection="column"
        padding="40px 0"
      >
        <FeaturedCategory/>
      </HomePageSection>
      <HomePageSection
        justifyContent="center"
        alignItems="center"
        height={700}
      >
        <div className="flex w-[1500px] rounded-4xl bg-[#F4F8F9] font-[sans-serif] overflow-hidden">
          <div className="flex basis-1/4 justify-center items-center w-[500px] h-full border-r-1 border-gray-300">
            <img src="src\assets\images\alexander-startsev-ndNw_6QGR_c-unsplash.jpg"></img>
          </div>
          <div className="flex basis-3/4 justify-center items-center flex-col w-[500px] px-[100px] gap-10">
            <div className="flex flex-col">
              <h3>We Take pride in our craft</h3>
              <br></br>
              <p>Our made-to-order burgers are built differently. Using our signature proprietary burger smasher, our culinary masters utilize a special smashing technique to create a mouthwatering caramelized, crispy sear that seals in all the juicy goodness within.</p>
              <br></br>
            <p>Our passion for culinary innovation drives us to continuously experiment with thousands of ingredient combinations until we achieve the perfect recipe. We use only the finest, high-quality ingredients, each one meticulously selected for maximum flavor impact, including our custom burger spice blend, carefully curated to add a distinctive, bold flavor to every bite.</p>
            </div>
            <button className="flex justify-center self-center h-auto shadow-lg items-center border-1 border-[#FE7800] rounded-[50px] bg-white text-[#FE7800] p-[15px] text-[15px] min-w-[90px] cursor-pointer">About our food</button>
          </div>
        </div>
      </HomePageSection>
      <HomePageSection
      alignItems="center"
      height={500}
      >
        <div className="flex h-[400px] w-[1000px] bg-[#F4F8F9]">

        </div>
      </HomePageSection>
      <HomePageSection
        justifyContent="end"
        alignItems="center"
        height={700}
      >
        <div className="flex h-[400px] w-[1000px] bg-[#F4F8F9]">

        </div>
      </HomePageSection>
    </>
  );
}

export default HomePage;