import { motion } from "framer-motion";

const Navigation = () => {
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