import React from 'react';
import DragHandler from './DragHandler';
import PlusHandler from './PlusHandler';

interface ArticleSideHandlerInterface {
    hover:boolean,
    getPos:boolean | (()=>number),
    nodeSize:number,
    focus:boolean
}

const ArticleSideHandler = ({hover,getPos,nodeSize,focus}:ArticleSideHandlerInterface) => {
  return (
    <div className='handler'>
        <div 
          className="icon-container" 
          style={{
            display:(!hover && !focus)?"none":"flex",
            backgroundColor:(!hover && focus) ? "#3385ff":"#05f"
          }}
        >
            <DragHandler hover={hover} article={true}/>
            <PlusHandler 
                hover={hover} 
                getPos={getPos as ()=>number}
                nodeSize={nodeSize as number}
                article={true}
            />
        </div>
    </div>
  )
}

export default ArticleSideHandler