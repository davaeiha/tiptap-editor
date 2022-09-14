/* eslint-disable import/no-anonymous-default-export */
import {Editor as EditorType, NodeViewRendererProps, NodeViewWrapper } from '@tiptap/react';
import React,{useContext, useEffect, useState} from 'react';
import DropdownMenu from '../menu/DropdownMenu';
//@ts-ignore
import { EditorContext } from '../../contexts/EditorContext.tsx';
import PlusHandler from '../handlers/PlusHandler';
import DragHandler from '../handlers/DragHandler';

interface nodeWrapperProps extends NodeViewRendererProps {
  children : React.ReactNode
}

export default (props : nodeWrapperProps) => {
  
  const editor : EditorType = useContext(EditorContext);

  const [section,setSection] = useState<boolean>(true);
  
  const [hover,setHover] = useState<boolean>(false);

  const pos : (() => number) = props.getPos as (()=>number);

  useEffect(()=>{
    editor.commands.focus(pos()+2)
  },[]);
  
  const firstChild : string | undefined  = props.node?.firstChild?.type?.name;

  const childrenNumber = props.node.content as any
  
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
              childrenNumber.content.length > 1 && <>
                <div
                  className='vertical-line' 
                  style={{display:!hover?"none":"flex"}} 
                  contentEditable="false"
                  suppressContentEditableWarning ={false}
                /> 
                <PlusHandler hover={hover} 
                getPos={props.getPos as ()=>number} nodeSize={props.node.nodeSize}
                />
              </>
            }
            </div>
          }
          

          {props.children}
          {
            (firstChild === 'bulletList'||firstChild === 'orderedList') ||
            <DropdownMenu
              pos={props.getPos as (()=>number)} 
              setSection={setSection} 
              hover={hover}
            />
          }
        </NodeViewWrapper>
      }
    </>
  )
}