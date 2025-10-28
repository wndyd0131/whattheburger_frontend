import { useState } from "react";

const GoOrderButton = ({goOrderButtonClicked, setGoOrderButtonClicked}) => {
  const [backgroundColor, setBackgroundColor] = useState("bg-gradient-to-r from-amber-500 to-orange-500");
  return (
    <motion.div
      className={`flex justify-center items-center px-10 py-7 text-2xl ${backgroundColor} text-white font-bold rounded-2xl shadow-lg hover:shadow-xl font-['Whatthefont'] text-md cursor-pointer ${goOrderButtonClicked ? "absolute" : ""}`}
      onHoverStart={() => setBackgroundColor("bg-gradient-to-r from-amber-500 via-orange-500 to-red-500")}
      onHoverEnd={() => setBackgroundColor("bg-gradient-to-r from-amber-500 to-orange-500")}
      onClick={() => setGoOrderButtonClicked(true)}
      animate={{x: goOrderButtonClicked ? '-100vw' : 0}}
      transition={{ type: "spring", ease: [0.25, 0.1, 0.25, 1], duration: 0.8}}
    >
        Let's Go Order!
    </motion.div>
  );
}

export default GoOrderButton;