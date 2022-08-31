import React, { useContext, useState } from 'react';
import plusIcon from '../../assets/handlers/plus.svg';
import { EditorContext } from '../../contexts/EditorContext';
import MenuItem from '../menu/MenuItem';

const PlusHandler = ({getPos,hover}) => {
    const [menu,setMenu] = useState(false); 

    const editor = useContext(EditorContext);

    const addSectionHandler =() => {
        editor
        .chain()
        .focus(getPos()+2)
        .selectParentNode()
        .selectParentNode()
        .createParagraphNear()
        .wrapIn('draggableItem')
        .run();
        
        setMenu(true)
    }
    

    return (
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
  )
}


export default PlusHandler;