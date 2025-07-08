import { useState } from "react";
import HomePageSection from "../components/HomePage/HomePageSection.jsx";
import ImageSlider from "../components/ImageSlider";
import FeaturedCategory from "../components/HomePage/FeaturedCategory.jsx";
import GoOrderButton from "../components/HomePage/GoOrderButton.jsx";
import {motion} from "motion/react";
import IntroCardSection from "../components/HomePage/IntroCardSection.jsx";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ORDER_TYPE_EXPIRATION_TIME } from "../utils/cookieExpirationTime.js";

const HomePage = () => {

  const nav = useNavigate()
  const [goOrderButtonClicked, setGoOrderButtonClicked] = useState(false);
  const handleClickPickupButton = () => {
    Cookies.set("orderType", "PICKUP", { expires: ORDER_TYPE_EXPIRATION_TIME });
    nav("/menu");
  }
  const handleClickDeliveryButton = () => {
    Cookies.set("orderType", "DELIVERY", { expires: ORDER_TYPE_EXPIRATION_TIME });
    nav("/menu");
  }

  return (
    <>
      <div className="flex flex-col bg-gradient-to-r from-amber-500 to-orange-500">
        <ImageSlider/>
      </div>
      <motion.h1
        //   font-['Whatthefont'] mb-4
        className="flex justify-center text-7xl w-full text-transparent bg-clip-text bg-gradient-to-r from-[#FE7800] to-orange-500 p-[100px] font-['Whatthefont']">
        Welcome to Whattheburger
      </motion.h1>
      <HomePageSection
        flexDirection="column"
      >
        <motion.div
          className={`relative flex justify-center items-center h-50 gap-10 overflow-hidden transition-colors duration-500 ease-in-out ${goOrderButtonClicked ? "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500" : ""}`}
          onHoverEnd={() => setGoOrderButtonClicked(false)}
        >
          <GoOrderButton
            goOrderButtonClicked={goOrderButtonClicked}
            setGoOrderButtonClicked={setGoOrderButtonClicked}
          />
          <motion.div
            initial={{x: "100vw"}}
            animate={{x: goOrderButtonClicked ? 0 : "100vw"}}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            transition={{ type: "spring", ease: [0.25, 0.1, 0.25, 1], duration: 0.8}}
            className={`flex justify-center self-center h-auto w-40 shadow-lg items-center border-1 border-[#FE7800] rounded-[50px] bg-white font-['Whatthefont'] text-[#FE7800] p-[20px] text-[25px] min-w-[90px] cursor-pointer ${goOrderButtonClicked ? "" : "absolute"}`}
            onClick={() => handleClickPickupButton()}
          >
            Pick Up
          </motion.div>
          <motion.div
            initial={{x: "100vw"}}
            animate={{x: goOrderButtonClicked ? 0 : "100vw"}}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            transition={{ type: "spring", ease: [0.25, 0.1, 0.25, 1], duration: 0.8}}
            className={`flex justify-center self-center h-auto w-40 shadow-lg items-center border-1 border-[#FE7800] rounded-[50px] bg-white font-['Whatthefont'] text-[#FE7800] p-[20px] text-[25px] min-w-[90px] cursor-pointer ${goOrderButtonClicked ? "" : "absolute"}`}
            onClick={() => handleClickDeliveryButton()}
          >
            Delivery
          </motion.div>
        </motion.div>
      </HomePageSection>
      <HomePageSection
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        padding="40px 0"
      >
        <FeaturedCategory/>
        <div>
          next
        </div>
      </HomePageSection>
      <HomePageSection
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      >
        <IntroCardSection/>
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
            <div className="flex flex-col gap-3">
              <h1 className="text-[#FE7800]">We Take pride in our craft</h1>
              <div className="text-gray-700 text-lg">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis dolores modi minus aspernatur at, eius quidem reprehenderit earum aliquam? Impedit minus fuga inventore deserunt perspiciatis molestiae maiores expedita odit amet?</p>
                <br></br>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quod, accusamus, rem maiores quidem necessitatibus harum dolores possimus deleniti sapiente commodi pariatur beatae velit. Dicta fugit ratione aliquam mollitia nobis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolore dolorem nam eius magni odit cupiditate, aliquid magnam maxime at fuga quis omnis, officiis atque. Repellat libero esse laudantium a!</p>
              </div>
            </div>
            <button className="flex justify-center self-center h-auto shadow-lg items-center border-1 border-[#FE7800] rounded-[50px] bg-white text-[#FE7800] p-[15px] text-[15px] min-w-[90px] cursor-pointer">About our food</button>
          </div>
        </div>
      </HomePageSection>
    </>
  );
}

export default HomePage;