import React from "react";
import { useTranslate } from "hooks";
import { Link } from "components";

const Navigation = () => {
  const [translate] = useTranslate();

  return (
    <div className="main-navigation">
      <Link to="/personal-area">
        {translate("header.navigation.personalArea")}
      </Link>
    </div>
  );
};

export default Navigation;
