/* eslint-disable import/no-anonymous-default-export */
import { NodeViewContent } from '@tiptap/react';
import NodeWrapper from './NodeWrapper';

const ListItemNodeWrapper = (props) => {
  
  return (
    <>
        <NodeWrapper {...props}>
          <li className='list-item' data-type="list-item" >
            <NodeViewContent className="content" />
          </li>
        </NodeWrapper>
    </>
  )
}

export  default ListItemNodeWrapper;