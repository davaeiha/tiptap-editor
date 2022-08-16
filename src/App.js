import React from "react";
import Editor from "./components/Editor";
// import Menu from "./components/Menu.tsx";
// import { MoreVertSVGIcon } from "@react-md/material-icons";
// import { Configuration } from "@react-md/layout";

function App() {
  return (
    <>
      <Editor />
      {/* <Configuration>
        <Menu
          // id={`fab-menu-${position}`}
          // key={position}
          aria-label="Options..."
          // floating={position}
          buttonChildren={<MoreVertSVGIcon />}
          fixedPositionOptions={{
            disableSwapping: true,
          }}
        />
      </Configuration> */}
    </>
  );
}

export default App;
