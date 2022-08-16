import React, {useContext} from "react";
import { EditorContent} from '@tiptap/react';

import { EditorContext } from "../contexts/EditorContext";


const Editor = () => {
  const editor = useContext(EditorContext);

  return (
    <>       
      <EditorContent editor={editor} className="editor"/>
    </>
  )
}

export default Editor;