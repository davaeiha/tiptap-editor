import React from 'react';
import closeIcon from '../../assets/handlers/close.svg';

const CloseHandler = ({setSection})=> {
    return (
        <div
            className='delete-icon'
            contentEditable='false'
            suppressContentEditableWarning="false"
            draggable="true"
            onClick={()=>setSection(false)}
        >
            <img src={closeIcon} alt="close" />
        </div>
  )
}


export default CloseHandler;