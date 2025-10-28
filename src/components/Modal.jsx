import { AnimatePresence, motion } from "framer-motion";
const Modal = ({height, width, flexDirection, position, justifyContent, alignItems, children}) => {
  return (
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{ duration: 0.3 }}
        className="flex fixed justify-center items-center w-full h-full top-0 left-0 bg-black/60 backdrop-blur-sm z-50"
      >
        <motion.div 
          initial={{y: 100, opacity: 0, scale: 0.9}}
          animate={{y: 0, opacity: 1, scale: 1}}
          exit={{y: 100, opacity: 0, scale: 0.9}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex relative w-full h-full max-w-[90%] max-h-[90%] rounded-3xl bg-white overflow-hidden shadow-2xl border border-gray-100"
          style={{height, width, flexDirection, position, justifyContent, alignItems}}
        >
          {children}
        </motion.div>
      </motion.div>
  );
}

export default Modal;