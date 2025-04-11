import Navigation from "./Navigation";
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
            <AuthSection></AuthSection>
          </div>
      </header>
  );
}

export default Header;