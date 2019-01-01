import React from "react";
import { node } from "prop-types";
import classNames from "classnames";

const ContentWrapper = ({ children }) => (
  <main className={classNames("content-wrapper")}>{children}</main>
);

ContentWrapper.propTypes = {
  children: node.isRequired,
};

export default ContentWrapper;
