import React, { useContext } from 'react'
import { EditorContext } from '../contexts/EditorContext';

const Item = ({activation,icon,name,onClick}) => {

    const editor=useContext(EditorContext);

    return (
        <div
            onClick={Array.isArray(activation)?()=>onClick(activation[1]) : onClick}
            className={
                editor.isActive(
                    Array.isArray(activation) ? activation[0] : activation,
                    Array.isArray(activation) && {level:activation[1]}
                    ) 
                    ? 'is-active item' : 'item'
                }
        >
            <img src={icon} alt={name} className="item-icon" />
            {name}
        </div>
  )
}


export default Item;