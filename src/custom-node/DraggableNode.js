import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import DivNodeWrapper from "../components/wrappers/DragNodeWrapper.tsx";

export default Node.create({
  name: "DraggableItem",

  group: "block list heading",

  content: "(paragraph|heading|list?)+",

  draggable: true,

  addKeyboardShortcuts() {
    return {
      Tab: () => {
        this.editor.commands.selectTextblockStart();
        this.editor.commands.joinBackward();
        return this.editor.commands.wrapIn("DraggableItem");
      },
      Enter: () => {
        if (
          !this.editor.isActive("bulletList") &&
          !this.editor.isActive("orderedList")
        ) {
          this.editor.commands.splitBlock();
          this.editor.commands.liftEmptyBlock();
          return this.editor.commands.insertContent(
            `<DraggableItem><p data-type="paragraph"></p></DraggableItem>`
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
        tag: "DraggableItem",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "draggable-item",
        draggable: "true",
      }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DivNodeWrapper);
  },
});
