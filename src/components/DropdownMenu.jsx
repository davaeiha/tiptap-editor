import React,{useContext, useState,useEffect,useRef} from 'react';
import { EditorContext } from '../contexts/EditorContext';



const DropdownMenu = () => {
    const editor = useContext(EditorContext);
    const [menu,setMenu] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const checkIfClickedOutside = e => {
        // If the menu is open and the clicked target is not within the menu,
        // then close the menu
        if (menu && ref.current && !ref.current.contains(e.target)) {
            setMenu(false)
        }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
        // Cleanup the event listener
        document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [menu])
   
    return (
        <div className='menu' ref={ref}>
            <div
                className='icon'
                contentEditable="false"
                onClick={()=>setMenu(!menu)}
            />
            {
                menu && <div className="dropdown">
                 
                <div className="container">
                    <button
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={editor.isActive('paragraph') ? 'is-active' : ''}
                    >
                        Paragraph
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}
                    >
                        Bullet List
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'is-active' : ''}
                    >
                        Ordered list
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    >
                        H1
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    >
                        H2
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ' '}
                    >
                        H3
                    </button>
                    <button
                        onClick={() => editor.commands.insertContent("<div data-type='draggable-item'><p></p></div>")}
                        // className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ' '}
                    >
                        card
                    </button>
                 </div>
                
            </div>
            }
        </div>
    );
}


export default DropdownMenu