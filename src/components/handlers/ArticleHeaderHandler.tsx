import React from 'react';
import CloseHandler from './CloseHandler';
import VersionHandler from './VersionHandler';
//@ts-ignore
import versionHookType from '../../types/version.ts';

type ArticleHeaderHandler = {
    hover:boolean,
    focus:boolean,
    setSection:(section:boolean)=>void, 
} & versionHookType;

const ArticleHeaderHandler = ({
    hover,
    focus,
    setSection,
    selectedVersion,
    dispatch
}:ArticleHeaderHandler) => {
  return (
    <div className="header-container">
        <div 
            className="header"
            contentEditable='false'
            suppressContentEditableWarning={false}
            style={{
                display:(!hover && !focus)?"none":"flex",
            }}
        >
            <div className='title' style={{color:(!hover && focus) ? "#3385ff":"#05f"}}>New Article</div>
            
                <div className="article-handler">
                    <VersionHandler hover={hover} selectedVersion={selectedVersion} dispatch={dispatch}/>
                    {
                        hover && <>
                            <div className='open-close'>
                                <CloseHandler setSection={setSection}/>
                            </div>
                        </>
                    }   
            </div>
        </div>
    </div>
  )
}


export default ArticleHeaderHandler;