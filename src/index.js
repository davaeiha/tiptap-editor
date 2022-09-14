import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
//@ts-ignore
import { EditorProvider } from "./contexts/EditorContext.tsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EditorProvider>
      <App/>
    </EditorProvider>
  </React.StrictMode>
);
