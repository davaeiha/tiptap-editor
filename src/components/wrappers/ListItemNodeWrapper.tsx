/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from 'react';
import { NodeViewContent,NodeViewRendererProps } from '@tiptap/react';
import NodeWrapper from './NodeWrapper';


const ListItemNodeWrapper : React.FC<NodeViewRendererProps> = (props) => {
  
  useEffect(()=>{
    if (props.editor.storage.orderedListItem.createdId || props.editor.storage.bulletedListItem.createdId) {
      switch (props.node.type.name) {
        case 'orderedListItem':
          props.editor.storage.orderedListItem.createdId && props.updateAttributes({
            id:props.editor.storage.orderedListItem.createdId
          })
          // console.log(props)
          // const createdOrderedItem = props.editor!.options.editorProps.attributes!.bulkItemsInput.find((item)=>{
          //   return (item.action==='create' && item.id===props.editor.storage.orderedListItem.createdId);
          // })
          // createdOrderedItem.parentId = props.node.attrs.parent_id;
          // createdOrderedItem.order =props.node. && {
  
          // }
          // console.log(props)
          props.editor.storage.orderedListItem.createdId =null;
  
          break;
        case 'bulletedListItem':
          props.editor.storage.bulletedListItem.createdId && props.updateAttributes({
            id:props.editor.storage.bulletedListItem.createdId
          });
          console.log(props)
          // const createdBulletedItem = props.editor!.options.editorProps.attributes!.bulkItemsInput.find((item)=>{
          //   return (item.action==='create' && item.id===props.editor.storage.bulletedListItem.createdId);
          // })
          // createdBulletedItem.parentId =  props.node.attrs.parent_id;
          props.editor.storage.bulletedListItem.createdId=null;
          break;
      }
    }
  },[]);


  //handle oredered and bullet list in nested mood
  useEffect(()=>{
  
    if (props.node.childCount>1) {
      console.log("id:",props.node.attrs.id)
      props
      .node
      .content
      .content
      .filter((child)=>{
        return (child.type.name === 'bulletList'||child.type.name === 'orderedList')
      })
      .forEach((list)=>{
        list.forEach((listItem)=>{
          listItem.attrs.parent_item_id = props.node.attrs.id;
          console.log("parent_item_id:",listItem.attrs.parent_item_id )
        });
      })
    }
    
  },[props.node.childCount])

  return (
    <NodeWrapper {...props}>
      <div className='list-item' data-type="list-item" >
        <NodeViewContent className="content" />
      </div>
    </NodeWrapper> 
  )
}

export default ListItemNodeWrapper;