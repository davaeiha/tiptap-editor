import React from 'react';
import closeIcon from '../../assets/handlers/close.svg';

interface CloseHandlerInterface {  
    setSection:(section:boolean)=>void  
}

const CloseHandler:React.FC<CloseHandlerInterface> = ({setSection})=> {
    return (
        <div
            className='delete-icon'
            contentEditable='false'
            suppressContentEditableWarning={false}
            draggable="true"
            onClick={()=>setSection(false)}
        >
            <img src={closeIcon} alt="close" />
        </div>
  )
}


export default CloseHandler;