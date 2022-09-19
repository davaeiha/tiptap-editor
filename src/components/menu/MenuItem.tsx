import React, {memo} from 'react';
import Item from './Item';
//@ts-ignore
import useBlur from '../../hooks/useBlur.ts';
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

    useBlur(menu,setMenu,menuRef);
       
    return (
        <div className="dropdown">
            <span className='title'>Turn into:</span>         
            <div className="container">
                {items.map((item:itemInterface)=>(<Item {...item} setMenu={setMenu} key={item.id}/>))}
            </div>
        </div>
    )
}

export default memo(MenuItem);