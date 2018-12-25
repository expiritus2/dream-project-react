import React from "react";
import { number } from "prop-types";

const Spinner = ({ size, count }) => (
  <div className="spinner">
    <div className="spinner__content" style={{ "--spinner-size": size }}>
      {Array.from({ length: count }).map((item, index) => (
        <div
          className="spinner__item"
          key={index} // eslint-disable-line
          style={{ "--delay-item": index }}
        />
      ))}
    </div>
  </div>
);

Spinner.propTypes = {
  size: number,
  count: number,
};

Spinner.defaultProps = {
  size: 10,
  count: 5,
};

export default Spinner;
