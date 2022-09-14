import paragraphIcon from '../assets/items/paragraph.svg';
import bulletIcon from '../assets/items/bullet.svg';
import numberedIcon from '../assets/items/numbered.svg';
import h1Icon from '../assets/items/h1.svg';
import h2Icon from '../assets/items/h2.svg';
import h3Icon from '../assets/items/h3.svg';
import articleIcon from '../assets/items/book.svg';
import { Editor } from '@tiptap/react';
//@ts-ignore
import {itemInterface} from '../types/item.ts';

const paragraphHandler = (editor:Editor) => {
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
}

const bulletHandler = (editor:Editor) => {
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
}

const orderedHandler = (editor:Editor) => {
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
}

const headingHandler = (editor:Editor,level:number) => {
    if (editor.isActive('bulletList')) {
        editor.commands.toggleBulletList();
    }else if(editor.isActive('orderedList')){
        editor.commands.toggleOrderedList();
    }

    editor
    .commands
    .toggleHeading({level})
}

const articleHandler = (editor:Editor) => {
    editor
    .chain()
    .selectParentNode()
    .selectParentNode()
    .wrapIn('ArticleItem')
    .run();
}


const items:itemInterface[]=[
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

export default items;