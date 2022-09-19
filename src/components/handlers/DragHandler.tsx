import React,{memo} from 'react';
// import dragIcon from '../../assets/handlers/drag.svg';

interface DragHandlerInterface {
  hover : boolean
  article ?: boolean
} 

const DragHandler:React.FC<DragHandlerInterface> = ({hover,article}) => {
  return (
    <div
        className="drag-handle"
        contentEditable="false"
        suppressContentEditableWarning={false}
        draggable="true"
        data-drag-handle
        style={{
          display:!hover ?"none":"flex",
          color : article ? '#ffffff' : 'inherit' 
        }}
    >
      <i className="fa-regular fa-grip-lines fa-2xs"></i>
    </div>
  )
}

export default memo(DragHandler);