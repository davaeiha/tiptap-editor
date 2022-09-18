import React from 'react';
import CloseHandler from './CloseHandler';
import VersionHandler from './VersionHandler';
import viewIcon from '../../assets/handlers/view.svg';
//@ts-ignore
import versionHookType from '../../types/version.ts';

type ArticleHeaderHandler = {
    hover:boolean,
    setSection:(section:boolean)=>void, 
} & versionHookType;

const ArticleHeaderHandler = ({
    hover,
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
  )
}


export default ArticleHeaderHandler;