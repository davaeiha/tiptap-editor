import React, {memo} from 'react';
import Item from './Item';
//@ts-ignore
import useMenu from '../../hooks/useMenu.ts';
//@ts-ignore
import items from '../../static/Items.ts';
// @ts-ignore
import { itemInterface } from '../../types/item';

interface MenuItemInterface {
    menu:boolean,
    setMenu:Function,
    menuRef:React.RefObject<HTMLDivElement>
}

const MenuItem : React.FC<MenuItemInterface> = ({menu,setMenu,menuRef}) => {

    useMenu(menu,setMenu,menuRef);
       
    return (
        <div className="dropdown">         
            <div className="container">
                {items.map((item:itemInterface)=>(<Item {...item} setMenu={setMenu} key={item.id}/>))}
            </div>
        </div>
    )
}

export default memo(MenuItem);