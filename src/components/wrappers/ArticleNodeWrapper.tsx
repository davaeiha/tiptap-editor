import React, {  useRef, useState } from 'react';
import { NodeViewWrapper,NodeViewContent,NodeViewRendererProps } from '@tiptap/react';
//@ts-ignore
import useVersion from '../../hooks/useVersion.ts';
import ArticleHeaderHandler from '../handlers/ArticleHeaderHandler';
import ArticleSideHandler from '../handlers/ArticleSideHandler';
import useBlur from '../../hooks/useBlur';
import { versionType } from '../../types/version';


const ArticleNodeWrapper:React.FC<NodeViewRendererProps>= (props) => {
    // const versions:Array<versionType> = [
    //     {
    //         name: 'version 1 name',
    //         value:'version 1 text'
    //     },
    //     {
    //         name: 'version 2 name',
    //         value:'version 2 text'
    //     },
    //     {
    //         name: 'version 3 name',
    //         value:'version 3 text'
    //     }
    // ];
    const versions:Array<versionType> = props.node.attrs.versions;
    const [section,setSection] = useState<boolean>(true);
    const [hover,setHover] = useState<boolean>(false);
    const [focus,setFocus] = useState<boolean>(false);
    const articleRef : React.RefObject<HTMLDivElement> = useRef(null);
    useBlur(focus,setFocus,articleRef);
    const {selectedVersion,dispatch} = useVersion(versions);
    // console.log(props)
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
                    selectedVersion={selectedVersion}
                />
                <NodeViewContent className="content"/>
                    {/* {selectedVersion.value} */}
                {/* </NodeViewContent> */}
            </div>
            </NodeViewWrapper>
        }
        </>
    )
}

export default ArticleNodeWrapper;