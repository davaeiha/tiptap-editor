import React, { useState } from 'react';
import { NodeViewWrapper,NodeViewContent,NodeViewRendererProps } from '@tiptap/react';
//@ts-ignore
import useVersion from '../../hooks/useVersion.ts';
import ArticleHeaderHandler from '../handlers/ArticleHeaderHandler';
import ArticleSideHandler from '../handlers/ArticleSideHandler';


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
            <ArticleSideHandler 
                hover={hover} 
                getPos={props.getPos} 
                nodeSize={props.node.nodeSize} 
            />
            <div className='article'>
                <ArticleHeaderHandler
                    hover={hover} 
                    setSection={setSection} 
                    dispatch={dispatch} 
                    selectedVersion={selectedVersion}
                />
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