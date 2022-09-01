import React, { useContext, useEffect } from 'react';
import { EditorContext } from '../../contexts/EditorContext';
import paragraphIcon from '../../assets/items/paragraph.svg';
import bulletIcon from '../../assets/items/bullet.svg';
import numberedIcon from '../../assets/items/numbered.svg';
import h1Icon from '../../assets/items/h1.svg';
import h2Icon from '../../assets/items/h2.svg';
import h3Icon from '../../assets/items/h3.svg';
import articleIcon from '../../assets/items/book.svg';
import Item from './Item';

const MenuItem = ({menu,menuRef,setMenu}) => {
    const editor = useContext(EditorContext);

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
    
    const paragraphHandler = () => {
        if (editor.isActive('bulletList')) {
            editor.commands.toggleBulletList();
        }else if(editor.isActive('orderedList')){
            editor.commands.toggleOrderedList();
        }else if(editor.isActive('heading',{level:1})){
            editor.commands.toggleHeading({level:1});
        }else if(editor.isActive('heading',{level:2})){
            editor.commands.toggleHeading({level:2});
        }else if(editor.isActive('heading',{level:3})){
            editor.commands.toggleHeading({level:3});
        }
    
        setMenu(false);
    }

    const bulletHandler = () => {
        if (editor.isActive('heading')) {
            editor
            .chain()
            .setParagraph()
            .toggleBulletList()
            .run();
        }else{
            editor
            .commands
            .toggleBulletList() 
        }
       
        setMenu(false);
    }

    const orderedHandler = () => {
        if (editor.isActive('heading')) {
            editor
            .chain()
            .setParagraph()
            .toggleOrderedList()
            .run();
        }else{
            editor
            .commands
            .toggleOrderedList();
        }
       
        setMenu(false);
    }

    const headingHandler = (level) => {

        if (editor.isActive('bulletList')) {
            editor.commands.toggleBulletList();
        }else if(editor.isActive('orderedList')){
            editor.commands.toggleOrderedList();
        }

        editor
        .commands
        .toggleHeading({level})

        setMenu(false);
    }

    const articleHandler = () => {
        editor
        .chain()
        .selectParentNode()
        .selectParentNode()
        .wrapIn('ArticleItem')
        .run();
        setMenu(false);
    }

    const items=[
        {
            id:1,
            name:"Paragraph",
            activation:"paragraph",
            icon:paragraphIcon,
            onClick:paragraphHandler,
        },
        {
            id:2,
            name:"Bullet List",
            activation:"bulletList",
            icon:bulletIcon,
            onClick:bulletHandler,
        },
        {
            id:3,
            name:"Ordered List",
            activation:"orderedList",
            icon:numberedIcon,
            onClick:orderedHandler,
        },
        {
            id:4,
            name:"Heading 1",
            activation:["heading",1],
            icon:h1Icon,
            onClick:headingHandler,
        },
        {
            id:5,
            name:"Heading 2",
            activation:["heading",2],
            icon:h2Icon,
            onClick:headingHandler,
        },
        {
            id:6,
            name:"Heading 3",
            activation:["heading",3],
            icon:h3Icon,
            onClick:headingHandler,
        },
        {
            id:7,
            name:"Article",
            activation:"article",
            icon:articleIcon,
            onClick:articleHandler
        }
    ]



  return (
    <div className="dropdown">         
        <div className="container">
            {
            items.map((item)=>(<Item {...item} key={item.id}/>))
            }
        </div>
    </div>
  )
}

MenuItem.propTypes = {}

export default MenuItem