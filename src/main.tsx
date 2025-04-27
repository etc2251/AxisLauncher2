import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app/app";
import "./styles/app.css";

document.addEventListener("contextmenu", (event) => event.preventDefault());

document.addEventListener('keydown', (event) => {
  if (
    event.key === "F5" ||
    (event.ctrlKey && event.key === "u") ||
    (event.ctrlKey && event.key === "f") ||
    (event.ctrlKey && event.key === "p") ||
    (event.ctrlKey && event.shiftKey && event.key === "c") ||
    (event.metaKey && ["f", "p", "u"].includes(event.key)) 
  ) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("input, textarea").forEach(element => {
    element.setAttribute("autocomplete", "off");
  });
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);