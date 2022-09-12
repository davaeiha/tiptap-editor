/* eslint-disable import/no-anonymous-default-export */
import { NodeViewWrapper } from '@tiptap/react';
import React,{useContext, useEffect, useState} from 'react';
import DropdownMenu from '../menu/DropdownMenu';
import { EditorContext } from '../../contexts/EditorContext';

import PlusHandler from '../handlers/PlusHandler';
import DragHandler from '../handlers/DragHandler';
import { useCallback } from 'react';

export default (props) => {
  
  const editor = useContext(EditorContext);

  const [section,setSection] = useState(true);
  
  const [hover,setHover] = useState(false);

  useEffect(()=>{
    editor.commands.focus(props.getPos()+2);
  },[]);
  
  const firstChild = props.node?.firstChild?.type?.name;

  
  return (
    <>
      {section && <NodeViewWrapper
        className="draggable-item"
        data-type="draggable-item"
        onMouseOver={()=>setHover(true)}
        onMouseOut={()=>setHover(false)}
        >
          {
            (firstChild === 'bulletList'||firstChild === 'orderedList') || 
            <div className='handle-container'>
              <DragHandler hover={hover}/>
            {
              props.node.content.content.length > 1 && <>
                <div
                  className='vertical-line' 
                  style={{display:!hover?"none":"flex"}} 
                  contentEditable="false"
                  suppressContentEditableWarning="false"
                /> 
                <PlusHandler hover={hover} 
                getPos={props.getPos} nodeSize={props.node.nodeSize}
                />
              </>
            }
            </div>
          }
          

          {props.children}
          {
            (firstChild === 'bulletList'||firstChild === 'orderedList') ||
            <DropdownMenu
              className="dropdown"
              pos={props.getPos} 
              setSection={setSection} 
              hover={hover}
            />
          }
        </NodeViewWrapper>
      }
    </>
  )
}