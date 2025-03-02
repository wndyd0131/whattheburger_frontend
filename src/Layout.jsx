import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/Common.styles.css"

const Layout = ({ children }) => { {/* nested components */}
  return (
    <>
      <Header></Header>
      <main>{children}</main> {/* inserting nested components as dynamic content */}
      <Footer></Footer>
    </>
  );
}

export default Layout;