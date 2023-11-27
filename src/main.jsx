import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from '@radix-ui/themes';

import "./style.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme> 
      <App />
      </Theme>
  </React.StrictMode>
);
