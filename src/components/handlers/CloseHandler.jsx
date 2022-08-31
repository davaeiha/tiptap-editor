import React from 'react';
import closeIcon from '../../assets/handlers/close.svg';

const CloseHandler = ({setSection})=> {

    const deleteHandler = (e) => {
        setSection(false);
    }


    return (
        <div
            className='delete-icon'
            contentEditable='false'
            suppressContentEditableWarning="false"
            draggable="true"
            onClick={deleteHandler}
        >
            <img src={closeIcon} alt="close" />
        </div>
  )
}


export default CloseHandler;