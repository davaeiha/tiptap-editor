import React, { useContext,memo } from 'react'
import { EditorContext } from '../../contexts/EditorContext';

const Item = ({activation,icon,name,onClick,setMenu}) => {

    const editor=useContext(EditorContext);

    const itemHandler = () => {
        
        Array.isArray(activation) ?
        onClick(editor,activation[1]) :
        onClick(editor)

        setMenu(false);
    }

    return (
        <div
            onClick={itemHandler}
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