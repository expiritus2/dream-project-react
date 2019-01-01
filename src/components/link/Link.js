import React from "react";
import { NavLink } from "react-router-dom";

const Link = ({ to, children, exact = false, activeClassName = "active" }) => {
  return (
    <div className="nav-link">
      <NavLink to={to} exact={exact} activeClassName={activeClassName}>
        {children}
      </NavLink>
    </div>
  );
};

export default Link;
