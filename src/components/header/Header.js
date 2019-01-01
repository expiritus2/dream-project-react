import React from "react";
import { Logo, Navigation } from "./components";
// import { bool } from "prop-types";

const Header = ({ isLoggedIn }) => (
  <header className="main-header">
    <Logo />
    <Navigation isLoggedIn={isLoggedIn} />
  </header>
);

// Header.propTypes = {
//   isLoggedIn: bool,
// };

// Header.defaultProps = {
//   isLoggedIn: false,
// };

export default Header;
