import React from 'react';
import nextIcon from '../../assets/handlers/next.svg';
import perviousIcon from '../../assets/handlers/previous.svg';
import plusIcon from '../../assets/handlers/plus.svg';

const VersionHandler = ({versions,setSeletedVersion}) => {

    const nextVerionHandler = () => {
        
    }

    const perviousVersionHandler = () => {

    }

    return (
        <div className='version'>
            <p>version</p>
            <div className='icons'>
                <img onClick={nextVerionHandler} src={perviousIcon} alt="previous" />
                <img src={plusIcon} alt="new" />
                <img onClick={perviousVersionHandler} src={nextIcon} alt="next" />
            </div>
        </div>
    )
}


export default VersionHandler