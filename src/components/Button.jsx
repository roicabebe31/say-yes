import React, { Fragment } from "react";

const Button = ({ text, className, onClick, style }) => {
  return (
    <Fragment>
      <div className="button-container">
        <button
          className={`custom-button ${className}`}
          onClick={onClick} // Handle button clicks
          style={style} // Dynamically apply styles, like scaling
        >
          {text}
        </button>
      </div>
    </Fragment>
  );
};

export default Button;
