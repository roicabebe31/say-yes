import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "../src/assets/css/app.css";
import "../src/assets/css/button.css";
import "../src/assets/css/font.css";
import "../src/assets/css/picture.css";
import "../src/assets/css/random-pop-up.css";
import "../src/assets/css/button.css";
import "../src/assets/css/say-yes.css";

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
