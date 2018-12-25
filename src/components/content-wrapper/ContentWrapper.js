import React from "react";
import { node } from "prop-types";
import classNames from "classnames";

const ContentWrapper = ({ children }) => (
  <div className={classNames("content-wrapper")}>{children}</div>
);

ContentWrapper.propTypes = {
  children: node.isRequired,
};

export default ContentWrapper;
