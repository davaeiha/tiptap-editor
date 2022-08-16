import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import Component from "./NodeWrapper";

export default Node.create({
  name: "draggableItem",

  group: "block list",

  content: "(paragraph|heading|list?)+",

  draggable: true,
   

  parseHTML() {
    return [
      {
        tag: 'div[data-type="draggable-item"]',
      },
      {
        tag: "draggableItem",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "draggable-item" }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
