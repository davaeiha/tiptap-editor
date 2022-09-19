import { Editor } from '@tiptap/react';
//@ts-ignore
import {itemInterface} from '../types/item.ts';

const paragraphHandler = (editor:Editor | any ) => {
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

const bulletHandler = (editor:Editor | any) => {
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

const orderedHandler = (editor:Editor | any) => {
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

const headingHandler = (editor:Editor | any,level:number) => {
    if (editor.isActive('bulletList')) {
        editor.commands.toggleBulletList();
    }else if(editor.isActive('orderedList')){
        editor.commands.toggleOrderedList();
    }

    editor
    .commands
    .toggleHeading({level})
}

const articleHandler = (editor:Editor | any) => {
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
        icon:"fa-solid fa-paragraph",
        onClick:paragraphHandler,
    },
    {
        id:2,
        name:"Bullet List",
        activation:"bulletList",
        icon:"fa-regular fa-list",
        onClick:bulletHandler,
    },
    {
        id:3,
        name:"Ordered List",
        activation:"orderedList",
        icon:"fa-light fa-list-ol",
        onClick:orderedHandler,
    },
    {
        id:4,
        name:"Heading 1",
        activation:["heading",1],
        icon:"fa-solid fa-h1",
        onClick:headingHandler,
    },
    {
        id:5,
        name:"Heading 2",
        activation:["heading",2],
        icon:"fa-solid fa-h2",
        onClick:headingHandler,
    },
    {
        id:6,
        name:"Heading 3",
        activation:["heading",3],
        icon:"fa-solid fa-h3",
        onClick:headingHandler,
    },
    {
        id:7,
        name:"Article",
        activation:"article",
        icon:"fa-sharp fa-solid fa-book-open",
        onClick:articleHandler
    }
]

export default items;