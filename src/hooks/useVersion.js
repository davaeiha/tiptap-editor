import {useReducer} from 'react';

const useVersion = () => {
    const versions = [
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

    const initialVersion = versions[0];

    const reducer = (state,action) => {

        const position = versions.findIndex((element) =>
            element.value === state.value
        );

        switch (action.type) {
            case 'next':
                if (position===versions.length-1) {
                    return versions[0]
                }else{
                    return versions[position+1]
                }
            case 'pervious':
                if (position===0) {
                    return versions[versions.length-1]
                }else{
                    return versions[position-1]
                }
            default:
                break;
        }
    }

    const [selectedVersion,dispatch] = useReducer(reducer,initialVersion);

    return {
        selectedVersion,
        dispatch,
    }
}

export default useVersion;