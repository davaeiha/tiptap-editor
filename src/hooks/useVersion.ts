import  {useEffect, useReducer} from 'react';
import { useLazyQuery } from '@apollo/client';
import {NodeViewRendererProps} from '@tiptap/react';
import {  ContentItem, QueryVarable, Version } from '../types/tree';
// @ts-ignore
import {versionHookType,versionType,typeEnum,actionType} from '../types/version.ts';
import { VERSION } from '../graphql/query/version';
import {makeTree,makeContent} from '../static/tree';


interface VersionQuery {
    version:Version
}


const useVersion = (props:NodeViewRendererProps) : versionHookType => {

    const [version] = useLazyQuery<VersionQuery,QueryVarable>(VERSION);

    const versions:Array<versionType> =props.node.attrs.versions;
    
    const reducer = (state:versionType,action:actionType) => {
        
        const position = versions.findIndex((version) =>version.id === state.id);
     
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
                return versions[0];
        }
    }

    const [selectedVersion,dispatch] = useReducer(reducer,versions[0]) ;



    useEffect(()=>{
        if (selectedVersion) {
            version({
                variables:{
                    id:selectedVersion.id,
                    sort:true
                }
            }).then((res)=>{
                const jsonOutputs =res.data && makeContent(makeTree(res.data.version.items as ContentItem[],res.data?.version.id));

                if (jsonOutputs) {
                        
                    props
                    .editor
                    .chain()
                    .deleteRange({from:(props.getPos as ()=>number)()+2,to:(props.getPos as ()=>number)()+props.node.nodeSize})
                    .forEach(jsonOutputs.reverse(),(item, { commands})=>{
                        return commands.insertContentAt((props.getPos as ()=>number)()+1,item)
                    })
                    .run()

                }
               
            });  
        }
        
    },[selectedVersion]);


    return {
        selectedVersion,
        dispatch,
    }
}

export default useVersion;