import React, { useEffect, useState } from 'react';
import {Editor as EditorType, NodeViewRendererProps, NodeViewWrapper,NodeViewContent } from '@tiptap/react';

const BulletListNodeWrapper = (props:NodeViewRendererProps) => {
  
  useEffect(()=>{
    if (props.node.childCount>1) {

    const children = props.node.content.content;
      
    const createdListItem = props
      .editor!
      .options
      .editorProps
      .attributes!
      .bulkItemsInput.find((item)=>
        (item.action === 'create' && item.id === props.editor.storage.bulletedListItem.createdId)
      );

      const newListItemIndex = children.findIndex((node)=> 
        (node.attrs.id === props.editor.storage.bulletedListItem.createdId)
      );

      // children.forEach((node)=>console.log(node.attrs.id))
      
      // console.log(newListItemIndex,props.editor.storage.bulletedListItem.createdId);
    if (newListItemIndex !== -1 && createdListItem) {
      if (newListItemIndex===0) {
        createdListItem.order = {
          before:children[1].attrs.id
        }
      }else if (newListItemIndex===children.length) {
        createdListItem.order = {
          after:children[children.length-1].attrs.id
        }
      }else{
        createdListItem.order = {
          after:children[newListItemIndex-1].attrs.id,
          before:children[newListItemIndex+1].attrs.id
        }
      }
    }
    // console.log(createdListItem,newListItemIndex);
      props
      .node
      .content
      .content
      .filter((childNode)=>childNode.attrs.parent_item_id !== props.node.firstChild?.attrs.parent_item_id)
      .forEach((childNode)=>{
        childNode.attrs.parent_id = props.node.firstChild?.attrs.parent_id;
        childNode.attrs.parent_item_id = props.node.firstChild?.attrs.parent_item_id;
      })
    }
  },[props.node.childCount]);
  
  return (
    <NodeViewWrapper className="bullet-list">
      <NodeViewContent className="content"/>
    </NodeViewWrapper>
  )
}



export default BulletListNodeWrapper