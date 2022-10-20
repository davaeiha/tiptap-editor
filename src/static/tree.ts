import {ContentItem,NestedContentItem,ContentTree} from '../types/tree';


export const makeTree = (items:ContentItem[],root:string): NestedContentItem[] => {

    const tree: NestedContentItem[]=[];
    const items2 = structuredClone(items);
    const base:ContentItem[]= items2
        .filter((item:ContentItem)=>(item.type2 !== 'article_kl'));

    const dictionary:Record<string,NestedContentItem> = base
        .reduce((initial,item)=>(
            item.content_id ?{...initial,[item.content_id]:item} :{...initial,[item.id]:item}
        ),{})

    base.forEach((item:NestedContentItem)=>{

        if (dictionary[item.id] && dictionary[item.id].children) {
            item.children = dictionary[item.id] && dictionary[item.id].children;
        }

        if (item.parent_item_id as string) {
            dictionary[item.parent_item_id as string] = dictionary[item.parent_item_id as string] || {};
            dictionary[item.parent_item_id as string].children = dictionary[item.parent_item_id as string].children || [];
            dictionary[item.parent_item_id as string].children!.push(item as NestedContentItem);
        }else {
            if (item.parent_id === root) {
                tree.push(item);
            } else {
                dictionary[item.parent_id as string] = dictionary[item.parent_id as string] || {};
                dictionary[item.parent_id as string].children = dictionary[item.parent_id as string].children || [];
                dictionary[item.parent_id as string].children!.push(item);
            }
        }
    });
    return tree;
}


export const makeContent = (dataTree:NestedContentItem[]):ContentTree[] => {
    const contentBody : ContentTree[]= []
    const bulletBody : ContentTree = {
        type:'bulletList',
        content:[]
    }
    const orderedBody : ContentTree = {
        type:'orderedList',
        content:[]
    }
    
    const pushList = ():void =>{

        if(orderedBody.content!.length>0){
            const shallowClonedOrderedBody = {...orderedBody};
            contentBody.push(shallowClonedOrderedBody);
            orderedBody.content=[]
        } 
    
        if(bulletBody.content!.length>0){
            const shallowClonedBulletBody = {...bulletBody};
            contentBody.push(shallowClonedBulletBody);
            bulletBody.content=[]
        } 
    }
   
    dataTree.forEach((branch:NestedContentItem)=>{
      switch (branch.type2) {
        case 'paragraph_item':
          const paragraphContent:ContentTree= {
            type:'DraggableItem',
            content:[
              {
                type:'paragraph',
                content: [
                  {
                    type:'text',
                    text:branch.raw_value || " "
                  }
                ]
              }
            ]
          }
            if (branch.children && Array.isArray(branch.children)) {
                makeContent(branch.children).forEach((child)=>{
                    paragraphContent.content?.push(child);
                })
            } 
            pushList();
            contentBody.push(paragraphContent);
            break;
        case 'content_item':
            const articleContent:ContentTree = {
                type:'ArticleItem',
                attrs:{
                    versions:[]
                },
                content: []
            }

            branch.children!.forEach((child)=>{
                // console.log(child)
                if (child.type1 === 'version') {
                    articleContent.attrs.versions.push({
                        id:child.id,
                        name:child.names![0].value
                    });
                }
            });
            articleContent.content = makeContent(branch.children![0].children as NestedContentItem[]);
            pushList();
            contentBody.push(articleContent);
            break;
        case 'head_rel1_item':
            pushList();
           
            contentBody.push({
                type:'DraggableItem',
                content:[
                {
                    type:'heading',
                    attrs:{
                    level:1,
                    },
                    content:[
                    {
                        type:'text',
                        text:branch.raw_value || " "
                    }
                    ]
                }
                ]
            } as ContentTree) 
            break;
        case 'head_rel2_item':
            pushList();
            contentBody.push({
                type:'DraggableItem',
                content:[
                {
                    type:'heading',
                    attrs:{
                    level:2,
                    },
                    content:[
                    {
                        type:'text',
                        text:branch.raw_value || " "
                    }
                    ]
                }
                ]
            } as ContentTree) 
            break;
        case 'head_rel3_item':
            pushList();
            contentBody.push({
                type:'DraggableItem',
                content:[
                {
                    type:'heading',
                    attrs:{
                    level:3,
                    },
                    content:[
                    {
                        type:'text',
                        text:branch.raw_value || " "
                    }
                    ]
                }
                ]
            } as ContentTree) 
            break;
        case 'bulleted_item':
            const bulletListItem : ContentTree = {
                type:'bulletedListItem',
                content:[
                    {
                        type:'paragraph',
                        content:[
                        {
                            type:'text',
                            text:branch.raw_value || " "
                        }
                        ]
                    }
                ]
            }

            if (branch.children && Array.isArray(branch.children)) {
                makeContent(branch.children).forEach((child)=>{
                bulletListItem.content!.push(child);
                })
            }

            bulletBody.content!.push(bulletListItem);
            // console.log(bulletBody);
          break;
        case 'numbered_item':
            const numberedListItem : ContentTree = {
                type:'orderedListItem',
                content:[
                {
                    type:'paragraph',
                    content:[
                    {
                        type:'text',
                        text:branch.raw_value || " "
                    }
                    ]
                }
                ]
            }

            if (branch.children && Array.isArray(branch.children)) {
                makeContent(branch.children).forEach((child)=>{
                    numberedListItem.content!.push(child);
                })
            } 
            
            orderedBody.content!.push(numberedListItem);
            
            break;
        default:
            pushList();
            break;
      }
    });
    
    pushList();
    
    return contentBody;
}