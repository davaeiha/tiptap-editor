import { Editor } from '@tiptap/react';
import React, { useContext} from 'react';
//@ts-ignore
import { EditorContext } from '../../contexts/EditorContext.tsx';
//@ts-ignore
import { itemInterface } from '../../types/item.ts'; 

const Item : React.FC<itemInterface> = ({activation,icon,name,onClick,setMenu}) => {

    const editor:Editor=useContext(EditorContext);

    const itemHandler = () => {
        
        Array.isArray(activation) ?
        onClick(editor,activation[1] as number) :
        onClick(editor)

        setMenu(false);
    }

    return (
        <div
            onClick={itemHandler}
            className={
                editor.isActive(
                    Array.isArray(activation) ? activation[0] as string : activation as string,
                    Array.isArray(activation) && {level:activation[1] as number}
                    ) 
                    ? 'is-active item' : 'item'
                }
        >
            <div className="item-icon">
                <i className={icon}></i>
            </div>
            <span className='item-name'>
                {name}
            </span>
        </div>
  )
}

export default Item;