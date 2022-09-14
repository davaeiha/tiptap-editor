import React from 'react';
import nextIcon from '../../assets/handlers/next.svg';
import perviousIcon from '../../assets/handlers/previous.svg';
import plusIcon from '../../assets/handlers/plus.svg';
// @ts-ignore
import {versionHookType,typeEnum} from '../../types/version.ts';


const VersionHandler : React.FC<versionHookType> = ({dispatch,selectedVersion}) => {
    return (
        <div className='version'>
            <p>{selectedVersion.name}</p>
            <div className='icons'>
                <img onClick={()=>dispatch({type:typeEnum.PERVIOUS})} src={perviousIcon} alt="previous" />
                <img src={plusIcon} alt="new" />
                <img onClick={()=>dispatch({type:typeEnum.NEXT})} src={nextIcon} alt="next" />
            </div>
        </div>
    )
}


export default VersionHandler