import React,{useContext, useEffect, useState} from "react";
import {useQuery,useLazyQuery} from '@apollo/client';
import { makeTree,makeContent } from "./static/tree";
// @ts-ignore 
import Editor from "./components/Editor.tsx";
// @ts-ignore 
import {KNOWLEDGE_CONTENT} from './graphql/query/knowledge-content.ts';
// @ts-ignore 
import {VERSION} from './graphql/query/version.ts';
import {ContentTree,QueryVarable,KnowledgeContent, Version,ContentItem,NestedContentItem} from './types/tree';
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
      id:'ac3e32e9-953a-40b8-bfce-7c7b7d5e6360'
    }
  });
  const [version,versionState] = useLazyQuery<VersionQuery,QueryVarable>(VERSION);

  const editor = useContext(EditorContext);
  // console.log(editor?.storage)

  const [contentTree,setContentTree] = useState<ContentTree[]>([]);

  useEffect(()=>{
    if (data) {
      
       if(editor) editor.storage.ArticleItem.selectedVersion = data.knowledgeContent.versions![0].id;
      version({
        variables:{
          id:data.knowledgeContent.versions![0].id,
          sort:true
        }
      })
      .then((res)=>{
        // console.log(res.data)
        const tree = res.data && makeTree(res.data.version.items as ContentItem[],res.data.version.id as string);
        setContentTree(makeContent(tree as NestedContentItem[]));
      });
    }
  },[data]);


  useEffect(()=>{
    // if (editor) {
      editor?.commands.setContent({
        'type':'doc',
        content:contentTree
      } as ContentTree)
    // }
  },[contentTree]);

  if (loading && versionState.loading) return 'Loading...';
  
  if (error) return `Error! ${error.message}`;
  
  
  return (
    <>
      <Editor/>
    </>
  );
}

export default App;