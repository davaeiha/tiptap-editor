import React, { useContext } from 'react';
import { Editor } from '@tiptap/react';
//@ts-ignore
import { EditorContext } from '../../contexts/EditorContext.tsx';


interface MenuHandlerInterface {
    menu:boolean,
    setMenu:Function,
    pos:() => number
} 

const MenuHandler : React.FC<MenuHandlerInterface> = ({menu,setMenu,pos}) => {
    const editor : Editor = useContext(EditorContext);

    const menuHandler = () => {
        
        editor
        .chain()
        .focus(pos()+2)
        .selectParentNode()
        .run();

        setMenu(!menu);
    }

    return (
        <div
            className='menu-icon'
            contentEditable='false'
            suppressContentEditableWarning={false}
            draggable="true"
            onClick={menuHandler}
        >
            <i className="fa-solid fa-ellipsis-vertical fa-2xs"></i>
        </div>
    )
}


export default MenuHandler