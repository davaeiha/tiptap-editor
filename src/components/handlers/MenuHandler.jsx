import React, { useContext } from 'react'
import { EditorContext } from '../../contexts/EditorContext';
import menuIcon from '../../assets/handlers/three-dots.svg';

const MenuHandler = ({menu,setMenu,pos}) => {
    const editor = useContext(EditorContext);

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
            suppressContentEditableWarning="false"
            draggable="true"
            onClick={menuHandler}
        >
            <img src={menuIcon} alt="menu" />
        </div>
    )
}


export default MenuHandler