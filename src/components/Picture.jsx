import React, { Fragment } from "react";

const Picture = ({ image }) => {
  return (
    <Fragment>
      <div className="photo-container">
        <img src={image} alt="Dynamic photo" className="centered-photo" />
      </div>
    </Fragment>
  );
};

export default Picture;
