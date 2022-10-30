import React, {ReactElement, useContext, useEffect, useMemo, useRef, useState} from "react";
import { EditorContent} from '@tiptap/react';
//@ts-ignore
import { EditorContext } from "../contexts/EditorContext.tsx";
import { Editor as EditorType } from "@tiptap/react";
import { useMutation } from "@apollo/client";
import { BULK_ITEMS } from "../graphql/mutation/bulk-items";


const Editor = ():ReactElement => {

  const editor:EditorType|null = useContext(EditorContext);
  const [onTyping,setOnTyping] = useState(editor?.state.doc.content);
  const [bulkItems,bukItemsResult] = useMutation(BULK_ITEMS);
 
  editor?.on('update',()=>{
    setOnTyping(editor?.state.doc.content);
  });

  // editor?.on('transaction', ({ editor, transaction }) => {
  //   console.log(transaction);
  // })
  
  useEffect(()=>{
    onTyping
    ?.content
    .filter((node)=> node.attrs.parent_id === null)
    .forEach((newContent)=>{
      newContent.attrs.parent_id = editor!.storage.ArticleItem.selectedVersion;
      newContent.attrs.id = editor!.storage.DraggableItem.createdId;
      //creating paragraph(header) in first node
      editor!.options.editorProps.attributes!.bulkItemsInput.push({
        action:'create',
        id:newContent.attrs.id,
        parentId:editor!.storage.ArticleItem.selectedVersion,
        parent_item_id:null,
        raw_value:"",
        value:"",
        type2:"paragraph_item",
      })
    });

  },[onTyping?.content.length]);
  
  // console.log(editor?.options.editorProps.attributes!.bulkItemsInput);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // console.log(newContent);
      // console.log(editor?.options.editorProps.attributes!.bulkItemsInput)
      const data = editor?.options.editorProps.attributes!.bulkItemsInput;
      if (data && data.length>0) {
        
        bulkItems({
          variables:{
            data,
          }
        }).then(()=>{
          editor.options.editorProps.attributes!.bulkItemsInput=[];
        });
      }
      

    }, 2000);

    return () => clearTimeout(delayDebounceFn)
  },[onTyping]);

  return (      
      <EditorContent editor={editor} className="editor"/>
  );
}

export default Editor;