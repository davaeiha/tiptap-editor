import React from 'react';

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
            <i className="fa-solid fa-xmark fa-2xs"></i>
        </div>
  )
}


export default CloseHandler;