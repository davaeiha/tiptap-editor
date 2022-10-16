import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ArticleNodeWrapper from "../components/wrappers/ArticleNodeWrapper.tsx";

export default Node.create({
  name: "ArticleItem",

  group: "block list heading",

  content: "(paragraph|heading|list?)+",

  draggable: true,


  addAttributes() {
    return {
      versions: {
        default:[
          {
              name: 'version 1 name',
              value:'version 1 text'
          },
          {
              name: 'version 2 name',
              value:'version 2 text'
          },
          {
              name: 'version 3 name',
              value:'version 3 text'
          }
        ],
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="article-item"]',
      },
      {
        tag: "ArticleItem",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "article-item",
        draggable: "true",
      }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ArticleNodeWrapper);
  },

  addStorage(){
    return {
      awesomeness: 100,
    }
  }
});
