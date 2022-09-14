import React, { useContext } from 'react';
//@ts-ignore
import { EditorContext } from '../../contexts/EditorContext.tsx';
import menuIcon from '../../assets/handlers/three-dots.svg';
import { Editor } from '@tiptap/react';

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
            <img src={menuIcon} alt="menu" />
        </div>
    )
}


export default MenuHandler