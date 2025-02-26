import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import AuthSection from "./AuthSection";

const Header = () => {
  return (
      <header className="header">
          <div className="logo-container">
            <img src="/icons/whata-logo.svg"></img>
            <h1>Whataburger</h1>
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