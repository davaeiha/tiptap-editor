/* eslint-disable import/no-anonymous-default-export */
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import React,{useContext, useEffect, useState} from 'react';
import DropdownMenu from './DropdownMenu';
import { EditorContext } from '../contexts/EditorContext';


export default (props) => {
  
  const editor = useContext(EditorContext);

  const [section,setSection] = useState(true);

  useEffect(()=>{
    editor.commands.focus(props.getPos()+2)
  },[]);

  return (
    <>
      {section && <NodeViewWrapper className="draggable-item">
      <div
        className="drag-handle"
        contentEditable="false"
        draggable="true"
        data-drag-handle
      />
      <div className='content'>
        <NodeViewContent className="content"/>
      </div>
      <DropdownMenu pos={props.getPos} setSection={setSection}/>
      </NodeViewWrapper>}
    </>
  )
}