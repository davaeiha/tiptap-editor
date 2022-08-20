import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { EditorProvider } from "./contexts/EditorContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EditorProvider>
      <App />
    </EditorProvider>
  </React.StrictMode>
);
