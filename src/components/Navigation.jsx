import { motion } from "framer-motion";

const Navigation = () => {
  return (
    <nav
      className="flex justify-center max-2xl:hidden gap-[40px] flex-grow text-[#FE7800] font-['Whatthefont'] text-[20px]">
      <motion.a whileHover={{scale: 1.1}} className="nav-menu" href="/menu">MENU</motion.a>
      <motion.a whileHover={{scale: 1.1}} href="#">REWARDS</motion.a>
      <motion.a whileHover={{scale: 1.1}} href="#">CAREERS</motion.a>
      <motion.a whileHover={{scale: 1.1}} href="#">WHATTHESTORE</motion.a>
      <motion.a whileHover={{scale: 1.1}} href="#">STORIES</motion.a>
      <motion.a whileHover={{scale: 1.1}} href="#">COMMUNITY</motion.a>
      <motion.a whileHover={{scale: 1.1}} href="#">GROCERY</motion.a>
    </nav>
  );
}

export default Navigation;