import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/Common.styles.css"
import { motion } from "motion/react";
import { ChatbotIcon } from "./svg/Utils";

const Layout = ({ children }) => { {/* nested components */}
  return (
    <>
      <Header></Header>
      <main>{children}</main> {/* inserting nested components as dynamic content */}
      <Footer></Footer>
      <motion.div
        className="flex justify-center items-center fixed bottom-15 right-10 h-[70px] w-[70px] shadow-md cursor-pointer rounded-full bg-gray-100 z-50"
        whileHover={{scale: 1.1}}
      >
        <ChatbotIcon/>
      </motion.div>
    </>
  );
}

export default Layout;