/* eslint-disable import/no-anonymous-default-export */
import { NodeViewContent } from '@tiptap/react';
import NodeWrapper from './NodeWrapper';

const ListItemNodeWrapper = (props) => {
  
  return (
    <NodeWrapper {...props}>
      <div className='list-item' data-type="list-item" >
        <NodeViewContent className="content" />
      </div>
    </NodeWrapper> 
  )
}

export  default ListItemNodeWrapper;