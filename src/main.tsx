import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

localStorage.openpages = Date.now();
var onLocalStorageEvent = function (e: StorageEvent) {
  if (e.key == "openpages") {
    localStorage.page_available = Date.now();
  }
  if (e.key == "page_available") {
    alert("One more page already open");
  }
};
window.addEventListener('storage', onLocalStorageEvent, false);
