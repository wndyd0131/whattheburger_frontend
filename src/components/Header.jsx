import Navigation from "./Navigation";
import AuthSection from "./AuthSection";

const Header = () => {
  return (
      <header className="flex sticky bg-white flex-row items-center top-0 h-[60px] shadow-[0_4px_3px_-5px_rgba(0,0,0,0.5)] z-50">
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