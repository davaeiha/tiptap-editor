import React from "react";
import {
    FloatingMenu,
    EditorContent,
    useEditor,
    BubbleMenu
  } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import DropdownMenu from "./DropdownMenu";
import Node from "./Extension.js";


const Editor = () => {
  
  
  const editor = useEditor({
      extensions: [
        StarterKit,
        Node
      ],
      content: `
      <p>This is a boring paragraph.</p>
      <div data-type="draggable-item">
        <p>Followed by a fancy draggable item.</p>
      </div>
      <div data-type="draggable-item">
        <p>And another draggable item.</p>
        <div data-type="draggable-item">
          <p>And a nested one.</p>
          <div data-type="draggable-item">
            <p>But can we go deeper?</p>
          </div>
        </div>
      </div>
      <p>Let’s finish with a boring paragraph.</p>   
      `,
    })

    
  return (
    <>       
      {
        editor && <BubbleMenu tippyOptions={{ duration: 100 }} editor={editor}>
            <DropdownMenu editor={editor} />
        </BubbleMenu>
      }    
      <EditorContent editor={editor} className="editor"/>
    </>
  )
}

export default Editor;