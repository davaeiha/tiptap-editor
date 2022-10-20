import React from "react";
import { Editor, useEditor } from "@tiptap/react";
import { EditorOptions  } from "@tiptap/core";

// @ts-ignore 
import ListItemNodeWrapper from "../components/wrappers/ListItemNodeWrapper.tsx";
import extensions from '../static/extensions';

interface editorProps {
  children: React.ReactNode;
}

export const EditorContext = React.createContext<Editor | null>(null);

export const EditorProvider : React.FC<editorProps> = ({ children }) => {
 

  const editor : Editor | null  = useEditor({
    extensions:extensions,
    injectCSS: true,
  } as EditorOptions);

  return (
    <EditorContext.Provider value={editor} > {children} </EditorContext.Provider>
  );
}
