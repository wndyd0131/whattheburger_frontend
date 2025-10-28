import { motion } from "framer-motion";
const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="flex text-white bg-gray-500 h-[300px] bottom-0">
    </motion.footer>
  );
}

export default Footer;