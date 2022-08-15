import React from 'react';


const DropdownMenu = ({editor}) => {
  
    return (
        <div className="dropdown">
            <div className="menu">
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
    );
}


export default DropdownMenu