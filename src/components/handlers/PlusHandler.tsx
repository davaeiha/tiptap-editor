import { Editor } from '@tiptap/react';
import React, { useContext, useRef, useState, memo } from 'react';
//@ts-ignore
import { EditorContext } from '../../contexts/EditorContext.tsx';
import MenuItem from '../menu/MenuItem';

interface PlusHandlerInterface {
    nodeSize:number,
    getPos:()=>number,
    hover:boolean,
    article?:boolean;
}

const PlusHandler : React.FC<PlusHandlerInterface> = ({nodeSize,getPos,hover,article=false}) => {

    const [menu,setMenu] = useState<boolean>(false); 

    const editor:Editor = useContext(EditorContext);

    const addSectionHandler =() => {

        editor
        .commands
        .insertContentAt(getPos() + nodeSize,`<draggableItem><p></p></draggableItem>`)
        
        setMenu(true)
    }

    const menuRef : React.RefObject<HTMLDivElement>= useRef(null);

    return (
        <div 
            className='plus-handle'
            contentEditable="false"
            suppressContentEditableWarning={false}
            style={{
                display:!hover ?"none":"flex",
                color: article ? '#ffffff' : 'inherite'
            }}
            ref={menuRef}
        >
            <div className='plus' onClick={addSectionHandler ?? null} >
                <i className="fa-solid fa-plus fa-2xs" fa-xs></i>
            </div>
            {menu && <MenuItem menu={menu} setMenu={setMenu} menuRef={menuRef} />}
        </div>
    )
}


export default memo(PlusHandler);