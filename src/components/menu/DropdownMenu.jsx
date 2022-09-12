import React,{useState,useEffect,useRef,memo} from 'react';
import MenuItem from '../menu/MenuItem';
import CloseHandler from '../handlers/CloseHandler';
import MenuHandler from '../handlers/MenuHandler';
import { useCallback } from 'react';

const DropdownMenu = ({hover,setSection,pos}) => {
    
    const [menu,setMenu] = useState(false);
    const menuRef = useRef(null);
    
    return (
        <div className='menu'>
            <div className='menu-container' tabIndex={1} ref={menuRef}>
                <div className="icon-container" style={{display:!hover ? "none" : "flex"}}>
                    <MenuHandler menu={menu} setMenu={setMenu} pos={pos}/>
                    <CloseHandler setSection={setSection}/>
                </div>
                { menu && <MenuItem menu={menu} menuRef={menuRef} setMenu={setMenu}/>}
            </div>
        </div>
    );
}


export default memo(DropdownMenu);
// export default DropdownMenu;