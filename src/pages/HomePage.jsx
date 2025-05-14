import HomePageSection from "../components/HomePage/HomePageSection.jsx";
import MenuList from "../components/HomePage/MenuList";
import ImageSlider from "../components/ImageSlider";
import styles from "../styles/HomePage.module.css";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <>
      <HomePageSection
      flexDirection="flex-col"
      backgroundColor="bg-orange-100"
      >
        <ImageSlider/>
      </HomePageSection>
      <HomePageSection 
        flexDirection="flex-col"
      >
        <div className={styles.orderButtonContainer}>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={styles.startOrderButton} src="#">Let's Go Order!</motion.a>
        </div>
        <MenuList/>
      </HomePageSection>
    </>
  );
}

export default HomePage;