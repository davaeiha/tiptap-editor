import React,{useContext,useReducer} from 'react';
import nextIcon from '../../assets/handlers/next.svg';
import perviousIcon from '../../assets/handlers/previous.svg';
import plusIcon from '../../assets/handlers/plus.svg';

const VersionHandler = ({dispatch,selectedVersion}) => {
    return (
        <div className='version'>
            <p>{selectedVersion.name}</p>
            <div className='icons'>
                <img onClick={()=>dispatch({type:'pervious'})} src={perviousIcon} alt="previous" />
                <img src={plusIcon} alt="new" />
                <img onClick={()=>dispatch({type:'next'})} src={nextIcon} alt="next" />
            </div>
        </div>
    )
}


export default VersionHandler