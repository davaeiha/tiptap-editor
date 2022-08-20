import React from "react";
import { ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Node from "../components/Extension.js";
import Focus from "@tiptap/extension-focus";
import ListItem from "@tiptap/extension-list-item";
import ListItemNodeWrapper from "../components/ListItemNodeWrapper";

export const EditorContext = React.createContext();

export const EditorProvider = ({ children }) => {
  const customListItem = ListItem.extend({
    addNodeView() {
      return ReactNodeViewRenderer(ListItemNodeWrapper);
    },
    draggable: true,
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        listItem: false,
      }),
      Node,
      Focus.configure({
        mode: "all",
      }),
      customListItem,
    ],
    autofocus: true,
    content: `<div data-type='draggable-item'><p></p></div>`,
  });
  return (
    <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
  );
};
