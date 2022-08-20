import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import NodeWrapper from "./NodeWrapper";

export default Node.create({
  name: "draggableItem",

  group: "block list heading",

  content: "(paragraph|heading|list?)+",

  draggable: true,

  addKeyboardShortcuts() {
    return {
      Tab: () => {
        this.editor.commands.selectTextblockStart();
        this.editor.commands.joinBackward();
        return this.editor.commands.wrapIn("draggableItem");
      },
      Enter: () => {
        if (
          !this.editor.isActive("bulletList") &&
          !this.editor.isActive("orderedList")
        ) {
          this.editor.commands.splitBlock();
          this.editor.commands.liftEmptyBlock();
          return this.editor.commands.insertContent(
            "<div data-type='draggable-item'><p></p></div>"
          );
        }
      },
    };
  },

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
    return ReactNodeViewRenderer(NodeWrapper);
  },
});
