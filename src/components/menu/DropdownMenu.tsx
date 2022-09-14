import React,{useState,useRef,memo} from 'react';
import MenuItem from './MenuItem';
import CloseHandler from '../handlers/CloseHandler';
import MenuHandler from '../handlers/MenuHandler';

interface DropdownInterface {
    hover:boolean,
    setSection:(section:boolean)=>void,
    pos:()=>number
}

const DropdownMenu : React.FC<DropdownInterface> = ({hover,setSection,pos}) => {
    
    const [menu,setMenu] = useState<boolean>(false);
    const menuRef : React.RefObject<HTMLDivElement> = useRef(null);
    
    return (
        <div className="dropdown">
            <div className='menu'>
                <div className='menu-container' tabIndex={1} ref={menuRef}>
                    <div className="icon-container" style={{display:!hover ? "none" : "flex"}}>
                        <MenuHandler menu={menu} setMenu={setMenu} pos={pos}/>
                        <CloseHandler setSection={setSection}/>
                    </div>
                    { menu && <MenuItem menu={menu} menuRef={menuRef} setMenu={setMenu}/>}
                </div>
            </div>
        </div>
    );
}


export default memo(DropdownMenu);
// export default DropdownMenu;