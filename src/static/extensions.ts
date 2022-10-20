import {  mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import DraggableNode from "../custom-node/DraggableNode.js";
import ArticleNode from "../custom-node/ArticleNode.js";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
// @ts-ignore 
import ListItemNodeWrapper from "../components/wrappers/ListItemNodeWrapper.tsx";

const orderedListItem = ListItem.extend({
    name: "orderedListItem",
    defining: true,
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

  const bulletedListItem = ListItem.extend({
    name: "bulletedListItem",
    draggable: true,
    defining: true,
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
    itemTypeName: "orderedListItem",
  }).extend({
    whitespace: "normal",
    content: 'orderedListItem+',
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
    itemTypeName: "bulletedListItem",
  }).extend({
    whitespace: "normal",
    content: 'bulletedListItem+',
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


const extensions = [
    Document,
    Text,
    Paragraph,
    Heading,
    DraggableNode,
    ArticleNode,
    bulletedListItem,
    orderedListItem,
    divBulletList,
    divOrderedtList,
]

export default extensions;