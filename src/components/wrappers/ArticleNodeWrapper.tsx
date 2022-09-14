import React, { useState } from 'react';
import { NodeViewWrapper,NodeViewContent,NodeViewRendererProps } from '@tiptap/react';
import DragHandler from '../handlers/DragHandler';
import PlusHandler from '../handlers/PlusHandler';
import CloseHandler from '../handlers/CloseHandler';
import viewIcon from '../../assets/handlers/view.svg';
import VersionHandler from '../handlers/VersionHandler';
//@ts-ignore
import useVersion from '../../hooks/useVersion.ts';


const ArticleNodeWrapper:React.FC<NodeViewRendererProps>= (props) => {

    const [section,setSection] = useState<boolean>(true);
    const [hover,setHover] = useState<boolean>(false);
    const {selectedVersion,dispatch} = useVersion();

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
                    <PlusHandler 
                        hover={hover} 
                        getPos={props.getPos as ()=>number}
                        nodeSize={props.node.nodeSize as number}
                    />
                </div>
            </div>
            <div className='article'>
                <div className="header-container">
                    <div 
                        className="header"
                        contentEditable='false'
                        suppressContentEditableWarning={false}
                        style={{display:!hover?"none":"flex"}}
                    >
                        <div className='title'>New Article</div>
                        <div className="article-handler">
                            <VersionHandler selectedVersion={selectedVersion} dispatch={dispatch}/>
                            <div className='open-close'>
                                <img src={viewIcon} alt="open" />
                                <CloseHandler setSection={setSection}/>
                            </div>
                        </div>
                    </div>
                </div>
                <NodeViewContent className="content" >
                    {selectedVersion.value}
                </NodeViewContent>
            </div>
            </NodeViewWrapper>
        }
        </>
    )
}


export default ArticleNodeWrapper;