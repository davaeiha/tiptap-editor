import React, { useContext } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Node from "../components/Extension.js";

export const EditorContext = React.createContext();

export const EditorProvider = ({ children }) => {
  const editor = useEditor({
    extensions: [StarterKit, Node],
    content: `
        <p>This is a boring paragraph.</p>
        <div data-type="draggable-item">
          <p>Followed by a fancy draggable item.</p>
        </div>
        <div data-type="draggable-item">
          <p>And another draggable item.</p>
          <div data-type="draggable-item">
            <p>And a nested one.</p>
            <div data-type="draggable-item">
              <p>But can we go deeper?</p>
            </div>
          </div>
        </div>
        <p>Let’s finish with a boring paragraph.</p>   
        <draggableItem toggleDropDown={toggleDropDown}><p></p></draggableItem>
        `,
  });
  return <EditorContext.Provider value={ editor }>{children}</EditorContext.Provider>;
};
