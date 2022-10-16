import React,{useContext, useEffect, useState} from "react";
import {useQuery,useLazyQuery} from '@apollo/client';
import { makeTree,makeContent } from "./static/tree";
// @ts-ignore 
import Editor from "./components/Editor.tsx";
// @ts-ignore 
import {KNOWLEDGE_CONTENT} from './graphql/query/knowledge-content.ts';
// @ts-ignore 
import {VERSION} from './graphql/query/version.ts';
import {ContentTree,QueryVarable,KnowledgeContent, Version,ContentItem, NestedContentItem} from './types/tree';
import { EditorContext } from "./contexts/EditorContext";

interface KnowledgeContentQuery {
  knowledgeContent:KnowledgeContent
}

interface VersionQuery {
  version:Version
}


function App() {

  const { loading, error, data } = useQuery<KnowledgeContentQuery,QueryVarable>(KNOWLEDGE_CONTENT,{
    variables: {
      id:'c26d0f0e-6256-4f53-81ab-b39d9f4df21e'
    }
  });

  const [version] = useLazyQuery<VersionQuery,QueryVarable>(VERSION);

  const editor:Editor = useContext(EditorContext);

  const [contentTree,setContentTree] = useState<ContentTree[]>([]);

  useEffect(()=>{
    let ignore : boolean = false;

    if (data) {
      version({
        variables:{
          id:data.knowledgeContent.versions![0].id,
          sort:true
        }
      }).then((res)=>{
       
        const tree = res.data && makeTree(res.data.version.items as ContentItem[],res?.data.version.id);
        if (!ignore) {
          setContentTree(makeContent(tree as ContentItem[]));
        }

      });
    }

    return ()=>{ignore=true}
  },[data]);


  
  useEffect(()=>{
    if (editor) {
      editor.commands.setContent({
        'type':'doc',
        content:contentTree
      } as ContentTree) as boolean
    }
  },[contentTree]);
  

  if (loading) return 'Loading...';
  
  if (error) return `Error! ${error.message}`;
  
  
  return (
    <>
      <Editor/>
    </>
  );
}

export default App;