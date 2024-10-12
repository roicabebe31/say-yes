import React, { Fragment } from "react";

const Button = ({ text, className, onClick, style }) => {
  return (
    <Fragment>
      <div className="button-container">
        <button
          className={`custom-button ${className}`}
          onClick={onClick}
          style={style}
        >
          {text}
        </button>
      </div>
    </Fragment>
  );
};

export default Button;
