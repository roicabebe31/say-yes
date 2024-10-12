import React, { Fragment } from "react";
// import catLoading from "../assets/gif/cat-loading.webp";
import catLoading from "../assets/gif/cat.gif";

const LoadingScreen = () => {
  return (
    <Fragment>
      <div className="loading-screen">
        <img src={catLoading} alt="Loading Screen" />
      </div>
    </Fragment>
  );
};

export default LoadingScreen;
