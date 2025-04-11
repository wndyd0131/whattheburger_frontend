import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import AuthSection from "./AuthSection";

const Header = () => {
  return (
      <header className="header">
          <div className="logo-container">
            <a href="/">
              <img src="private/whata-logo.svg"/>
              <h1>Whataburger</h1>
            </a>
          </div>
          <Navigation></Navigation>
          <div className="misc-container">
              <SearchBar></SearchBar>
              <AuthSection></AuthSection>
          </div>
      </header>
  );
}

export default Header;