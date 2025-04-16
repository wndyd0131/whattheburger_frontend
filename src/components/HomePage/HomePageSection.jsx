import styles from "/src/styles/HomePage.module.css";

const HomePageSection = ({flexDirection, backgroundColor, children}) => {
  return (
    <div
      className={`flex ${flexDirection} w-full ${backgroundColor}`}
    >
      {children}
    </div>
  );
}

export default HomePageSection;