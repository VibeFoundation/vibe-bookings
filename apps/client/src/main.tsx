import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

console.log(process.env);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
