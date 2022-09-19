/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { NodeViewContent,NodeViewRendererProps } from '@tiptap/react';
import NodeWrapper from './NodeWrapper';

const ListItemNodeWrapper : React.FC<NodeViewRendererProps> = (props) => {
  
  return (
    <NodeWrapper {...props}>
      <div className='list-item' data-type="list-item" >
        <NodeViewContent className="content" />
      </div>
    </NodeWrapper> 
  )
}

export default ListItemNodeWrapper;