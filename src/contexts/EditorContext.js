import React from "react";
import { ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import { mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import DraggableNode from "../custom-node/DraggableNode.js";
import ArticleNode from "../custom-node/ArticleNode.js";
import Focus from "@tiptap/extension-focus";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import UniqueID from "@tiptap/extension-unique-id";
import ListItemNodeWrapper from "../components/wrappers/ListItemNodeWrapper";

export const EditorContext = React.createContext();

export const EditorProvider = ({ children }) => {
  const wrappedListItem = ListItem.extend({
    name: "listItem",
    draggable: true,
    parseHTML() {
      return [
        {
          tag: `div[data-type="list-item"]`,
        },
      ];
    },
    addNodeView() {
      return ReactNodeViewRenderer(ListItemNodeWrapper);
    },
  });

  const divOrderedtList = OrderedList.configure({
    itemTypeName: "listItem",
  }).extend({
    whitespace: "normal",
    renderHTML({ HTMLAttributes }) {
      return [
        "div",
        mergeAttributes(HTMLAttributes, {
          "data-type": "ordered-list",
          class: "ordered-list",
        }),
        0,
      ];
    },
  });

  const divBulletList = BulletList.configure({
    itemTypeName: "listItem",
  }).extend({
    whitespace: "normal",
    renderHTML({ HTMLAttributes }) {
      return [
        "div",
        mergeAttributes(HTMLAttributes, {
          "data-type": "bullet-list",
          class: "bullet-list",
        }),
        0,
      ];
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        listItem: false,
        bulletList: false,
        orderedList: false,
      }),
      UniqueID.configure({
        types: ["heading", "paragraph", "listItem"],
      }),
      DraggableNode,
      ArticleNode,
      Focus.configure({
        mode: "all",
      }),
      wrappedListItem,
      divBulletList,
      divOrderedtList,
    ],
    injectCSS: true,
    autofocus: true,
    // content: `<ArticleItem><div data-type='draggable-item'><p></p></div></ArticleItem>`,
    content: `<div data-type='draggable-item'><p></p></div>`,
  });

  return (
    <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
  );
};
