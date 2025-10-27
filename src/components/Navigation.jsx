import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navigation = () => {

  const MotionLink = motion(Link);
  return (
    <nav
      className="
        flex
        justify-center
        gap-[40px]
        flex-grow
        text-[#FE7800]
        font-['Whatthefont']
        text-[20px]
        basis-3/5

        max-md:flex-col
        max-md:self-start
        max-md:overflow-auto
        max-md:justify-start
        max-md:items-start
        max-md:gap-[30px]
        max-md:px-2
      ">

      

      <MotionLink whileHover={{scale: 1.1}} className="nav-menu" to="/menu" replace={true}>MENU</MotionLink>
      <MotionLink whileHover={{scale: 1.1}} href="#">REWARDS</MotionLink>
      <MotionLink whileHover={{scale: 1.1}} href="#">CAREERS</MotionLink>
      <MotionLink whileHover={{scale: 1.1}} href="#">WHATTHESTORE</MotionLink>
      <MotionLink whileHover={{scale: 1.1}} href="#">STORIES</MotionLink>
      <MotionLink whileHover={{scale: 1.1}} href="#">COMMUNITY</MotionLink>
      <MotionLink whileHover={{scale: 1.1}} href="#">GROCERY</MotionLink>
    </nav>
  );
}

export default Navigation;