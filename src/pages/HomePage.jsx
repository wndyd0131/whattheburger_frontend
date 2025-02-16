import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;