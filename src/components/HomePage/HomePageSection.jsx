
const HomePageSection = ({flexDirection, height, justifyContent, alignItems, backgroundColor, padding, children}) => {
  return (
    <motion.div
      initial={{opacity: 0, y: 30}}
      whileInView={{opacity: 1, y: 0}}
      transition={{ duration: 1.5, ease: "easeInOut"}}
      className={"flex w-full"}
      style={{
        flexDirection,
        backgroundColor,
        justifyContent,
        alignItems,
        padding,
        height
      }}
    >
      {children}
    </motion.div>
  );
}

export default HomePageSection;