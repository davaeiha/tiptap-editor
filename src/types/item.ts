import {Editor} from '@tiptap/react'

export interface itemInterface {
    id:number;
    name:string;
    activation:string | Array<string | number>,
    icon :string,
    onClick:(editor:Editor,level?: number)=> void
}