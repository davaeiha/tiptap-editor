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
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore 
import BulletListNodeWrapper from "../components/wrappers/BulletListNodeWrapper.tsx";
// @ts-ignore 
import OrderedListNodeWrapper from "../components/wrappers/OrderedListNodeWrapper.tsx";

const orderedListItem = ListItem.extend({
    name: "orderedListItem",
    addKeyboardShortcuts() {
      return {
        ...this.parent?.(),
        'Enter':()=>{
          this.storage.createdId = uuidv4();
          this.editor.options.editorProps.attributes!.bulkItemsInput.push({
            action:'create',
            id:this.storage.createdId,
            parentId:null,
            parent_item_id:null,
            value:'',
            raw_value:'', 
            type2:'numbered_item'
          })
          return this.editor.commands.splitListItem('orderedListItem');
        },
      }
    },
    addAttributes() {
      return {
        id: {
          default:null,
        },
        parent_id:{
          default:null
        },
        parent_item_id:{
          default:null
        }
      }
    },
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
    addStorage(){
      return {
        createdId:null
      }
    }
});

const bulletedListItem = ListItem.extend({
  name: "bulletedListItem",
  draggable: true,
  defining: true,
  priority:1000,
  addKeyboardShortcuts() {
    return {
      ...this.parent?.(),
      'Enter':()=>{
        this.storage.createdId = uuidv4();
        this.editor.options.editorProps.attributes!.bulkItemsInput.push({
          action:'create',
          id:this.storage.createdId,
          parentId:null,
          parent_item_id:null,
          value:'',
          raw_value:'', 
          type2:'bulleted_item'
        })
        return this.editor.commands.splitListItem('bulletedListItem');
        // return this.parent?.().Enter
      },
      // 'Tab':()=>{
      //   console.log(this.parent?.().Tab)
      //   // return this.editor.commands.sinkListItem();
      // }
    }
  },
 
  addAttributes() {
    return {
      id: {
        default:null,
      },
      parent_id:{
        default:null
      },
      parent_item_id:{
        default:null
      }
    }
  },
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
  addStorage(){
    return {
      createdId:null
    }
  }
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
    addNodeView(){
      return ReactNodeViewRenderer(OrderedListNodeWrapper)
    },
    addStorage() {
      return {
        createdId: null,
      }
    },
});

const divBulletList = BulletList.configure({
    itemTypeName: "bulletedListItem",
  }).extend({
    whitespace: "normal",
    priority:100,
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
    // addKeyboardShortcuts() {
    //   // console.log(this.parent?.());
    //   return {
    //     ...this.parent?.(),
    //     'Enter':()=>{
    //       return this.storage.createdListItemId=uuidv4();
    //     }
    //   }
    // },
    addNodeView(){
      return ReactNodeViewRenderer(BulletListNodeWrapper)
    },
    addStorage() {
      return {
        createdId: null,
        // createdListItemId:null
      }
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