import React, { useContext, useEffect, useRef, useState, memo } from 'react';
import plusIcon from '../../assets/handlers/plus.svg';
import { EditorContext } from '../../contexts/EditorContext';
import MenuItem from '../menu/MenuItem';

const PlusHandler = ({nodeSize,getPos,hover}) => {

    const [menu,setMenu] = useState(false); 

    const editor = useContext(EditorContext);

    const addSectionHandler =() => {

        editor
        .commands
        .insertContentAt(getPos() + nodeSize,`<draggableItem><p></p></draggableItem>`)
        
        setMenu(true)
    }

    const menuRef = useRef(null);

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
                onClick={addSectionHandler ?? null}
            />
            { menu && <MenuItem menu={menu} setMenu={setMenu} menuRef={menuRef} />}
        </div>
  )
}


export default memo(PlusHandler);