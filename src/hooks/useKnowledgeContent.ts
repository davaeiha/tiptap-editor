import React, { useState,useEffect } from "react";
import {useQuery} from '@apollo/client';
// @ts-ignore 
import {KNOWLEDGE_CONTENT} from '../graphql/query/knowledge-content.ts';

const useKnowledgeContent = (id:string) => {
    
    const versionIds: string [] = [];

    const { loading, error, data } = useQuery(KNOWLEDGE_CONTENT,{
        variables: {
          id
        }
    });


    useEffect(()=>{
        let ignore = false;
    
        if (!ignore) {
          data?.knowledgeContent.versions.forEach((version)=> {
            versionIds.push(version.id);
          });
        }
    
        // console.log(versionIds);
    
        return ()=>{
          ignore=true;
        }
    },[data]);

    return {versionIds,loading, error};
}

export default useKnowledgeContent;