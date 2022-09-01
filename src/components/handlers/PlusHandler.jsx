import React, { useContext, useEffect, useRef, useState } from 'react';
import plusIcon from '../../assets/handlers/plus.svg';
import { EditorContext } from '../../contexts/EditorContext';
import MenuItem from '../menu/MenuItem';

const PlusHandler = ({node,getPos,hover,clickHandler}) => {
    const [menu,setMenu] = useState(false); 

    const editor = useContext(EditorContext);

    const addSectionHandler =() => {
        editor
        .commands
        .insertContentAt(getPos() + node.nodeSize,`<draggableItem><p></p></draggableItem>`)
        
        setMenu(true)
    }

    const menuRef = useRef(null);

    useEffect(()=>{
        setMenu(false);
    },[hover]);

    return (
        <div 
            className='plus-handle'
            contentEditable="false"
            suppressContentEditableWarning="false"
            
            ref={menuRef}
        >
            <img 
            src={plusIcon} 
            alt="plus" 
            style={{display:!hover?"none":"flex"}}
            onClick={clickHandler ?? addSectionHandler}
            />
            { menu && <MenuItem menu={menu} setMenu={setMenu} menuRef={menuRef} />}
        </div>
  )
}


export default PlusHandler;