import React,{memo} from 'react';
import dragIcon from '../../assets/handlers/drag.svg';

const DragHandler = ({hover}) => {
  return (
    <div
        className="drag-handle"
        contentEditable="false"
        suppressContentEditableWarning="false"
        draggable="true"
        data-drag-handle
    >
        <img src={dragIcon} alt="drag" style={{display:!hover?"none":"flex"}} />
    </div>
  )
}

export default memo(DragHandler);