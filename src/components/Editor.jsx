import React, { useState ,useContext} from "react";
import {
    FloatingMenu,
    EditorContent,
    useEditor,
    BubbleMenu
  } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import DropdownMenu from "./DropdownMenu";
import Node from "./Extension.js";
import { EditorContext } from "../contexts/EditorContext";


const Editor = () => {
  const editor = useContext(EditorContext);

  // const {menu} = useGlobalContext();
  // const editor = useEditor({
  //     extensions: [
  //       StarterKit,
  //       Node
  //     ],
  //     content: `
  //     <p>This is a boring paragraph.</p>
  //     <div data-type="draggable-item">
  //       <p>Followed by a fancy draggable item.</p>
  //     </div>
  //     <div data-type="draggable-item">
  //       <p>And another draggable item.</p>
  //       <div data-type="draggable-item">
  //         <p>And a nested one.</p>
  //         <div data-type="draggable-item">
  //           <p>But can we go deeper?</p>
  //         </div>
  //       </div>
  //     </div>
  //     <p>Let’s finish with a boring paragraph.</p>   
  //     <draggableItem toggleDropDown={toggleDropDown}><p></p></draggableItem>
  //     `,
  //   })

    
  return (
    <>       
      {/* {
        editor && <BubbleMenu tippyOptions={{ duration: 100 }} editor={editor}>
            <DropdownMenu editor={editor} />
        </BubbleMenu>
      }     */}

      {/* {(menu && editor) ? <DropdownMenu editor={editor} /> : null} */}

      <EditorContent editor={editor} className="editor"/>
    </>
  )
}

export default Editor;