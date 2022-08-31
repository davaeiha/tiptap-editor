import React from "react";
import { ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Node from "../custom-node/DraggableNode.js";
import Focus from "@tiptap/extension-focus";
import ListItem from "@tiptap/extension-list-item";
import UniqueID from "@tiptap/extension-unique-id";
import ListItemNodeWrapper from "../components/wrappers/ListItemNodeWrapper";

export const EditorContext = React.createContext();

export const EditorProvider = ({ children }) => {
  const wrappedListItem = ListItem.extend({
    name: "listItem",
    draggable: true,
    // parseHTML() {
    //   return [
    //     {
    //       tag: `div[data-type="list-item"]`,
    //     },
    //     {
    //       tag: "listItem",
    //     },
    //   ];
    // },
    addNodeView() {
      return ReactNodeViewRenderer(ListItemNodeWrapper);
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        listItem: false,
      }),
      UniqueID.configure({
        types: ["heading", "paragraph", "listItem"],
      }),
      Node,
      Focus.configure({
        mode: "all",
      }),
      wrappedListItem,
    ],
    injectCSS: true,
    autofocus: true,
    content: `<div data-type='draggable-item'><p></p></div>`,
  });

  return (
    <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
  );
};
