import HomePageSection from "../components/HomePage/HomePageSection.jsx";
import MenuList from "../components/HomePage/MenuList";
import ImageSlider from "../components/ImageSlider";
import styles from "../styles/HomePage.module.css";

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
              <a className={styles.startOrderButton} src="#">Let's Go Order!</a>
        </div>
        <MenuList/>
      </HomePageSection>
    </>
  );
}

export default HomePage;