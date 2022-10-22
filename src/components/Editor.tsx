import React, {ReactElement, useContext, useEffect, useState} from "react";
import { EditorContent} from '@tiptap/react';
//@ts-ignore
import { EditorContext } from "../contexts/EditorContext.tsx";
import { Editor as EditorType } from "@tiptap/react";


const Editor = ():ReactElement => {
  const editor : EditorType | null  = useContext(EditorContext);

  const [onTyping,setOnTyping] = useState(editor?.state.doc.content);

  editor?.on('update',()=>{
    setOnTyping(editor?.state.doc.content);
  })


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(onTyping)
      //TODO Send Mutation request here
    }, 2000)

    return () => clearTimeout(delayDebounceFn)
  },[onTyping])

  return (      
      <EditorContent editor={editor} className="editor"/>
  )
}

export default Editor;