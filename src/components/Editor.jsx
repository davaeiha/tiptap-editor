import React from "react";
import {
  FloatingMenu,
    EditorContent,
    useEditor,
  } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import DropdownMenu from "./DropdownMenu";


const Editor = () => {
    const editor = useEditor({
        extensions: [
          StarterKit,
        ],
        content: `
          <p>
            Try to select this text.
          </p>
        `,
      })

    
      return (
        <div>       
        {
          editor && <FloatingMenu tippyOptions={{ duration: 100 }} editor={editor}>
             <DropdownMenu editor={editor} />
          </FloatingMenu>
        }    
        <EditorContent editor={editor} className="editor" />
        </div>
      )
}

export default Editor;