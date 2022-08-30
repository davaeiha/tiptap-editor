import React,{useContext, useState,useEffect,useRef} from 'react';
import { EditorContext } from '../contexts/EditorContext';
import closeIcon from '../assets/close.svg';
import menuIcon from '../assets/three-dots.svg';
import MenuItem from './MenuItem';

const DropdownMenu = (props) => {
    const editor = useContext(EditorContext);
    const [menu,setMenu] = useState(false);
    const menuRef = useRef(null);
    
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (menu && menuRef.current && !menuRef.current.contains(e.target)) {
                setMenu(false);
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        }
    }, [menu]);

    const menuHandler = (e) => {
        editor.commands.focus(props.pos()+2);
        setMenu(!menu);
    }

    const deleteHandler = (e) => {
        props.setSection(false);
    }
    return (
        <div className='menu'>
            <div className='menu-container' tabIndex={1} ref={menuRef}>
                <div className="icon-container" style={{display:!props.hover ? "none" : "flex"}}>
                    <div
                        className='menu-icon'
                        contentEditable='false'
                        suppressContentEditableWarning="false"
                        draggable="true"
                        onClick={menuHandler}
                    >
                        <img src={menuIcon} alt="menu" />
                    </div>
                    <div
                        className='delete-icon'
                        contentEditable='false'
                        suppressContentEditableWarning="false"
                        draggable="true"
                        onClick={deleteHandler}
                    >
                        <img src={closeIcon} alt="close" />
                    </div>
                </div>
                {
                    menu && <MenuItem setMenu={setMenu}/>
                }
            </div>
        </div>
    );
}


export default DropdownMenu;