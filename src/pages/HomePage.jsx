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

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/category")
    .then(response => {
      console.log(response);
      setCategories(response.data);
    })
    .catch(error => console.error(error));
  }, []);
  return (
    <>
      <HomePageSection
      flexDirection="column"
      backgroundColor="#FE7800"
      >
        <ImageSlider/>
      </HomePageSection>
        <motion.h1
           
          className="flex justify-self-center text-7xl text-[#FE7800] p-[100px] font-['Whatthefont']">
          Welcome to Whattheburger
        </motion.h1>
      <HomePageSection 
        flexDirection="column"
      >
        <motion.div
          className={`relative flex justify-center h-50 gap-10 overflow-hidden transition-colors duration-500 ease-in-out ${goOrderButtonHovered ? "bg-orange-100" : ""}`}
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
        <MenuMarquee/>
      </HomePageSection>
      <HomePageSection
        flexDirection="column"
        padding="60px 0"
      >
      <FeaturedCategory/>
      </HomePageSection>
    </>
  );
}

export default HomePage;