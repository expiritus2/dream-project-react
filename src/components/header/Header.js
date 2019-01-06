import React from "react";
import { Logo, Navigation } from "./components";
import { bool } from "prop-types";
import Locale from "./components/locale";

const Header = ({ isLoggedIn }) => (
  <header className="main-header">
    <Logo />
    <div className="main-header__nav-wrapper">
      <Navigation isLoggedIn={isLoggedIn} />
      <Locale />
    </div>
  </header>
);

Header.propTypes = {
  isLoggedIn: bool,
};

Header.defaultProps = {
  isLoggedIn: false,
};

export default Header;
