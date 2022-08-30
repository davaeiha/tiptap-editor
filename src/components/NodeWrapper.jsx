/* eslint-disable import/no-anonymous-default-export */
import { NodeViewWrapper } from '@tiptap/react';
import React,{useContext, useEffect, useState} from 'react';
import DropdownMenu from './DropdownMenu';
import { EditorContext } from '../contexts/EditorContext';
import dragIcon from '../assets/drag.svg';
import plusIcon from '../assets/plus.svg';
import MenuItem from './MenuItem';

export default (props) => {
  
  const editor = useContext(EditorContext);

  const [section,setSection] = useState(true);
  const [menu,setMenu] = useState(false); 
  const [hover,setHover] = useState(false);


  const addSectionHandler =() => {
    editor
    .chain()
    .focus(props.getPos()+2)
    .selectParentNode()
    .selectParentNode()
    .createParagraphNear()
    .wrapIn('draggableItem')
    .run();
    
    setMenu(true)
  }

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
          <div className='handle-container'>
            <div
              className="drag-handle"
              contentEditable="false"
              suppressContentEditableWarning="false"
              draggable="true"
              data-drag-handle
            >
              <img src={dragIcon} alt="drag" style={{display:!hover?"none":"flex"}} />
            </div>
            {
              props.node.content.content.length > 1 && <>
                <div
                  className='vertical-line' 
                  style={{display:!hover?"none":"flex"}} 
                  contentEditable="false"
                  suppressContentEditableWarning="false"
                /> 
                <div 
                  className='plus-handle'
                  contentEditable="false"
                  suppressContentEditableWarning="false"
                  
                >
                  <img 
                    src={plusIcon} 
                    alt="plus" 
                    style={{display:!hover?"none":"flex"}}
                    onClick={addSectionHandler}
                    />
                  { menu && <MenuItem setMenu={setMenu} />}
                </div>
              </>
            }
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