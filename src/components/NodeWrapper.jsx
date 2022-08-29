/* eslint-disable import/no-anonymous-default-export */
import { NodeViewWrapper } from '@tiptap/react';
import React,{useContext, useEffect, useState} from 'react';
import DropdownMenu from './DropdownMenu';
import { EditorContext } from '../contexts/EditorContext';
import dragIcon from '../assets/drag.svg';


export default (props) => {
  
  const editor = useContext(EditorContext);

  const [section,setSection] = useState(true);
  const [hover,setHover] = useState(false);

  useEffect(()=>{
    editor.commands.focus(props.getPos()+2);
  },[]);

  return (
    <>
      {section && <NodeViewWrapper
        className="draggable-item"
        onMouseOver={()=>setHover(true)}
        onMouseOut={()=>setHover(false)}
        >
          <div
            className="drag-handle"
            contentEditable="false"
            suppressContentEditableWarning="false"
            draggable="true"
            data-drag-handle
          >
            <img src={dragIcon} alt="drag" style={{display:!hover?"none":"flex"}} />
          </div>

          {props.children}
          
          <DropdownMenu
            className="dropdown"
            pos={props.getPos} 
            setSection={setSection} 
            hover={hover}
          />
        </NodeViewWrapper>
      }
    </>
  )
}