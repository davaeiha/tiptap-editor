import React, { useState } from 'react';
import { NodeViewWrapper,NodeViewContent } from '@tiptap/react';
import DragHandler from '../handlers/DragHandler';
import PlusHandler from '../handlers/PlusHandler';
import CloseHandler from '../handlers/CloseHandler';
import nextIcon from '../../assets/handlers/next.svg';
import perviousIcon from '../../assets/handlers/previous.svg';
import plusIcon from '../../assets/handlers/plus.svg';
import viewIcon from '../../assets/handlers/view.svg';


const ArticleNodeWrapper = props => {

    const [section,setSection] = useState(true);
    const [hover,setHover] = useState(false);

    return (
        <>
            {
            section && <NodeViewWrapper
                className="article-item"
                onMouseOver={()=>setHover(true)}
                onMouseOut={()=>setHover(false)}
            >
            <div className='handler' >
                <div className="icon-container" style={{display:!hover?"none":"flex"}}>
                    <DragHandler hover={hover}/>
                    <PlusHandler hover={hover} getPos={props.getPos} node={props.node}/>
                </div>
            </div>
            <div className='article'>
                <div className="header-container">
                    <div 
                        className="header"
                        contentEditable='false'
                        suppressContentEditableWarning="false"
                        style={{display:!hover?"none":"flex"}}
                    >
                        <div className='title'>New Article</div>
                        <div className="article-handler">
                            <div className='version'>
                                <p>version</p>
                                <div className='icons'>
                                    <img src={perviousIcon} alt="previous" />
                                    <img src={plusIcon} alt="new" />
                                    <img src={nextIcon} alt="next" />
                                </div>
                            </div>
                            <div className='open-close'>
                                <img src={viewIcon} alt="open" />
                                <CloseHandler setSection={setSection}/>
                            </div>
                        </div>
                    </div>
                </div>
                <NodeViewContent className="content"/>
            </div>
            </NodeViewWrapper>
        }
        </>
    )
}


export default ArticleNodeWrapper;