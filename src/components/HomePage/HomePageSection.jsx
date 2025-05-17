import { motion } from "motion/react";

const HomePageSection = ({flexDirection, backgroundColor, padding, children}) => {
  return (
    <motion.div
      initial={{opacity: 0, y: 30}}
      whileInView={{opacity: 1, y: 0}}
      transition={{ duration: 1.5, ease: "easeInOut"}}
      className={"flex w-full"}
      style={{
        flexDirection,
        backgroundColor,
        padding
      }}
    >
      {children}
    </motion.div>
  );
}

export default HomePageSection;