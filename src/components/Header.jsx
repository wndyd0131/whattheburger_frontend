import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import AuthSection from "./AuthSection";
import "../styles/Header.css";

const Header = () => {
  return (
      <header className="header">
        <div className="logo-container">
          <img src="/Whataburger-logo.png"></img>
        </div>
        <div className="container">
          <div className="inner-container1">
            <SearchBar></SearchBar>
            <AuthSection></AuthSection>
          </div>
          <div className="inner-container2">
            <Navigation></Navigation>
          </div>
        </div>
      </header>
  );
}

export default Header;