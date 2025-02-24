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
        <div className="misc-container">
          <div className="inner-container1">
            <SearchBar></SearchBar>
            <AuthSection></AuthSection>
          </div>
        </div>
        <Navigation></Navigation>
      </header>
  );
}

export default Header;