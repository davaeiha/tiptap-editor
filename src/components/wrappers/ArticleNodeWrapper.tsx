import React, { useRef, useState } from 'react';
import { NodeViewWrapper,NodeViewContent,NodeViewRendererProps } from '@tiptap/react';
//@ts-ignore
import useVersion from '../../hooks/useVersion.ts';
import ArticleHeaderHandler from '../handlers/ArticleHeaderHandler';
import ArticleSideHandler from '../handlers/ArticleSideHandler';
import useBlur from '../../hooks/useBlur';

const ArticleNodeWrapper:React.FC<NodeViewRendererProps>= (props) => {
    
    const [section,setSection] = useState<boolean>(true);
    const [hover,setHover] = useState<boolean>(false);
    const [focus,setFocus] = useState<boolean>(false);
    const articleRef : React.RefObject<HTMLDivElement> = useRef(null);
    useBlur(focus,setFocus,articleRef);
    const {selectedVersion,dispatch} = useVersion(props);
    
    
    return (
        <>
            {
            section && <NodeViewWrapper
                className="article-item"
                onMouseOver={()=>setHover(true)}
                onMouseOut={()=>setHover(false)}
                onClick={()=>setFocus(true)}
                ref={articleRef}
            >
            <ArticleSideHandler 
                hover={hover} 
                focus={focus}
                getPos={props.getPos} 
                nodeSize={props.node.nodeSize} 
            />
                
            <div className='article'>
                <ArticleHeaderHandler
                    hover={hover} 
                    focus={focus}
                    setSection={setSection} 
                    dispatch={dispatch} 
                    selectedVersionName={selectedVersion.name}
                />
                <NodeViewContent className="content" />
            </div>
            </NodeViewWrapper>
        }
        </>
    )
}

export default ArticleNodeWrapper;