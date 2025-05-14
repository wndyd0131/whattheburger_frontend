import { motion } from "framer-motion";

const Modal = ({height, width, flexDirection, position, children}) => {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="flex fixed justify-center items-center w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10">
      <motion.div 
        initial={{y: 250}}
        animate={{y: 0}}
        className="flex relative w-full h-full max-w-[90%] max-h-[80%] rounded-2xl bg-white overflow-auto"
        style={{height, width, flexDirection, position}}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Modal;