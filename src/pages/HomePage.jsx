import { useEffect } from "react";
import HomePageSection from "../components/HomePage/HomePageSection.jsx";
import MenuMarquee from "../components/HomePage/MenuMarquee.jsx";
import ImageSlider from "../components/ImageSlider";
import styles from "../styles/HomePage.module.css";
import { motion } from "framer-motion";
import axios from "axios";

const HomePage = () => {
  const featuredCategory = [
    {categoryId: 1, name: "All-Time Favorites", imgSrc: "public/private/category/all_time_favorites.png"},
    {categoryId: 2, name: "Burgers", imgSrc: "public/private/category/burgers.png"},
    {categoryId: 3, name: "Chicken", imgSrc: "public/private/category/chicken.png"},
    {categoryId: 4, name: "Sides", imgSrc: "public/private/category/sides.png"},
    {categoryId: 5, name: "Drinks", imgSrc: "public/private/category/drinks.png"},
    {categoryId: 6, name: "Group Order", imgSrc: "public/private/category/group_order.png"}
  ]

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
      <HomePageSection 
        flexDirection="column"
      >
        <div className={styles.orderButtonContainer}>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={styles.startOrderButton} src="#">Let's Go Order!</motion.a>
        </div>
        <MenuMarquee/>
      </HomePageSection>
      <HomePageSection
        flexDirection="column"
        padding="60px 0"
      >
        <h1 className="flex justify-center text-5xl text-[#FE7800] font-['Whatthefont']">MENU</h1>
        <div className="flex justify-around px-[80px] pt-[70px] h-full w-full ">
          {featuredCategory.map((category, idx) => {
            return (
              <div className="flex flex-col h-[300px] w-[250px] max-w-xs bg-white shadow-md rounded-2xl overflow-hidden">
                  <img className="w-full h-full object-cover" src={category.imgSrc} alt="Food" />
                  <div className="p-4">
                    <p className="text-lg justify-self-center font-semibold mb-2">{category.name}</p>
                  </div>
              </div>
            );
          })}
        </div>
      </HomePageSection>
    </>
  );
}

// <div className="flex flex-col h-[300px] w-[250px] max-w-xs shadow-lg bg-white rounded-2xl overflow-hidden">
//     <img className="w-full h-48 object-cover" src="/images/example.jpg" alt="Food" />
//     <div className="p-4">
//       <h3 className="text-lg font-semibold mb-2">Delicious Burger</h3>
//     </div>
// </div>

export default HomePage;