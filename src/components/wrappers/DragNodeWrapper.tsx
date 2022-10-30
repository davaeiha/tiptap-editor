/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useMemo, useState } from "react";
import { NodeViewContent,NodeViewRendererProps } from '@tiptap/react';
import NodeWrapper from './NodeWrapper';


const DragNodeWrapper : React.FC<NodeViewRendererProps> = (props) => { 

  // handle first item of a bulletList or orderedList in flat mood
  if (props.node.content.content[0].type.name === 'bulletList'|| props.node.content.content[0].type.name === 'orderedList') {
    props.node.content.content[0].firstChild.attrs.id =  props.node.attrs.id;
    props.node.content.content[0].firstChild.attrs.parent_id = props.node.attrs.parent_id;
    props.node.content.content[0].firstChild.attrs.parent_item_id = props.node.attrs.parent_item_id;
    
    props.editor!.options.editorProps.attributes!.bulkItemsInput.push({
      action:'update',
      id:props.node.attrs.id ,
      parentId:props.node.attrs.parent_id,
      parent_item_id:props.node.attrs.parent_item_id,
      raw_value:props.node.content.content[0].firstChild.textContent,
      value:props.node.content.content[0].firstChild.textContent,
      type2:props.node.content.content[0].type.name === 'bulletList' ? 'bulleted_item': 'numbered_item',
    })
    // console.log('fucking lists')
  }

 
  //handle paragraph and header(in draggable item) in nested mood 
  useEffect(()=>{
    if (props.node.childCount>1) {
      
      const createdItem = props.editor!.options.editorProps.attributes!.bulkItemsInput.find((item)=>{
            return (item.action==='create' && item.id===props.editor.storage.DraggableItem.createdId);
        })

      const children = props.node.content.content;

      const newDraggableItemIndex =createdItem && children.findIndex((node)=>{
        return (node.attrs.parent_item_id === null && node.type.name === 'DraggableItem')
      })

      if (newDraggableItemIndex >= 0 ) {
        createdItem.parentId = props.node.attrs.parent_id;
        createdItem.order = {after:children[newDraggableItemIndex-1].attrs.id};
        createdItem.parent_item_id = props.node.attrs.id;

        children[newDraggableItemIndex].attrs.parent_id = props.node.attrs.parent_id;
        children[newDraggableItemIndex].attrs.parent_item_id = props.node.attrs.id;
        children[newDraggableItemIndex].attrs.id = props.editor.storage.DraggableItem.createdId;

        props.editor!.options.editorProps.attributes!.bulkItemsInput.push({
          action:'update',
          id:children[newDraggableItemIndex].attrs.id ,
          parentId:children[newDraggableItemIndex].attrs.parent_id,
          parent_item_id:children[newDraggableItemIndex].attrs.parent_item_id,
          raw_value:"",
          value:"",
          type2:'paragraph_item',
        })
      }

    }
    // return ()=>console.log('hello world')
  },[props.node.childCount])

  //updating header and paragraph text content
  useEffect(()=>{
    // console.log(props.node.textContent);
    if (props.node.firstChild?.textContent) {
      const timeOut = setTimeout(() => {
        let type2;
        switch (props.node.firstChild?.type.name) {
          case 'paragraph':
            type2 = 'paragraph_item';
            break;
          case 'heading':
            break;
        }
       
        props.editor?.options.editorProps.attributes!.bulkItemsInput.push({
          action:'update',
          id:props.node.attrs.id,
          parentId:props.node.attrs.parent_id,
          parent_item_id:props.node.attrs.parent_item_id,
          parent_field_id:null,
          raw_value:props.node.firstChild?.textContent,
          value:props.node.firstChild?.textContent,
          type2,
        });
        
      },2000);

      return ()=>clearTimeout(timeOut);
      
    } else {
        return ()=>{
          props.editor.options.editorProps.attributes!.bulkItemsInput.push({
            action:'delete',
            id:props.node.attrs.id,
          })
        }
    }
  },[props.node.firstChild?.textContent]);
 
  return (
      <NodeWrapper {...props}>
           <NodeViewContent className="content"/>
      </NodeWrapper>
  )
}

export default DragNodeWrapper;