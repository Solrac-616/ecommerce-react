import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/css/customheader.css";
import "./assets/css/burguernav.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
