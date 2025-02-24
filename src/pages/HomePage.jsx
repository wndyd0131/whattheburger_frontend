import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import "../styles/HomePage.styles.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <Header></Header>
      <Main></Main>
      <h1 className="whata-title">Whataburger</h1>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;