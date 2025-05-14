import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="footer h-[400px]">
      <h1>Footer</h1>
    </motion.div>
  );
}

export default Footer;