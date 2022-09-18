import React from 'react';
import DragHandler from './DragHandler';
import PlusHandler from './PlusHandler';

interface ArticleSideHandlerInterface {
    hover:boolean,
    getPos:boolean | (()=>number),
    nodeSize:number
}

const ArticleSideHandler = ({hover,getPos,nodeSize}:ArticleSideHandlerInterface) => {
  return (
    <div className='handler' >
        <div className="icon-container" style={{display:!hover?"none":"flex"}}>
            <DragHandler hover={hover}/>
            <PlusHandler 
                hover={hover} 
                getPos={getPos as ()=>number}
                nodeSize={nodeSize as number}
            />
        </div>
    </div>
  )
}

export default ArticleSideHandler