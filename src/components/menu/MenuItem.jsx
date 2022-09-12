import React, {memo} from 'react';
import Item from './Item';
import useMenu from '../../hooks/useMenu';
import items from '../../static/Items.js';

const MenuItem = ({menu,setMenu,menuRef}) => {

    useMenu(menu,setMenu,menuRef);
       
    return (
        <div className="dropdown">         
            <div className="container">
                {items.map((item)=>(<Item {...item} setMenu={setMenu} key={item.id}/>))}
            </div>
        </div>
    )
}

export default memo(MenuItem);