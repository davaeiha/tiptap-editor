import { Editor } from '@tiptap/react';
import React, { useContext, useRef, useState, memo } from 'react';
import plusIcon from '../../assets/handlers/plus.svg';
//@ts-ignore
import { EditorContext } from '../../contexts/EditorContext.tsx';
import MenuItem from '../menu/MenuItem';

interface PlusHandlerInterface {
    nodeSize:number,
    getPos:()=>number,
    hover:boolean
}

const PlusHandler : React.FC<PlusHandlerInterface> = ({nodeSize,getPos,hover}) => {

    const [menu,setMenu] = useState<boolean>(false); 

    const editor:Editor = useContext(EditorContext);

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
            suppressContentEditableWarning={false}
            
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