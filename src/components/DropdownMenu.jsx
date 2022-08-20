import React,{useContext, useState,useEffect,useRef} from 'react';
import { EditorContext } from '../contexts/EditorContext';

const DropdownMenu = (props) => {
    const editor = useContext(EditorContext);
    const [menu,setMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (menu && menuRef.current && !menuRef.current.contains(e.target)) {
                setMenu(false);
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        }
    }, [menu]);

    const menuHandler = (e) => {
        editor.commands.focus(props.pos()+2);
        setMenu(!menu);
    }

    const deleteHandler = (e) => {
        props.setSection(false);
    }

    const paragraphHandler = () => {
        editor.chain().focus().setParagraph().run();
        setMenu(false);
    }

    const bulletHandler = () => {
        editor.commands.toggleWrap();
        editor.chain().focus().toggleBulletList().run();
        setMenu(false);
    }

    const orderedHandler = () => {
        editor.commands.toggleWrap();
        editor.chain().focus().toggleOrderedList().run();
        setMenu(false);
    }


    const headingHandler = (level) => {
        editor.chain().focus().toggleHeading({level}).run();
        setMenu(false);
    }

   
    return (
        <div className='menu' ref={menuRef}>
            <div
                className='menu-icon'
                contentEditable="false"
                onClick={menuHandler}
            />
            <div
                className='delete-icon'
                contentEditable="false"
                onClick={deleteHandler}
            />
            {
                menu && <div className="dropdown">
                 
                <div className="container">
                    <button
                        onClick={paragraphHandler}
                        className={editor.isActive('paragraph') ? 'is-active' : ''}
                    >
                        Paragraph
                    </button>

                    <button
                        onClick={bulletHandler}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}
                    >
                        Bullet List
                    </button>

                    <button
                        onClick={orderedHandler}
                        className={editor.isActive('orderedList') ? 'is-active' : ''}
                    >
                        Ordered list
                    </button>

                    <button
                        onClick={() => headingHandler(1)}
                        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    >
                        H1
                    </button>

                    <button
                        onClick={() => headingHandler(2)}
                        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    >
                        H2
                    </button>

                    <button
                        onClick={() => headingHandler(3)}
                        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ' '}
                    >
                        H3
                    </button>
                 </div>
            </div>
            }
        </div>
    );
}


export default DropdownMenu