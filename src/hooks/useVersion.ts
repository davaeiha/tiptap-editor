import  {useReducer} from 'react';
// @ts-ignore
import {versionHookType,versionType,typeEnum,actionType} from '../types/version.ts';

const useVersion = () : versionHookType => {
    const versions:Array<versionType> = [
        {
            name: 'version 1 name',
            value:'version 1 text'
        },
        {
            name: 'version 2 name',
            value:'version 2 text'
        },
        {
            name: 'version 3 name',
            value:'version 3 text'
        }
    ];

    const initialVersion : versionType = versions[0];

    const reducer = (state:versionType,action:actionType) => {

        const position = versions.findIndex((element) =>
            element.value === state.value
        );

        switch (action.type) {
            case typeEnum.NEXT:
                if (position===versions.length-1) {
                    return versions[0]
                }else{
                    return versions[position+1]
                }
            case typeEnum.PERVIOUS:
                if (position===0) {
                    return versions[versions.length-1]
                }else{
                    return versions[position-1]
                }
            default:
                throw initialVersion;
        }
    }

    const [selectedVersion,dispatch] = useReducer(reducer,initialVersion) ;

    return {
        selectedVersion,
        dispatch,
    }
}

export default useVersion;