import {motion} from "motion/react";

const GoOrderButton = ({goOrderButtonHovered, setGoOrderButtonHovered}) => {
  return (
    <motion.div
      className={`flex justify-center self-center items-center border-1 border-[#FE7800] rounded-[50px] bg-white font-['Whatthefont'] text-[#FE7800] p-[20px] text-[25px] min-w-[90px] cursor-pointer ${goOrderButtonHovered ? "absolute" : ""}`}
      onHoverStart={() => setGoOrderButtonHovered(true)}
      animate={{x: goOrderButtonHovered ? '100vw' : 0}}
      transition={{ type: "spring", ease: [0.25, 0.1, 0.25, 1], duration: 0.8}}
    >
        Let's Go Order!
    </motion.div>
  );
}

export default GoOrderButton;