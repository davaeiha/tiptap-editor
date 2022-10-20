import React from 'react';
// @ts-ignore
import {versionHookType,typeEnum} from '../../types/version.ts';

type VersionHandlerType = {
    hover:boolean,
} & versionHookType;

const VersionHandler : React.FC<VersionHandlerType> = ({dispatch,selectedVersionName,hover}) => {
    return (
        <div className='version'>
            <span className='version-name'>{selectedVersionName}</span>
            {
                hover && <div className='version-icons'>
                <div className="icon" onClick={()=>dispatch({type:typeEnum.PERVIOUS})}>
                    <i className="fa-solid fa-backward-step fa-2xs"></i>
                </div>
                <div className="icon">
                    <i className="fa-solid fa-plus fa-2xs"></i>
                </div>
                <div className="icon" onClick={()=>dispatch({type:typeEnum.NEXT})}>
                    <i className="fa-solid fa-forward-step fa-2xs"></i>
                </div>
            </div>
            }
        </div>
    )
}


export default VersionHandler