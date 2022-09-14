import React, {ReactElement, useContext} from "react";
import { EditorContent} from '@tiptap/react';
//@ts-ignore
import { EditorContext } from "../contexts/EditorContext.tsx";
import { Editor as EditorType } from "@tiptap/react";


const Editor = ():ReactElement => {
  const editor : EditorType | null  = useContext(EditorContext);

  return (      
      <EditorContent editor={editor} className="editor"/>
  )
}

export default Editor;