import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="text-white bg-gray-800 h-[500px]">
    </motion.div>
  );
}

export default Footer;